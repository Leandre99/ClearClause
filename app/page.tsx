"use client";

import { useMemo, useRef, useState } from "react";
import { AnnotatedDocument } from "@/components/AnnotatedDocument";
import { LoadingState } from "@/components/LoadingState";
import { Logo } from "@/components/Logo";
import { RiskMeter } from "@/components/RiskMeter";
import { SEVERITY_STYLES } from "@/components/severity";
import { SAMPLE_DOCUMENT } from "@/lib/demo";
import { segmentDocument } from "@/lib/highlight";
import { STRINGS } from "@/lib/i18n";
import { MAX_CHARS } from "@/lib/types";
import type { Analysis, AnalyzeResponse, Language } from "@/lib/types";

function flash(element: HTMLElement | null) {
  if (!element) return;
  element.classList.remove("flash");
  void element.offsetWidth; // restart the animation
  element.classList.add("flash");
}

function summaryAsText(analysis: Analysis): string {
  const lines = [analysis.documentType, "", analysis.summary, ""];
  analysis.keyPoints.forEach((p) => lines.push(`- ${p.title}: ${p.explanation}`));
  if (analysis.risks.length) lines.push("");
  analysis.risks.forEach((r) =>
    lines.push(`[${r.severity.toUpperCase()}] "${r.clause}" - ${r.why} ${r.suggestion}`),
  );
  if (analysis.questionsToAsk.length) lines.push("");
  analysis.questionsToAsk.forEach((q) => lines.push(`? ${q}`));
  return lines.join("\n");
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [text, setText] = useState("");
  const [analyzedText, setAnalyzedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [activeRisk, setActiveRisk] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const t = STRINGS[language];
  const tooLong = text.length > MAX_CHARS;
  const canSubmit = text.trim().length >= 40 && !tooLong && !loading;
  const analysis = result?.analysis;

  const segments = useMemo(
    () =>
      analysis
        ? segmentDocument(
            analyzedText,
            analysis.risks.map((risk) => risk.clause),
          )
        : [],
    [analysis, analyzedText],
  );
  const highlighted = useMemo(
    () =>
      new Set(
        segments.flatMap((s) => (s.riskIndex === null ? [] : [s.riskIndex])),
      ),
    [segments],
  );

  async function analyze() {
    setLoading(true);
    setError(null);
    setResult(null);
    setActiveRisk(null);
    const submitted = text;
    setTimeout(
      () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      80,
    );
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: submitted, language }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? t.errorGeneric);
        return;
      }
      setAnalyzedText(submitted);
      setResult(data as AnalyzeResponse);
    } catch {
      setError(t.errorGeneric);
    } finally {
      setLoading(false);
    }
  }

  function selectRisk(index: number) {
    setActiveRisk(index);
    const card = document.getElementById(`risk-${index}`);
    card?.scrollIntoView({ behavior: "smooth", block: "center" });
    flash(card);
  }

  function showInDocument(index: number) {
    setActiveRisk(index);
    const mark = document.getElementById(`mark-${index}`);
    mark?.scrollIntoView({ behavior: "smooth", block: "center" });
    flash(mark);
  }

  async function copySummary() {
    if (!analysis) return;
    try {
      await navigator.clipboard.writeText(summaryAsText(analysis));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may be blocked: nothing to do */
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 sm:px-6">
      <nav className="flex items-center justify-between py-5">
        <div className="flex items-center gap-2.5">
          <Logo />
          <span className="font-serif text-xl font-semibold tracking-tight">
            ClearClause
          </span>
        </div>
        <div
          role="group"
          aria-label="Language"
          className="flex overflow-hidden rounded-full border border-border bg-card text-sm shadow-sm"
        >
          {(["en", "fr"] as const).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLanguage(code)}
              aria-pressed={language === code}
              className={`px-3.5 py-1.5 font-semibold uppercase transition-colors ${
                language === code
                  ? "bg-accent text-accent-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </nav>

      <header className="mx-auto max-w-3xl pb-10 pt-8 text-center sm:pt-14">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-low" />
          {t.eyebrow}
        </p>
        <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
          {t.headlineMain} <span className="marker">{t.headlineMarker}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {t.subtitle}
        </p>

        <ol className="mx-auto mt-9 grid max-w-2xl gap-4 text-left sm:grid-cols-3">
          {t.steps.map((step, index) => (
            <li key={step.title} className="flex items-start gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {index + 1}
              </span>
              <span>
                <span className="block text-sm font-semibold">{step.title}</span>
                <span className="block text-sm leading-snug text-muted">
                  {step.text}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </header>

      <section className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-5 shadow-card sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <label htmlFor="doc" className="text-sm font-semibold">
            {t.inputTitle}
          </label>
          <button
            type="button"
            onClick={() => setText(SAMPLE_DOCUMENT)}
            className="rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent-soft"
          >
            {t.sample}
          </button>
        </div>
        <textarea
          id="doc"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.placeholder}
          rows={9}
          className="w-full resize-y rounded-2xl border border-border bg-background p-4 font-serif text-[15px] leading-7 outline-none transition-shadow placeholder:font-sans placeholder:text-muted focus:border-accent focus:shadow-[0_0_0_4px_var(--accent-soft)]"
        />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={analyze}
            disabled={!canSubmit}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-sm transition-all hover:-translate-y-px hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            {loading ? t.analyzing : t.analyze}
            {!loading && (
              <svg
                viewBox="0 0 20 20"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 10h12m-5-5 5 5-5 5" />
              </svg>
            )}
          </button>
          {text && (
            <button
              type="button"
              onClick={() => {
                setText("");
                setResult(null);
                setError(null);
              }}
              className="px-2 py-2 text-sm text-muted hover:text-foreground"
            >
              {t.clear}
            </button>
          )}
          <span
            className={`ml-auto text-xs ${tooLong ? "font-semibold text-high" : "text-muted"}`}
          >
            {text.length.toLocaleString()} / {MAX_CHARS.toLocaleString()}{" "}
            {t.chars}
          </span>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted">{t.privacy}</p>
      </section>

      <div ref={resultsRef} className="scroll-mt-6" aria-live="polite">
        {error && (
          <p
            role="alert"
            className="mx-auto mt-8 max-w-3xl rounded-2xl border border-high/40 bg-high-soft p-4 text-sm text-high"
          >
            {error}
          </p>
        )}

        {loading && <LoadingState messages={t.loadingMessages} />}

        {result?.demo && (
          <p className="mx-auto mt-8 max-w-3xl rounded-2xl border border-medium/40 bg-medium-soft p-4 text-sm text-medium">
            {t.demoBanner}
          </p>
        )}

        {analysis && (
          <div className="fade-up mt-10 grid items-start gap-6 lg:grid-cols-[1.05fr_1fr]">
            <div className="lg:sticky lg:top-6">
              <AnnotatedDocument
                segments={segments}
                risks={analysis.risks}
                activeRisk={activeRisk}
                onSelect={selectRisk}
                t={t}
              />
            </div>

            <div className="space-y-6">
              <RiskMeter risks={analysis.risks} t={t} />

              <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {analysis.documentType}
                    </p>
                    <h2 className="mt-1 font-serif text-2xl font-semibold">
                      {t.summary}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={copySummary}
                    className="shrink-0 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent-soft"
                  >
                    {copied ? t.copied : t.copy}
                  </button>
                </div>
                <p className="mt-3 leading-relaxed">{analysis.summary}</p>
              </section>

              {analysis.keyPoints.length > 0 && (
                <section>
                  <h2 className="font-serif text-2xl font-semibold">
                    {t.keyPoints}
                  </h2>
                  <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                    {analysis.keyPoints.map((point) => (
                      <li
                        key={point.title}
                        className="rounded-2xl border border-border bg-card p-4"
                      >
                        <h3 className="text-sm font-semibold">{point.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {point.explanation}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <h2 className="font-serif text-2xl font-semibold">{t.risks}</h2>
                {analysis.risks.length === 0 ? (
                  <p className="mt-2 text-muted">{t.noRisks}</p>
                ) : (
                  <ul className="mt-3 space-y-3">
                    {analysis.risks.map((risk, index) => (
                      <li
                        key={`${index}-${risk.clause}`}
                        id={`risk-${index}`}
                        className={`rounded-2xl border border-l-4 border-border bg-card p-4 shadow-sm ${SEVERITY_STYLES[risk.severity].border}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold ${SEVERITY_STYLES[risk.severity].chip}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${SEVERITY_STYLES[risk.severity].dot}`}
                            />
                            {t.severity[risk.severity]}
                          </span>
                          {highlighted.has(index) && (
                            <button
                              type="button"
                              onClick={() => showInDocument(index)}
                              className="text-xs font-semibold text-accent underline-offset-2 hover:underline"
                            >
                              {t.showInDocument}
                            </button>
                          )}
                        </div>
                        <blockquote className="mt-3 font-serif text-[15px] italic leading-relaxed">
                          “{risk.clause}”
                        </blockquote>
                        <p className="mt-3 text-sm leading-relaxed">
                          <span className="font-semibold">{t.why}: </span>
                          <span className="text-muted">{risk.why}</span>
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed">
                          <span className="font-semibold">{t.suggestion}: </span>
                          <span className="text-muted">{risk.suggestion}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              {analysis.importantDates.length > 0 && (
                <section>
                  <h2 className="font-serif text-2xl font-semibold">{t.dates}</h2>
                  <dl className="mt-3 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
                    {analysis.importantDates.map((item, index) => (
                      <div
                        key={`${index}-${item.label}`}
                        className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3 text-sm"
                      >
                        <dt className="text-muted">{item.label}</dt>
                        <dd className="font-semibold">{item.date}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}

              {analysis.questionsToAsk.length > 0 && (
                <section>
                  <h2 className="font-serif text-2xl font-semibold">
                    {t.questions}
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {analysis.questionsToAsk.map((question, index) => (
                      <li
                        key={`${index}-${question}`}
                        className="flex gap-3 rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed"
                      >
                        <span className="font-serif text-lg font-semibold leading-none text-accent">
                          ?
                        </span>
                        {question}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        )}
      </div>

      <footer className="mx-auto mt-16 max-w-3xl border-t border-border pt-6 text-center text-xs leading-relaxed text-muted">
        <p>{t.disclaimer}</p>
        <p className="mt-2">{t.footerMade}</p>
      </footer>
    </div>
  );
}
