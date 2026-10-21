# ClearClause

**Understand any contract before you sign it.**

ClearClause takes the text of a lease, employment contract, invoice or official letter and explains it in plain language: what you are agreeing to, which clauses are risky, the dates that matter, and the questions to ask before signing. It works in English and French.

Built for [NextSpark Hacks 2026](https://nextspark-hacks.devpost.com/).

## The problem

Legal and administrative documents are written for lawyers, not for the people who sign them. Tenants, students, first-time workers and newcomers often accept clauses they do not understand (automatic renewals, steep notice periods, one-sided rent increases) because getting a lawyer to read every document is not realistic.

## Who it helps

- Tenants reading a lease for the first time
- Young people signing a first job or internship contract
- Anyone who receives an official letter or invoice they cannot decode

## What it does

1. Paste the document text (up to 20,000 characters).
2. Pick English or French.
3. Get back:
   - a short plain-language summary
   - the key points explained simply
   - risky clauses, quoted and rated low / medium / high, with a suggestion for each
   - important dates and deadlines
   - questions to ask the other party

## Demo mode

If no `ANTHROPIC_API_KEY` is configured, the app does **not** analyze your text. It returns a pre-written sample result about the built-in sample lease, and shows a banner saying so. This lets people try the interface without an API key. Real analysis requires a key.

## Setup

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/Leandre99/ClearClause.git
cd ClearClause
npm install
cp .env.example .env.local   # then add your ANTHROPIC_API_KEY
npm run dev
```

Open http://localhost:3000.

Never commit `.env.local`; it is git-ignored.

## How it works

- **Next.js (App Router) + TypeScript + Tailwind CSS** for the interface and the API route.
- `app/api/analyze/route.ts` sends the document to the Claude API using forced tool use, so the answer always comes back as structured JSON that matches the `Analysis` type in `lib/types.ts`.
- The system prompt tells the model to use only what is written in the document, to quote the clauses it flags, to write at a simple reading level, and to treat the document text as data rather than instructions.
- Nothing is stored: the text is sent to the API for the analysis and not saved by this app.

## Limitations

- Text only: you paste the document, there is no PDF or photo upload yet.
- Not legal advice. The model can misread or miss things. The app says so on every page.
- Clause risk ratings are general and do not take your country's specific laws into account.

## Tools, credits and AI assistance

- [Next.js](https://nextjs.org), [React](https://react.dev), [Tailwind CSS](https://tailwindcss.com), [Geist font](https://vercel.com/font)
- [Anthropic Claude API](https://docs.anthropic.com) (`@anthropic-ai/sdk`) for the document analysis at runtime
- **AI assistance during development:** the code in this repository was written with the help of Claude Code (Anthropic), working from my idea, requirements and review. I chose the concept, the feature set and the scope.
