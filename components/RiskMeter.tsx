import type { RiskLevel, Strings } from "@/lib/i18n";
import type { Analysis, Severity } from "@/lib/types";
import { SEVERITY_ORDER, SEVERITY_STYLES } from "./severity";

export function overallLevel(risks: Analysis["risks"]): RiskLevel {
  for (const level of SEVERITY_ORDER) {
    if (risks.some((risk) => risk.severity === level)) return level;
  }
  return "none";
}

const FILLED: Record<RiskLevel, number> = { none: 0, low: 1, medium: 2, high: 3 };

export function RiskMeter({
  risks,
  t,
}: {
  risks: Analysis["risks"];
  t: Strings;
}) {
  const level = overallLevel(risks);
  const filled = FILLED[level];
  const color = level === "none" ? "bg-low" : SEVERITY_STYLES[level].bar;
  const counts = SEVERITY_ORDER.map((severity: Severity) => ({
    severity,
    count: risks.filter((risk) => risk.severity === severity).length,
  }));

  return (
    <section
      aria-label={t.overall}
      className="rounded-2xl border border-border bg-card p-5 shadow-card"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          {t.overall}
        </p>
        <p className="text-xs text-muted">{t.riskCount(risks.length)}</p>
      </div>

      <p className="mt-1 font-serif text-3xl font-semibold">
        {t.levels[level]}
      </p>

      <div
        className="mt-3 grid grid-cols-3 gap-1.5"
        role="img"
        aria-label={`${t.overall}: ${t.levels[level]}`}
      >
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            className={`h-2 rounded-full ${step <= filled ? color : "bg-border"}`}
          />
        ))}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted">
        {t.levelText[level]}
      </p>

      {risks.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {counts
            .filter((item) => item.count > 0)
            .map(({ severity, count }) => (
              <li
                key={severity}
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${SEVERITY_STYLES[severity].chip}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${SEVERITY_STYLES[severity].dot}`}
                />
                {count} {t.severity[severity]}
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
