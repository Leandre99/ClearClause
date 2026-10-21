export interface Segment {
  text: string;
  /** index into analysis.risks when this segment is a highlighted clause */
  riskIndex: number | null;
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Build a regex that tolerates whitespace, quote and dash differences. */
function flexiblePattern(fragment: string): RegExp | null {
  const cleaned = fragment.trim().replace(/^["“”'‘’«»]+|["“”'‘’«»]+$/g, "");
  if (cleaned.length < 12) return null;
  const source = escapeRegex(cleaned)
    .replace(/\s+/g, "\\s+")
    .replace(/['‘’]/g, "['‘’]")
    .replace(/["“”]/g, '["“”]')
    .replace(/[-–—]/g, "[-–—]");
  try {
    return new RegExp(source, "i");
  } catch {
    return null;
  }
}

/** The model often shortens a quote with "..." or "…": try each piece. */
function candidates(clause: string): string[] {
  const pieces = clause
    .split(/\.\.\.|…/)
    .map((p) => p.trim())
    .filter((p) => p.length >= 12);
  return [clause, ...pieces.sort((a, b) => b.length - a.length)];
}

/**
 * Split the document into plain and highlighted segments. A clause that cannot
 * be located in the text is simply not highlighted (its card still shows).
 */
export function segmentDocument(text: string, clauses: string[]): Segment[] {
  const ranges: { start: number; end: number; riskIndex: number }[] = [];

  clauses.forEach((clause, riskIndex) => {
    for (const candidate of candidates(clause)) {
      const pattern = flexiblePattern(candidate);
      const match = pattern?.exec(text);
      if (match) {
        ranges.push({
          start: match.index,
          end: match.index + match[0].length,
          riskIndex,
        });
        return;
      }
    }
  });

  ranges.sort((a, b) => a.start - b.start);

  const segments: Segment[] = [];
  let cursor = 0;
  for (const range of ranges) {
    if (range.start < cursor) continue; // overlaps a clause already placed
    if (range.start > cursor) {
      segments.push({ text: text.slice(cursor, range.start), riskIndex: null });
    }
    segments.push({
      text: text.slice(range.start, range.end),
      riskIndex: range.riskIndex,
    });
    cursor = range.end;
  }
  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), riskIndex: null });
  }
  return segments;
}
