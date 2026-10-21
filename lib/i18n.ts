import type { Language, Severity } from "./types";

export type RiskLevel = Severity | "none";

export interface Strings {
  eyebrow: string;
  headlineMain: string;
  headlineMarker: string;
  subtitle: string;
  steps: { title: string; text: string }[];
  inputTitle: string;
  placeholder: string;
  analyze: string;
  analyzing: string;
  sample: string;
  clear: string;
  chars: string;
  loadingMessages: string[];
  documentTitle: string;
  documentHint: string;
  legend: string;
  overall: string;
  levels: Record<RiskLevel, string>;
  levelText: Record<RiskLevel, string>;
  riskCount: (n: number) => string;
  summary: string;
  keyPoints: string;
  risks: string;
  noRisks: string;
  dates: string;
  questions: string;
  why: string;
  suggestion: string;
  showInDocument: string;
  copy: string;
  copied: string;
  demoBanner: string;
  disclaimer: string;
  privacy: string;
  errorGeneric: string;
  severity: Record<Severity, string>;
  footerMade: string;
}

export const STRINGS: Record<Language, Strings> = {
  en: {
    eyebrow: "Free · No sign-up · English & French",
    headlineMain: "Understand any contract",
    headlineMarker: "before you sign it.",
    subtitle:
      "Paste a lease, job contract, invoice or official letter. ClearClause explains it in plain language and highlights the clauses that could cost you.",
    steps: [
      { title: "Paste", text: "Drop in the text of your document." },
      { title: "Read", text: "Get a plain-language summary and key points." },
      { title: "Decide", text: "See risky clauses and what to ask before signing." },
    ],
    inputTitle: "Your document",
    placeholder: "Paste your document text here…",
    analyze: "Explain this document",
    analyzing: "Analyzing…",
    sample: "Try a sample lease",
    clear: "Clear",
    chars: "characters",
    loadingMessages: [
      "Reading every clause…",
      "Looking for hidden costs…",
      "Checking notice periods and renewals…",
      "Writing it in plain language…",
    ],
    documentTitle: "Your document, annotated",
    documentHint: "Click a highlighted clause to jump to its explanation.",
    legend: "Risk level",
    overall: "Overall risk",
    levels: { none: "None found", low: "Low", medium: "Medium", high: "High" },
    levelText: {
      none: "No risky clauses were flagged.",
      low: "Mostly standard terms, with small points to watch.",
      medium: "Some clauses deserve a closer look before you sign.",
      high: "At least one clause could seriously cost you. Read the red items first.",
    },
    riskCount: (n) => (n === 1 ? "1 clause flagged" : `${n} clauses flagged`),
    summary: "In plain words",
    keyPoints: "What matters most",
    risks: "Watch out for",
    noRisks: "No risky clauses were found.",
    dates: "Dates and deadlines",
    questions: "Questions to ask before signing",
    why: "Why it matters",
    suggestion: "What you can do",
    showInDocument: "Show in document",
    copy: "Copy summary",
    copied: "Copied",
    demoBanner:
      "Demo mode: no AI key is configured on this server, so this is a pre-written sample result, not an analysis of your text.",
    disclaimer:
      "ClearClause is an educational tool, not a lawyer. It can make mistakes. For important decisions, check with a qualified professional.",
    privacy:
      "Your text is sent to an AI provider to be analyzed. This app does not store it, but avoid pasting sensitive personal data: some free AI tiers may use inputs to improve their models.",
    errorGeneric: "Something went wrong. Please try again.",
    severity: { low: "Low", medium: "Medium", high: "High" },
    footerMade: "Built for NextSpark Hacks 2026",
  },
  fr: {
    eyebrow: "Gratuit · Sans inscription · Français et anglais",
    headlineMain: "Comprenez n'importe quel contrat",
    headlineMarker: "avant de le signer.",
    subtitle:
      "Collez un bail, un contrat de travail, une facture ou un courrier officiel. ClearClause l'explique en langage simple et surligne les clauses qui pourraient vous coûter cher.",
    steps: [
      { title: "Collez", text: "Déposez le texte de votre document." },
      { title: "Lisez", text: "Obtenez un résumé simple et l'essentiel." },
      { title: "Décidez", text: "Repérez les clauses risquées et les questions à poser." },
    ],
    inputTitle: "Votre document",
    placeholder: "Collez le texte de votre document ici…",
    analyze: "Expliquer ce document",
    analyzing: "Analyse en cours…",
    sample: "Essayer un exemple de bail",
    clear: "Effacer",
    chars: "caractères",
    loadingMessages: [
      "Lecture de chaque clause…",
      "Recherche des coûts cachés…",
      "Vérification des préavis et renouvellements…",
      "Rédaction en langage simple…",
    ],
    documentTitle: "Votre document, annoté",
    documentHint: "Cliquez sur une clause surlignée pour voir son explication.",
    legend: "Niveau de risque",
    overall: "Risque global",
    levels: { none: "Aucun", low: "Faible", medium: "Moyen", high: "Élevé" },
    levelText: {
      none: "Aucune clause risquée n'a été signalée.",
      low: "Surtout des conditions classiques, avec quelques points à surveiller.",
      medium: "Certaines clauses méritent un examen attentif avant de signer.",
      high: "Au moins une clause pourrait vous coûter cher. Lisez d'abord les points rouges.",
    },
    riskCount: (n) => (n === 1 ? "1 clause signalée" : `${n} clauses signalées`),
    summary: "En termes simples",
    keyPoints: "L'essentiel",
    risks: "Points de vigilance",
    noRisks: "Aucune clause risquée n'a été trouvée.",
    dates: "Dates et échéances",
    questions: "Questions à poser avant de signer",
    why: "Pourquoi c'est important",
    suggestion: "Ce que vous pouvez faire",
    showInDocument: "Voir dans le document",
    copy: "Copier le résumé",
    copied: "Copié",
    demoBanner:
      "Mode démo : aucune clé IA n'est configurée sur ce serveur, ceci est donc un résultat d'exemple pré-écrit, pas une analyse de votre texte.",
    disclaimer:
      "ClearClause est un outil éducatif, pas un avocat. Il peut se tromper. Pour les décisions importantes, consultez un professionnel qualifié.",
    privacy:
      "Votre texte est envoyé à un fournisseur d'IA pour être analysé. Cette application ne le conserve pas, mais évitez de coller des données personnelles sensibles : certaines offres gratuites d'IA peuvent utiliser les textes pour améliorer leurs modèles.",
    errorGeneric: "Une erreur est survenue. Veuillez réessayer.",
    severity: { low: "Faible", medium: "Moyen", high: "Élevé" },
    footerMade: "Créé pour NextSpark Hacks 2026",
  },
};
