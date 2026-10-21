import type { Analysis, Severity } from "./types";

const SEVERITIES: Severity[] = ["low", "medium", "high"];

function str(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function list(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value)
    ? value.filter(
        (item): item is Record<string, unknown> =>
          typeof item === "object" && item !== null,
      )
    : [];
}

/**
 * Model output is untrusted: coerce it to the Analysis shape so a missing or
 * malformed field can never crash the UI.
 */
export function normalizeAnalysis(raw: unknown): Analysis {
  const data = (typeof raw === "object" && raw !== null ? raw : {}) as Record<
    string,
    unknown
  >;

  const analysis: Analysis = {
    documentType: str(data.documentType) || "Document",
    summary: str(data.summary),
    keyPoints: list(data.keyPoints).map((p) => ({
      title: str(p.title),
      explanation: str(p.explanation),
    })),
    risks: list(data.risks).map((r) => ({
      clause: str(r.clause),
      severity: SEVERITIES.includes(r.severity as Severity)
        ? (r.severity as Severity)
        : "medium",
      why: str(r.why),
      suggestion: str(r.suggestion),
    })),
    importantDates: list(data.importantDates).map((d) => ({
      label: str(d.label),
      date: str(d.date),
    })),
    questionsToAsk: Array.isArray(data.questionsToAsk)
      ? data.questionsToAsk.filter((q): q is string => typeof q === "string")
      : [],
  };

  if (!analysis.summary) {
    throw new Error("Model returned no summary");
  }
  return analysis;
}
