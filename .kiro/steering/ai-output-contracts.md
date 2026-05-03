---
inclusion: fileMatch
fileMatchPattern: "src/prompts/**,src/schemas/**,src/services/gemini.ts,src/services/tutor.ts,src/utils/guardrails.ts,tests/unit/*Response*.test.ts"
---

# AI Output Contracts

All Gemini responses used by the extension must be structured, validated, and safe to render.

## Rules

- Request JSON whenever the extension needs to parse model output.
- Validate model output with Zod before sending data to the webview.
- Treat malformed AI output as recoverable.
- Keep schemas stable and easy to test.
- Include a guardrail field or local check for solution-like output.
- Do not let the model decide adaptive difficulty state transitions.
- Do not let the model decide XP, level, or streak updates.
- The local adaptive engine decides difficulty.
- The local gamification service decides XP, level, and streak state.

## Explanation and quiz response shape

Use this shape for the main explanation flow. Display fields are included to support the mockup-aligned UI.

```ts
{
  summary: string;
  language: string;
  concept: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  calibratedFor?: "Beginner" | "Intermediate" | "Advanced";
  lineReference?: {
    startLine: number;
    endLine?: number;
    label: string; // Example: "Line 3 · @cache decorator"
  };
  explanation: string;
  keyIdeas: string[];
  inlineCodeRefs?: string[]; // Example: ["@cache", "fib(40)"]
  quiz: {
    label?: string; // Default: "QUICK CHECK · +10 XP"
    question: string;
    choices?: string[];
    correctAnswer: string;
    hint: string;
    explanation: string;
    visualTokens?: string[]; // Example: ["fib(40)", "@cache"]
  };
  misconceptions?: string[];
  courseworkConnections?: string[];
  containsSolutionLikeOutput: boolean;
}
```

## Calibration response shape

If Gemini is used to help generate onboarding copy or calibration content, keep the structure simple:

```ts
{
  question: string;
  helperText: string;
  options: string[];
  estimatedSeconds: number;
}
```

Most calibration questions can be hardcoded locally; Gemini is not required.

## Answer feedback response shape

Use this shape only when Gemini is needed to evaluate free-text answers. Multiple-choice grading should be local.

```ts
{
  isCorrect: boolean;
  feedback: string;
  hint?: string;
  misconception?: string;
  shouldRevealAnswer: boolean;
}
```

## Guardrail behavior

- If `containsSolutionLikeOutput` is true, do not render the content directly.
- Replace solution-like content with conceptual explanation, a hint, or a request for the learner to attempt the step first.
- If the JSON is invalid, show a friendly retry message and log the schema error internally.
- If quiz fields are missing, render the explanation but ask the user to retry quiz generation.

## UI copy constraints

Gemini should return concise educational copy:

- explanation paragraphs should be short
- avoid markdown tables
- avoid long bullet lists
- include code tokens that can become chips
- keep quiz choices short enough to fit full-width sidebar buttons
