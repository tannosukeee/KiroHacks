import { TutorResponseSchema } from "../shared/contracts";

export const mockTutorResponse = TutorResponseSchema.parse({
  mode: "mock",
  title: "Understanding This Code",
  explanation:
    "This code introduces a basic programming idea and explains how the pieces work together.",
  keyConcepts: ["variables", "functions"],
  quiz: [
    {
      id: "q1",
      question: "What is the main purpose of this code?",
      options: [
        { id: "a", text: "To demonstrate a programming concept" },
        { id: "b", text: "To delete project files" },
      ],
      correctOptionId: "a",
      explanation:
        "The code is meant to demonstrate a concept, not perform a destructive action.",
    },
  ],
  guardrail: {
    blocked: false,
  },
});