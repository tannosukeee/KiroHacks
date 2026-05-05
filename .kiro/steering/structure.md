---
inclusion: always
---

# Project Structure

Vybe Tutor is a local-first VS Code extension with a TypeScript extension host and a React webview sidebar UI.

## Repository layout

```text
.
├── .kiro/
│   ├── specs/
│   ├── steering/
│   └── hooks/
├── docs/
│   └── design/
│       ├── mockup-notes.md
│       └── mockups/
│           ├── vybe-explain-panel.png
│           └── vybe-calibration-screen.png
├── src/
│   ├── extension.ts
│   ├── commands/
│   │   ├── explainSelection.ts
│   │   ├── explainOnSave.ts
│   │   ├── openTutorView.ts
│   │   ├── setApiKey.ts
│   │   └── importMaterials.ts
│   ├── views/
│   │   └── TutorViewProvider.ts
│   ├── services/
│   │   ├── gemini.ts
│   │   ├── tutor.ts
│   │   ├── context.ts
│   │   ├── adaptiveEngine.ts
│   │   ├── gamification.ts
│   │   ├── onboarding.ts
│   │   ├── materials.ts
│   │   └── storage.ts
│   ├── schemas/
│   │   ├── tutorResponse.ts
│   │   ├── messages.ts
│   │   ├── mastery.ts
│   │   ├── gamification.ts
│   │   └── onboarding.ts
│   ├── prompts/
│   │   ├── explainAndQuiz.ts
│   │   ├── nextQuestion.ts
│   │   └── answerFeedback.ts
│   ├── types/
│   ├── utils/
│   │   ├── guardrails.ts
│   │   ├── logger.ts
│   │   └── errors.ts
│   └── test-data/
│       └── snippets/
├── webview/
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   ├── HeaderBar.tsx
│   │   │   ├── LiveStatusBadge.tsx
│   │   │   ├── ExplanationCard.tsx
│   │   │   ├── InlineCodeChip.tsx
│   │   │   ├── QuickCheckCard.tsx
│   │   │   ├── QuizVisualCard.tsx
│   │   │   ├── ChoiceButton.tsx
│   │   │   ├── FeedbackBanner.tsx
│   │   │   ├── DifficultyIndicator.tsx
│   │   │   ├── CalibrationScreen.tsx
│   │   │   ├── CalibrationOption.tsx
│   │   │   ├── ProgressRail.tsx
│   │   │   ├── BottomStepPill.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── LoadingState.tsx
│   │   │   ├── ErrorState.tsx
│   │   │   └── PausedState.tsx
│   │   ├── hooks/
│   │   ├── state/
│   │   └── styles/
│   └── vite.config.ts
├── data/
│   ├── concepts.json
│   └── quizTemplates.json
├── tests/
│   ├── unit/
│   └── integration/
├── package.json
├── tsconfig.json
└── README.md
```

## Placement rules

- Commands belong in `src/commands/`.
- Extension activation and command registration belong in `src/extension.ts`.
- A true sidebar should use `WebviewViewProvider`; keep it in `src/views/TutorViewProvider.ts`.
- Gemini calls belong only in `src/services/gemini.ts` or a small wrapper called by it.
- Tutor orchestration belongs in `src/services/tutor.ts`.
- Adaptive difficulty belongs in `src/services/adaptiveEngine.ts`.
- XP, levels, and streaks belong in `src/services/gamification.ts`.
- Calibration state belongs in `src/services/onboarding.ts` and `src/schemas/onboarding.ts`.
- Prompt text belongs in `src/prompts/`.
- Zod schemas belong in `src/schemas/`.
- Mockup and design documentation belongs in `docs/design/`.
- React sidebar components belong in `webview/src/components/`.

## Naming rule

Use `TutorViewProvider` for the VS Code sidebar implementation. Use `TutorPanel` only if the team intentionally chooses a floating `WebviewPanel` instead of the PRD sidebar.
