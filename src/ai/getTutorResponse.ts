import { mockTutorResponse } from "./mockTutorResponse";

export async function getTutorResponse({
  selectedCode,
  languageId,
  useMock = true,
}: {
  selectedCode: string;
  languageId?: string;
  useMock?: boolean;
}) {
  if (useMock) {
    return mockTutorResponse;
  }

  throw new Error("Gemini not wired yet");
}