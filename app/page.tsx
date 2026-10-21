"use client";

import { useState } from "react";
import { SAMPLE_DOCUMENT } from "@/lib/demo";
import { STRINGS } from "@/lib/i18n";
import { MAX_CHARS } from "@/lib/types";
import type { AnalyzeResponse, Language, Severity } from "@/lib/types";

const SEVERITY_STYLES: Record<Severity, string> = {
  high: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200",
  medium: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200",
  low: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);

  const t = STRINGS[language];
  const tooLong = text.length > MAX_CHARS;
  const canSubmit = text.trim().length >= 40 && !tooLong && !loading;

  async function analyze() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? t.errorGeneric);
        return;
      }
      setResult(data as AnalyzeResponse);
    } catch {
      setError(t.errorGeneric);
    } finally {
      setLoading(false);
    }
  }

  const analysis = result?.analysis;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:py-16">
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold tracking-wide text-accent">
            ClearClause
          </p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">
            {t.tagline}
          </h1>
          <p className="mt-3 max-w-2xl text-muted">{t.subtitle}</p>
        </div>
        <div
          role="group"
          aria-label="Language"
          className="flex shrink-0 overflow-hidden rounded-lg border border-border text-sm"
        >
          {(["en", "fr"] as const).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLanguage(code)}
              aria-pressed={language === code}
              className={`px-3 py-1.5 font-medium uppercase transition-colors ${
                language === code
                  ? "bg-accent text-accent-foreground"
                  : "bg-card text-muted hover:text-foreground"
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </header>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <label htmlFor="doc" className="sr-only">
          {t.placeholder}
        </label>
        <textarea
          id="doc"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.placeholder}
          rows={10}
          className="w-full resize-y rounded-lg border border-border bg-background p-3 text-sm leading-relaxed outline-none focus:border-accent"
        />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={analyze}
            disabled={!canSubmit}
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? t.analyzing : t.analyze}
          </button>
          <button
            type="button"
            onClick={() => setText(SAMPLE_DOCUMENT)}
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-background"
          >
            {t.sample}
          </button>
          {text && (
            <button
              type="button"
              onClick={() => {
                setText("");
                setResult(null);
                setError(null);
              }}
              className="px-2 py-2.5 text-sm text-muted hover:text-foreground"
            >
              {t.clear}
            </button>
          )}
          <span
            className={`ml-auto text-xs ${tooLong ? "text-red-600" : "text-muted"}`}
          >
            {text.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}{" "}
            {t.chars}
          </span>
        </div>
        <p className="mt-3 text-xs text-muted">{t.privacy}</p>
      </section>

      <div aria-live="polite">
        {error && (
          <p
            role="alert"
            className="mt-6 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
          >
            {error}
          </p>
        )}

        {result?.demo && (
          <p className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
            {t.demoBanner}
          </p>
        )}

        {analysis && (
          <div className="mt-8 space-y-8">
            <section>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                {analysis.documentType}
              </p>
              <h2 className="mt-1 text-xl font-semibold">{t.summary}</h2>
              <p className="mt-2 leading-relaxed">{analysis.summary}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">{t.keyPoints}</h2>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {analysis.keyPoints.map((point) => (
                  <li
                    key={point.title}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <h3 className="font-medium">{point.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {point.explanation}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold">{t.risks}</h2>
              {analysis.risks.length === 0 ? (
                <p className="mt-2 text-muted">{t.noRisks}</p>
              ) : (
                <ul className="mt-3 space-y-3">
                  {analysis.risks.map((risk) => (
                    <li
                      key={risk.clause}
                      className="rounded-xl border border-border bg-card p-4"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${SEVERITY_STYLES[risk.severity]}`}
                        >
                          {t.severity[risk.severity]}
                        </span>
                      </div>
                      <blockquote className="mt-2 border-l-2 border-border pl-3 text-sm italic text-muted">
                        {risk.clause}
                      </blockquote>
                      <p className="mt-3 text-sm">
                        <span className="font-medium">{t.why}: </span>
                        {risk.why}
                      </p>
                      <p className="mt-1 text-sm">
                        <span className="font-medium">{t.suggestion}: </span>
                        {risk.suggestion}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {analysis.importantDates.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold">{t.dates}</h2>
                <dl className="mt-3 divide-y divide-border rounded-xl border border-border bg-card">
                  {analysis.importantDates.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-wrap justify-between gap-2 px-4 py-3 text-sm"
                    >
                      <dt className="text-muted">{item.label}</dt>
                      <dd className="font-medium">{item.date}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            <section>
              <h2 className="text-xl font-semibold">{t.questions}</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                {analysis.questionsToAsk.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>

      <footer className="mt-12 border-t border-border pt-6 text-xs leading-relaxed text-muted">
        {t.disclaimer}
      </footer>
    </main>
  );
}
