import type { TutorResponse } from "../shared/contracts";

export const mockTutorResponse: TutorResponse = {
  mode: "mock",
  title: "Understanding a Function Step by Step",
  explanation:
    "This code defines a small reusable function. It takes input, performs logic on that input, and returns a result. The important idea is to understand the data flow: what enters the function, what changes inside it, and what comes back out.",
  keyConcepts: [
    "Function input",
    "Return value",
    "Control flow",
    "Readable naming",
  ],
  quiz: [
    {
      id: "q1",
      question: "What is the main purpose of a function?",
      options: [
        { id: "a", text: "To group reusable logic" },
        { id: "b", text: "To make code slower" },
        { id: "c", text: "To delete variables" },
        { id: "d", text: "To prevent imports" },
      ],
      correctOptionId: "a",
      explanation:
        "Functions group reusable logic so the same behavior can be called from multiple places.",
    },
  ],
  guardrail: {
    blocked: false,
  },
};