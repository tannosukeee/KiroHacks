---
inclusion: fileMatch
fileMatchPattern: "src/**,webview/src/**,tests/**"
---

# Coding Conventions

## Language and tooling

- Use TypeScript throughout the extension host and webview.
- Keep `strict` mode enabled in `tsconfig.json`.
- Prefer explicit types for exported functions, service boundaries, and message payloads.
- Avoid `any`; use `unknown` plus narrowing when necessary.
- Prefer ESM-style imports where the project setup supports them.

## Naming conventions

- Files: `camelCase.ts` for utilities and services.
- React components: `PascalCase.tsx`.
- Functions: `camelCase` with descriptive verbs, such as `buildTutorPrompt`, `updateMasteryState`, or `awardQuizXp`.
- Types and interfaces: `PascalCase`.
- Constants: `UPPER_SNAKE_CASE` for true constants.
- Zod schemas: suffix with `Schema`.
- Host/webview message types: suffix with `Message`.
- VS Code sidebar view provider: `TutorViewProvider`.

## Extension architecture rules

- Register commands in one clear place and keep activation predictable.
- Keep business logic out of `extension.ts`.
- Do not call Gemini from UI code.
- Do not store secrets outside VS Code SecretStorage.
- Do not put adaptive difficulty logic inside prompt text when it belongs in code.
- Keep prompt builders, storage helpers, tutoring orchestration, materials ingestion, gamification, and UI rendering separated.

## Webview component rules

- Components should map to the mockup structure.
- Use `InlineCodeChip` for highlighted code tokens.
- Use `ChoiceButton` for A/B/C/D answer rows.
- Use `QuickCheckCard` for quiz layout.
- Use `CalibrationScreen` for onboarding calibration.
- Avoid one giant `App.tsx`; keep layout pieces small.

## Webview messaging

- All messages between extension host and webview must use typed payloads.
- Validate external, user-provided, and model-derived data before React renders it.
- Prefer a small set of explicit message shapes over ad hoc objects.
- Never trust webview input without validation.

## React conventions

- Prefer small, focused components.
- Keep presentational components separate from orchestration/state components.
- Derive UI state from typed props where possible.
- Avoid deeply nested JSX conditionals; move decision logic into helpers.
- Use semantic component names like `ExplanationCard`, `QuickCheckCard`, `FeedbackBanner`, `InlineCodeChip`, `ChoiceButton`, `CalibrationScreen`, and `ProgressRail`.

## Styling conventions

- Use Tailwind utilities for layout and spacing.
- Put mockup-specific design tokens in `webview/src/styles/index.css` or a small token file.
- Use CSS variables for VS Code theme compatibility.
- Preserve dark/amber visual direction.
- Do not hardcode scattered colors throughout components; centralize repeated values.

## Prompting and AI integration

- Centralize prompts in `src/prompts/`.
- Prompts must explicitly say the tutor should explain and assess understanding rather than provide full solutions.
- Model responses must be validated with Zod before use.
- Add guardrail checks for solution-like output.
- Keep prompt strings deterministic and easy to diff.

## Error handling

- Fail gracefully with actionable messages in the UI.
- Log detailed errors in the extension host, not in user-facing messages.
- Separate user-facing error copy from internal diagnostic detail.
- Treat malformed model output as a recoverable error path.
- Provide retry options for failed AI requests.

## State management

- Keep adaptive learning state minimal and explicit.
- Name state fields clearly, such as `currentDifficulty`, `lastMissedDifficulty`, `recoveryState`, and `recentCorrect`.
- Avoid hidden state transitions.
- Prefer pure functions for mastery, difficulty, XP, level, and streak updates.

## Testing

- Every core state transition in the adaptive engine should have a unit test.
- Every Zod schema should have at least one valid and one invalid case test.
- Test the main host-to-webview message path.
- Use deterministic sample snippets for demo-critical tests.
- Add regression tests for bugs found during the hackathon.

## Style rules

- Prefer early returns over deep nesting.
- Keep functions small enough to understand quickly.
- Avoid premature abstraction during the hackathon.
- Extract shared logic only after the second real use case.
- Optimize first for clarity, then for polish.

## Dependency rules

- Add dependencies only when they clearly reduce work or increase reliability.
- Prefer native VS Code capabilities before introducing new packages.
- Avoid adding infrastructure that does not strengthen the MVP or demo.
