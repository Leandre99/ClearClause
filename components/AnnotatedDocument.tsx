import type { Strings } from "@/lib/i18n";
import type { Segment } from "@/lib/highlight";
import type { Analysis } from "@/lib/types";
import { SEVERITY_ORDER, SEVERITY_STYLES } from "./severity";

export function AnnotatedDocument({
  segments,
  risks,
  activeRisk,
  onSelect,
  t,
}: {
  segments: Segment[];
  risks: Analysis["risks"];
  activeRisk: number | null;
  onSelect: (index: number) => void;
  t: Strings;
}) {
  return (
    <section
      aria-label={t.documentTitle}
      className="flex max-h-[34rem] flex-col rounded-2xl border border-border bg-card shadow-card lg:max-h-[calc(100vh-3rem)]"
    >
      <header className="border-b border-border px-5 py-4">
        <h2 className="font-serif text-xl font-semibold">{t.documentTitle}</h2>
        <p className="mt-1 text-xs text-muted">{t.documentHint}</p>
        <ul
          className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted"
          aria-label={t.legend}
        >
          {SEVERITY_ORDER.map((severity) => (
            <li key={severity} className="inline-flex items-center gap-1.5">
              <span
                className={`h-2.5 w-2.5 rounded-sm ${SEVERITY_STYLES[severity].dot}`}
              />
              {t.severity[severity]}
            </li>
          ))}
        </ul>
      </header>

      <div className="overflow-y-auto px-5 py-4">
        <p className="whitespace-pre-wrap font-serif text-[15px] leading-7">
          {segments.map((segment, index) =>
            segment.riskIndex === null ? (
              <span key={index}>{segment.text}</span>
            ) : (
              <mark
                key={index}
                id={`mark-${segment.riskIndex}`}
                role="button"
                tabIndex={0}
                data-active={activeRisk === segment.riskIndex}
                onClick={() => onSelect(segment.riskIndex as number)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelect(segment.riskIndex as number);
                  }
                }}
                className={`mark-risk text-foreground ${SEVERITY_STYLES[risks[segment.riskIndex].severity].mark}`}
              >
                {segment.text}
              </mark>
            ),
          )}
        </p>
      </div>
    </section>
  );
}
