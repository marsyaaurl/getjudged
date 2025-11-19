import { NextResponse } from "next/server";
import openai from "@/lib/openai";

// Define the expected request body type
interface JudgeRequest {
  story: string;
}

// Define the response structure
interface JudgeResponse {
  verdict: string;
  explanation: string;
}

export async function POST(req: Request) {
  const { story } = await req.json();

  const prompt = `
  You are an impartial judge. Read the story below and analyze it briefly.
  Then decide a single-word verdict: either GUILTY or INNOCENT (UPPERCASE).
  After that, provide a short sarcastic but funny explanation (1–2 sentences).
  Output ONLY a JSON object with this format:
  {
    "verdict": "GUILTY or INNOCENT",
    "explanation": "short sarcastic sentence"
  }

  Story: ${story}
  `;

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });

  /** 
   * OPENAI RESPONSES API (baru) punya struktur yang simple:
   * response.output_text = gabungan text finalnya
   */
  const raw = response.output_text ?? "";

  let verdict = "UNKNOWN";
  let explanation = "";

  // ------------------------------
  // 🧪 1) Coba parse JSON valid
  // ------------------------------
  try {
    const parsed = JSON.parse(raw);
    if (parsed.verdict) verdict = parsed.verdict.toUpperCase();
    if (parsed.explanation) explanation = parsed.explanation;
  } catch {
    // ------------------------------
    // ⚠️ 2) Kalau bukan JSON → regex fallback
    // ------------------------------
    const match = raw.match(/\b(GUILTY|INNOCENT)\b/i);
    if (match) verdict = match[0].toUpperCase();

    explanation = raw.replace(/\b(GUILTY|INNOCENT)\b/i, "").trim();
    if (!explanation) explanation = "No explanation provided.";
  }

  return NextResponse.json({ verdict, explanation });
}


