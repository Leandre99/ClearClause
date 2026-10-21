/**
 * Provider for any OpenAI-compatible chat completions endpoint
 * (Google Gemini, Groq, OpenRouter, a local Ollama server, ...).
 * Configured with LLM_API_KEY, LLM_BASE_URL and LLM_MODEL.
 */

const JSON_SHAPE = `Reply with ONE JSON object only, no markdown, with exactly these fields:
{
  "documentType": string,            // what kind of document this is, in a few words
  "summary": string,                 // 3-4 sentences: what the person is agreeing to
  "keyPoints": [{ "title": string, "explanation": string }],   // 3-6 items
  "risks": [{
    "clause": string,                // quote from the document (shortened if long)
    "severity": "low" | "medium" | "high",
    "why": string,
    "suggestion": string
  }],                                // empty array if none
  "importantDates": [{ "label": string, "date": string }],
  "questionsToAsk": [string]         // 2-5 questions to ask before signing
}`;

export async function analyzeWithOpenAICompatible(options: {
  apiKey: string;
  baseUrl: string;
  model: string;
  systemPrompt: string;
  userContent: string;
}): Promise<unknown> {
  const url = `${options.baseUrl.replace(/\/+$/, "")}/chat/completions`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${options.apiKey}`,
    },
    body: JSON.stringify({
      model: options.model,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: `${options.systemPrompt}\n\n${JSON_SHAPE}` },
        { role: "user", content: options.userContent },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`LLM provider returned ${res.status}`);
  }

  const data = await res.json();
  const content: unknown = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    throw new Error("LLM provider returned no content");
  }

  // Some models wrap JSON in a markdown fence even in JSON mode.
  const cleaned = content
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");
  return JSON.parse(cleaned);
}
