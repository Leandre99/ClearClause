import type { Language, Severity } from "./types";

export const STRINGS: Record<
  Language,
  {
    tagline: string;
    subtitle: string;
    placeholder: string;
    analyze: string;
    analyzing: string;
    sample: string;
    clear: string;
    chars: string;
    summary: string;
    keyPoints: string;
    risks: string;
    noRisks: string;
    dates: string;
    questions: string;
    why: string;
    suggestion: string;
    demoBanner: string;
    disclaimer: string;
    privacy: string;
    errorGeneric: string;
    severity: Record<Severity, string>;
  }
> = {
  en: {
    tagline: "Understand any contract before you sign it.",
    subtitle:
      "Paste a lease, job contract, invoice or official letter. ClearClause explains it in plain language, flags risky clauses and suggests what to ask.",
    placeholder: "Paste your document text here…",
    analyze: "Explain this document",
    analyzing: "Reading your document…",
    sample: "Try a sample lease",
    clear: "Clear",
    chars: "characters",
    summary: "In plain words",
    keyPoints: "What matters most",
    risks: "Watch out for",
    noRisks: "No risky clauses were found.",
    dates: "Dates and deadlines",
    questions: "Questions to ask before signing",
    why: "Why it matters",
    suggestion: "What you can do",
    demoBanner:
      "Demo mode: no AI key is configured on this server, so this is a pre-written sample result, not an analysis of your text.",
    disclaimer:
      "ClearClause is an educational tool, not a lawyer. It can make mistakes. For important decisions, check with a qualified professional.",
    privacy:
      "Your text is sent to the Claude API to be analyzed. It is not stored by this app.",
    errorGeneric: "Something went wrong. Please try again.",
    severity: { low: "Low", medium: "Medium", high: "High" },
  },
  fr: {
    tagline: "Comprenez n'importe quel contrat avant de le signer.",
    subtitle:
      "Collez un bail, un contrat de travail, une facture ou un courrier officiel. ClearClause l'explique en langage simple, signale les clauses risquées et propose des questions à poser.",
    placeholder: "Collez le texte de votre document ici…",
    analyze: "Expliquer ce document",
    analyzing: "Lecture de votre document…",
    sample: "Essayer un exemple de bail",
    clear: "Effacer",
    chars: "caractères",
    summary: "En termes simples",
    keyPoints: "L'essentiel",
    risks: "Points de vigilance",
    noRisks: "Aucune clause risquée n'a été trouvée.",
    dates: "Dates et échéances",
    questions: "Questions à poser avant de signer",
    why: "Pourquoi c'est important",
    suggestion: "Ce que vous pouvez faire",
    demoBanner:
      "Mode démo : aucune clé IA n'est configurée sur ce serveur, ceci est donc un résultat d'exemple pré-écrit, pas une analyse de votre texte.",
    disclaimer:
      "ClearClause est un outil éducatif, pas un avocat. Il peut se tromper. Pour les décisions importantes, consultez un professionnel qualifié.",
    privacy:
      "Votre texte est envoyé à l'API Claude pour être analysé. Il n'est pas conservé par cette application.",
    errorGeneric: "Une erreur est survenue. Veuillez réessayer.",
    severity: { low: "Faible", medium: "Moyen", high: "Élevé" },
  },
};
