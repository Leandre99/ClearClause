export type Language = "en" | "fr";

export type Severity = "low" | "medium" | "high";

export interface Analysis {
  documentType: string;
  summary: string;
  keyPoints: { title: string; explanation: string }[];
  risks: {
    clause: string;
    severity: Severity;
    why: string;
    suggestion: string;
  }[];
  importantDates: { label: string; date: string }[];
  questionsToAsk: string[];
}

export interface AnalyzeResponse {
  analysis: Analysis;
  /** true when the result is a pre-written sample, not a real AI analysis */
  demo: boolean;
}

export const MAX_CHARS = 20000;
