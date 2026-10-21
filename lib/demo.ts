import type { Analysis, Language } from "./types";

/**
 * Pre-written sample results, used ONLY when no ANTHROPIC_API_KEY is configured.
 * They always describe the built-in sample lease, never the user's own text,
 * and the UI labels them as a simulated demo.
 */
export const DEMO_ANALYSIS: Record<Language, Analysis> = {
  en: {
    documentType: "Residential lease agreement",
    summary:
      "You would rent an apartment for 12 months at 650 per month, starting on 1 November. You pay a deposit of two months' rent. The landlord can end the lease early under some conditions, but you must give three months' notice if you want to leave.",
    keyPoints: [
      {
        title: "Rent and deposit",
        explanation:
          "650 per month, due on the 5th. The deposit is two months' rent (1,300) and is returned after the move-out inspection.",
      },
      {
        title: "Length of the lease",
        explanation:
          "12 months, renewed automatically for another 12 months unless someone gives notice.",
      },
      {
        title: "Repairs",
        explanation:
          "You pay for small repairs. The landlord pays for major repairs such as the roof or plumbing.",
      },
    ],
    risks: [
      {
        clause:
          "The landlord may increase the rent at any time with 15 days' notice.",
        severity: "high",
        why: "Your rent could go up several times a year with very little warning, which makes budgeting hard.",
        suggestion:
          "Ask to limit increases to once a year with at least 3 months' notice.",
      },
      {
        clause:
          "The tenant must give three months' written notice to end the lease.",
        severity: "medium",
        why: "A long notice period means you keep paying rent for three months after deciding to leave.",
        suggestion:
          "Ask whether one month is possible, or whether you can sublet.",
      },
      {
        clause: "The deposit is returned within 90 days of move-out.",
        severity: "low",
        why: "90 days is a long wait, but it is not unusual.",
        suggestion:
          "Take dated photos of the apartment at move-in to protect your deposit.",
      },
    ],
    importantDates: [
      { label: "Lease starts", date: "1 November" },
      { label: "Rent due each month", date: "5th of the month" },
      { label: "Notice deadline to avoid auto-renewal", date: "3 months before the end date" },
    ],
    questionsToAsk: [
      "Can the rent increase clause be limited to once a year?",
      "Who pays for water, electricity and internet?",
      "Is subletting allowed if I need to leave early?",
      "Can we do a written move-in inspection with photos?",
    ],
  },
  fr: {
    documentType: "Contrat de bail d'habitation",
    summary:
      "Vous loueriez un appartement pour 12 mois à 650 par mois, à partir du 1er novembre. Vous versez un dépôt de garantie de deux mois de loyer. Le propriétaire peut mettre fin au bail dans certains cas, mais vous devez donner trois mois de préavis si vous souhaitez partir.",
    keyPoints: [
      {
        title: "Loyer et dépôt de garantie",
        explanation:
          "650 par mois, à payer avant le 5. Le dépôt est de deux mois de loyer (1 300) et il est rendu après l'état des lieux de sortie.",
      },
      {
        title: "Durée du bail",
        explanation:
          "12 mois, renouvelés automatiquement pour 12 mois de plus sauf préavis.",
      },
      {
        title: "Réparations",
        explanation:
          "Vous payez les petites réparations. Le propriétaire paie les grosses réparations, comme la toiture ou la plomberie.",
      },
    ],
    risks: [
      {
        clause:
          "Le bailleur peut augmenter le loyer à tout moment avec un préavis de 15 jours.",
        severity: "high",
        why: "Votre loyer pourrait augmenter plusieurs fois par an avec très peu de préavis, ce qui rend le budget difficile à prévoir.",
        suggestion:
          "Demandez de limiter les hausses à une fois par an avec au moins 3 mois de préavis.",
      },
      {
        clause:
          "Le locataire doit donner un préavis écrit de trois mois pour mettre fin au bail.",
        severity: "medium",
        why: "Un préavis long vous oblige à payer le loyer pendant trois mois après avoir décidé de partir.",
        suggestion:
          "Demandez si un mois est possible, ou si la sous-location est autorisée.",
      },
      {
        clause:
          "Le dépôt de garantie est restitué dans les 90 jours suivant la sortie.",
        severity: "low",
        why: "90 jours, c'est long, mais ce n'est pas inhabituel.",
        suggestion:
          "Prenez des photos datées de l'appartement à votre arrivée pour protéger votre dépôt.",
      },
    ],
    importantDates: [
      { label: "Début du bail", date: "1er novembre" },
      { label: "Loyer à payer chaque mois", date: "Avant le 5 du mois" },
      {
        label: "Date limite de préavis pour éviter le renouvellement automatique",
        date: "3 mois avant la fin du bail",
      },
    ],
    questionsToAsk: [
      "La clause d'augmentation du loyer peut-elle être limitée à une fois par an ?",
      "Qui paie l'eau, l'électricité et internet ?",
      "La sous-location est-elle autorisée si je dois partir plus tôt ?",
      "Peut-on faire un état des lieux écrit avec photos à l'entrée ?",
    ],
  },
};

export const SAMPLE_DOCUMENT = `RESIDENTIAL LEASE AGREEMENT

1. Term. This lease starts on 1 November and runs for 12 months. It renews automatically for another 12 months unless either party gives written notice.

2. Rent. The tenant pays 650 per month, due on the 5th of each month. The landlord may increase the rent at any time with 15 days' notice.

3. Deposit. The tenant pays a deposit equal to two months' rent (1,300). The deposit is returned within 90 days of move-out, minus any deductions for damage.

4. Termination. The tenant must give three months' written notice to end the lease. The landlord may end the lease with one month's notice if the apartment is needed for family use.

5. Repairs. The tenant is responsible for minor repairs and routine maintenance. The landlord is responsible for major repairs such as the roof and plumbing.

6. Entry. The landlord may enter the apartment for inspections with 24 hours' notice.`;
