---
inclusion: fileMatch
fileMatchPattern: "webview/src/**Calibration**,webview/src/**Onboarding**,src/services/onboarding.ts,src/schemas/onboarding.ts,src/prompts/**"
---

# Onboarding and Calibration

The calibration flow should follow the provided `Which language?` mockup. It exists to seed the prompt with skill level and language preferences before the first full tutoring session.

## MVP status

For hackathon MVP, calibration can be lightweight. A polished static/mock flow is acceptable if the core tutor loop is not finished yet.

Priority order:

1. Core tutor loop.
2. Visual shell for calibration.
3. Save calibration preferences locally.
4. Use calibration preferences in Gemini prompts.

## Calibration goals

Capture enough information to personalize explanation tone without slowing the user down.

Suggested questions:

1. Which best describes you?
   - Beginner
   - Intermediate
   - Advanced
2. Which language are you using most today?
   - Python
   - JavaScript / TypeScript
   - Java
   - C / C++
3. What kind of help do you want?
   - Step-by-step explanations
   - Quick summaries
   - Debugging hints
   - Deeper technical reasoning

## Design requirements

- Dark full-screen or wide webview surface.
- Small uppercase progress label.
- Large heading.
- Muted helper sentence.
- Thin amber progress bar.
- Large dark option cards.
- Back/Next controls below the options.
- Bottom step pill.

## Local state

Store calibration locally in `globalState`:

```ts
type CalibrationState = {
  completed: boolean;
  skillLevel: "beginner" | "intermediate" | "advanced";
  preferredLanguage?: "python" | "javascript-typescript" | "java" | "c-cpp";
  explanationStyle: "step-by-step" | "quick-summary" | "debugging-hints" | "deep-technical";
  completedAt?: string;
};
```

## Prompt usage

When available, include calibration state in Gemini prompts:

- skill level
- preferred language
- explanation style

Do not overfit to calibration. Quiz performance should update difficulty and explanation depth over time.

## Copy tone

Use direct, calm copy:

- `Which language?`
- `We auto-detect from your files — this just seeds the prompt.`
- `Quick calibration — 3 questions, ~60 seconds`

## Avoid

- Long surveys.
- Account creation.
- Email capture.
- Blocking the user forever if they skip calibration.
