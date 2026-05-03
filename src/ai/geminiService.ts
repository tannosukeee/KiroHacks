import * as vscode from "vscode";
import {
  TutorResponse,
  TutorResponseSchema,
} from "../shared/contracts";
import { buildTutorPrompt } from "./prompts";
import { mockTutorResponse } from "./mockTutorResponse";

const GEMINI_API_KEY_SECRET = "gemini.apiKey";

export async function storeGeminiApiKey(
  context: vscode.ExtensionContext,
  apiKey: string
): Promise<void> {
  await context.secrets.store(GEMINI_API_KEY_SECRET, apiKey);
}

export async function getGeminiApiKey(
  context: vscode.ExtensionContext
): Promise<string | undefined> {
  return context.secrets.get(GEMINI_API_KEY_SECRET);
}

export async function getTutorResponse(params: {
  context: vscode.ExtensionContext;
  selectedCode: string;
  languageId?: string;
  useMock?: boolean;
}): Promise<TutorResponse> {
  if (params.useMock) {
    return mockTutorResponse;
  }

  const apiKey = await getGeminiApiKey(params.context);

  if (!apiKey) {
    return {
      ...mockTutorResponse,
      title: "Mock Tutor Response: Missing Gemini API Key",
      guardrail: {
        blocked: false,
        reason: "No Gemini API key found in VS Code SecretStorage.",
      },
    };
  }

  return getGeminiTutorResponse({
    apiKey,
    selectedCode: params.selectedCode,
    languageId: params.languageId,
  });
}

async function getGeminiTutorResponse(params: {
  apiKey: string;
  selectedCode: string;
  languageId?: string;
}): Promise<TutorResponse> {
  const { GoogleGenAI } = await import("@google/genai");
  const ai = new GoogleGenAI({ apiKey: params.apiKey });

  const prompt = buildTutorPrompt({
    selectedCode: params.selectedCode,
    languageId: params.languageId,
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  const rawText = response.text;

  if (!rawText) {
    throw new Error("Gemini returned an empty response.");
  }

  let parsedJson: unknown;

  try {
    parsedJson = JSON.parse(rawText);
  } catch {
    throw new Error("Gemini response was not valid JSON.");
  }

  const validated = TutorResponseSchema.parse(parsedJson);

  return handleGuardrails(validated);
}

function handleGuardrails(response: TutorResponse): TutorResponse {
  if (response.guardrail.blocked) {
    return {
      ...response,
      explanation:
        response.guardrail.reason ??
        "I can help explain the concept, but I cannot provide a full solution-like answer.",
      quiz: response.quiz.length > 0 ? response.quiz : mockTutorResponse.quiz,
    };
  }

  const solutionLikePhrases = [
    "here is the complete solution",
    "copy and paste this",
    "final answer",
    "full implementation",
  ];

  const combined = `${response.title} ${response.explanation}`.toLowerCase();

  const looksSolutionLike = solutionLikePhrases.some((phrase) =>
    combined.includes(phrase)
  );

  if (!looksSolutionLike) {
    return response;
  }

  return {
    ...response,
    explanation:
      "I can explain the approach and concepts, but I should avoid giving a complete solution-like answer.",
    guardrail: {
      blocked: true,
      reason: "Response appeared too solution-like.",
    },
  };
}