# Implementation Plan: Core Tutor Loop

## Overview

Implement the end-to-end Vybe Tutor learning loop as a VS Code extension. The build follows the MVP scope order: scaffold the project, then incrementally build from sidebar panel → context extraction → Gemini integration → validation → rendering → quiz flow → adaptive engine → gamification → persistence → pause/snooze → polish. Each task produces a testable increment. All Gemini calls are mocked in tests; all state logic is deterministic and local.

## Tasks

- [ ] 1. Scaffold VS Code extension project
  - [ ] 1.1 Initialize project with package.json, tsconfig.json, and VS Code extension manifest
    - Create `package.json` with extension metadata, `activationEvents`, `contributes.commands` for `vybeTutor.explainSelection` and `vybeTutor.openPanel`, and `contributes.viewsContainers`/`contributes.views` for the sidebar webview
    - Create `tsconfig.json` targeting ES2020 with strict mode
    - Add dependencies: `zod`, `@google/generative-ai`
    - Add devDependencies: `typescript`, `@types/vscode`, `vitest`, `@fast-check/vitest`, `fast-check`, `esbuild`, `@types/node`
    - Create `.vscodeignore` and basic `.gitignore` entries for the extension
    - _Requirements: 1.1, 3.6_

  - [ ] 1.2 Create extension entry point and command stubs
    - Create `src/extension.ts` with `activate` and `deactivate` functions
    - Register commands: `vybeTutor.explainSelection`, `vybeTutor.openPanel`, `vybeTutor.setApiKey`
    - Create stub command handlers in `src/commands/explainSelection.ts` and `src/commands/openTutorPanel.ts`
    - Verify the extension activates without errors using the VS Code Extension Host
    - _Requirements: 1.1, 1.2, 11.1_

  - [ ] 1.3 Add Gemini API key setup command
    - Create `src/commands/setApiKey.ts` with a command handler that prompts the user with `vscode.window.showInputBox({ password: true })`
    - Store the key in `context.secrets` under `vybeTutor.apiKey`
    - Show a friendly confirmation message on success
    - Never send the key to the webview
    - When Gemini Service detects a missing key, prompt the user to run this command
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

  - [ ] 1.4 Set up Vitest and fast-check testing infrastructure
    - Create `vitest.config.ts` at project root configured for TypeScript
    - Create `tests/unit/` and `tests/integration/` directories
    - Add a smoke test that imports and runs to verify the test pipeline works
    - Add npm scripts: `test`, `test:unit`, `test:integration`
    - _Requirements: (testing infrastructure)_

  - [ ] 1.5 Set up webview build pipeline with Vite and React
    - Create `webview/` directory with `vite.config.ts`, `src/main.tsx`, `src/App.tsx`
    - Add React, ReactDOM, Vite, Tailwind CSS as webview devDependencies
    - Configure Vite to output bundled JS/CSS to `dist/webview/`
    - Create `webview/src/styles/index.css` with Tailwind directives
    - Add npm script: `build:webview`
    - _Requirements: 3.1, 3.5_

- [ ] 2. Implement Zod schemas and data models
  - [ ] 2.1 Create TutorResponse and AnswerFeedback schemas
    - Create `src/schemas/tutorResponse.ts` with `TutorResponseSchema` and `AnswerFeedbackSchema` using Zod
    - Implement `validateTutorResponse(raw: unknown): Result<TutorResponse, ValidationError>` returning a discriminated result type
    - Export TypeScript types inferred from the schemas
    - _Requirements: 2.4, 10.1, 10.2, 10.3, 10.4, 10.5_

  - [ ]* 2.2 Write property test: Gemini response schema round-trip
    - **Property 3: Gemini response schema round-trip**
    - **Validates: Requirements 2.4, 10.2, 10.3, 10.5**

  - [ ]* 2.3 Write property test: Invalid Gemini response rejection
    - **Property 4: Invalid Gemini response rejection**
    - **Validates: Requirements 2.5, 10.4**

  - [ ] 2.4 Create host↔webview message schemas
    - Create `src/schemas/messages.ts` with `HostToWebviewMessageSchema` and `WebviewToHostMessageSchema` as Zod discriminated unions
    - Define all message types: `explanation`, `feedback`, `gamificationUpdate`, `error`, `loading`, `paused`, `quizRetry` (host→webview) and `submitAnswer`, `retryExplanation`, `retryQuiz`, `togglePause`, `ready` (webview→host)
    - Export inferred TypeScript types
    - _Requirements: 3.6, 9.1, 9.2, 9.3_

  - [ ]* 2.5 Write property test: Message schema round-trip
    - **Property 5: Message schema round-trip**
    - **Validates: Requirements 3.6, 9.1, 9.2**

  - [ ]* 2.6 Write property test: Invalid message rejection
    - **Property 6: Invalid message rejection**
    - **Validates: Requirements 9.3**

  - [ ] 2.7 Create ConceptMastery and GamificationState schemas
    - Create `src/schemas/mastery.ts` with `ConceptMasterySchema` and default factory function
    - Create `src/schemas/gamification.ts` with `GamificationStateSchema` and default factory function
    - Include default values for corrupted/missing data recovery
    - _Requirements: 5.7, 5.8, 7.5_

- [ ] 3. Checkpoint — Verify schemas and test infrastructure
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 4. Implement TutorViewProvider and sidebar webview shell
  - [ ] 4.1 Create TutorViewProvider sidebar manager
    - Create `src/panels/TutorViewProvider.ts` implementing `vscode.WebviewViewProvider` with `resolveWebviewView`, `postMessage`, and `onDidReceiveMessage` methods
    - Register the view provider with `vscode.window.registerWebviewViewProvider("vybeTutor.tutorView", provider)`
    - Load bundled React app HTML/JS/CSS from `dist/webview/`
    - Validate outgoing messages against `HostToWebviewMessageSchema` before posting
    - Route incoming messages to a registered handler after validating against `WebviewToHostMessageSchema`
    - Discard and log invalid messages on both directions
    - _Requirements: 1.1, 3.3, 3.6, 9.1, 9.2, 9.3_

  - [ ] 4.2 Wire openTutorPanel command to TutorViewProvider
    - Update `src/commands/openTutorPanel.ts` to focus the sidebar view
    - Update `src/extension.ts` to register the TutorViewProvider and pass `extensionUri`
    - Verify the sidebar opens with a placeholder UI when the command is invoked
    - _Requirements: 1.1_

  - [ ] 4.3 Build webview shell with empty state and loading state
    - Create `webview/src/components/EmptyState.tsx` with instructions on how to begin
    - Create `webview/src/components/LoadingState.tsx` with a spinner
    - Create `webview/src/hooks/useVSCodeApi.ts` wrapping `acquireVsCodeApi()`
    - Create `webview/src/hooks/useTutorState.ts` and `webview/src/state/tutorReducer.ts` for webview state management
    - Wire `App.tsx` to listen for `message` events and dispatch to the reducer
    - Render EmptyState by default, LoadingState when a `loading` message arrives
    - _Requirements: 3.3, 3.4_

- [ ] 5. Add mock tutor response mode
  - [ ] 5.1 Create deterministic mock TutorResponse
    - Create `src/services/mockTutor.ts` with a hardcoded valid TutorResponse (explanation, quiz with choices, correct answer, hint)
    - Wire the mock into the Tutor Service as a fallback when Gemini is not configured or a `VYBE_MOCK` flag is set
    - Render explanation and quiz from mock data in the sidebar
    - Submit answer and show feedback using the mock data
    - Use this to prove the UI, messages, quiz, XP, and adaptive loop before debugging real API issues
    - _Requirements: (demo readiness, development velocity)_

- [ ] 6. Implement context extraction and prompt building
  - [ ] 6.1 Implement Context Service
    - Create `src/services/context.ts` with `extractCodeContext(editor: vscode.TextEditor): CodeContext`
    - Extract selected text, language ID, filename, and diagnostics from the selection range
    - Limit surrounding context to ≤ 20 lines above and below the selection
    - Return an error/info message when no code is selected
    - _Requirements: 1.3, 1.4_

  - [ ]* 6.2 Write property test: Context extraction window limit
    - **Property 1: Context extraction window limit**
    - **Validates: Requirements 1.4**

  - [ ] 6.3 Implement Prompt Builder
    - Create `src/prompts/explainAndQuiz.ts` with `buildExplainAndQuizPrompt` that includes code, languageId, fileName, diagnostics, concept, and difficulty in the prompt string
    - Create `src/prompts/nextQuestion.ts` with `buildNextQuestionPrompt`
    - Create `src/prompts/answerFeedback.ts` with `buildAnswerFeedbackPrompt`
    - All prompts request structured JSON output from Gemini
    - _Requirements: 2.1, 2.3_

  - [ ]* 6.4 Write property test: Prompt builder includes all required fields
    - **Property 2: Prompt builder includes all required fields**
    - **Validates: Requirements 2.1**

- [ ] 7. Implement Gemini Service and response validation pipeline
  - [ ] 7.1 Implement Gemini Service
    - Create `src/services/gemini.ts` with `createGeminiService(secretStorage)` returning `{ generateContent, isConfigured }`
    - Retrieve API key from VS Code SecretStorage
    - Use the official `@google/generative-ai` SDK to call Gemini
    - Return raw JSON string for the Response Validator to parse
    - Handle network errors and missing API key gracefully
    - _Requirements: 2.2, 2.7, 7.3_

  - [ ] 7.2 Implement Guardrails Module
    - Create `src/utils/guardrails.ts` with `applyGuardrails(response: TutorResponse): GuardrailResult`
    - If `containsSolutionLikeOutput` is true, replace explanation with a conceptual hint and set `safe` accordingly
    - If `containsSolutionLikeOutput` is false, return the response unchanged with `safe: true`
    - _Requirements: 2.6_

  - [ ]* 7.3 Write property test: Guardrails sanitize solution-like output
    - **Property 7: Guardrails sanitize solution-like output**
    - **Validates: Requirements 2.6**

  - [ ] 7.4 Create utility modules
    - Create `src/utils/logger.ts` with a simple logging wrapper for extension output channel
    - Create `src/utils/errors.ts` with error types and Result type definition
    - _Requirements: 2.5, 2.7_

- [ ] 8. Checkpoint — Verify context, prompts, Gemini service, and guardrails
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Render explanation and quiz in the sidebar
  - [ ] 9.1 Create ExplanationCard component
    - Create `webview/src/components/ExplanationCard.tsx` displaying summary, concept badge, language label, difficulty indicator, explanation text, and key ideas
    - Style with Tailwind CSS for both light and dark VS Code themes
    - _Requirements: 3.1, 3.5_

  - [ ] 9.2 Create QuizCard component
    - Create `webview/src/components/QuizCard.tsx` displaying the quiz question, answer choices as selectable options, and a submit button
    - On submit, send a `submitAnswer` message to the extension host via `postMessage`
    - _Requirements: 3.2, 4.1_

  - [ ] 9.3 Create HeaderBar component
    - Create `webview/src/components/HeaderBar.tsx` with Vybe Tutor logo/name, level badge, XP progress bar, and streak counter
    - Update from `gamificationUpdate` messages
    - _Requirements: 6.8_

  - [ ] 9.4 Create DifficultyIndicator component
    - Create `webview/src/components/DifficultyIndicator.tsx` showing the current difficulty level visually
    - _Requirements: 3.1_

  - [ ] 9.5 Wire Tutor Service to send explanation to webview
    - Create `src/services/tutor.ts` with `startExplanation(context: CodeContext)` that orchestrates: prompt building → Gemini call (or mock mode) → validation → guardrails → postMessage to TutorViewProvider
    - Send `loading` message before the Gemini call, `explanation` message on success, `error` message on failure
    - Create a new ActiveQuizSession with attempts = 0 when explanation succeeds
    - Wire `explainSelection` command to extract context and call `startExplanation`
    - Handle the "no selection" case with an info message
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.4, 2.5, 2.6, 2.7, 2.8, 3.1, 3.3_

  - [ ] 9.6 Update webview reducer and App to render explanation and quiz
    - Update `tutorReducer.ts` to handle `explanation`, `error`, `loading` message types
    - Update `App.tsx` to render ExplanationCard and QuizCard when explanation data is available
    - Create `webview/src/components/ErrorState.tsx` with a retry button that sends `retryExplanation` message
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 10. Implement quiz answer submission and feedback
  - [ ] 10.1 Implement answer grading in Tutor Service
    - Add `handleAnswer(answer: string)` to the Tutor Service
    - Compare submitted answer against `correctAnswer` from the TutorResponse locally (case-insensitive, trimmed comparison). No Gemini call — quizzes are multiple-choice only for MVP.
    - Increment `activeQuizSession.attempts` on each submission
    - Determine `shouldRevealAnswer = !isCorrect && attempts >= 2`
    - Return `isCorrect` and `shouldRevealAnswer`
    - _Requirements: 4.2, 4.4, 4.5_

  - [ ]* 10.2 Write property test: Answer grading correctness
    - **Property 8: Answer grading correctness**
    - **Validates: Requirements 4.2**

  - [ ] 10.3 Create FeedbackBanner component
    - Create `webview/src/components/FeedbackBanner.tsx` displaying correct/incorrect result, hint on incorrect, and explanation reveal when `shouldRevealAnswer` is true
    - Style with encouraging, beginner-friendly messaging
    - _Requirements: 4.3, 4.4, 4.5_

  - [ ] 10.4 Wire answer flow end-to-end
    - Handle `submitAnswer` messages in TutorViewProvider → route to Tutor Service `handleAnswer`
    - Tutor Service grades the answer locally, increments attempts, then sends a `feedback` message back to the webview
    - Update `tutorReducer.ts` to handle `feedback` messages and render FeedbackBanner
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 11. Checkpoint — Verify the core explanation → quiz → feedback loop
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Implement Adaptive Engine
  - [ ] 12.1 Implement Adaptive Engine state machine
    - Create `src/services/adaptiveEngine.ts` with `processAnswer(concept, isCorrect, currentMastery): ConceptMastery` and `getInitialMastery(concept): ConceptMastery`
    - Implement all six transition rules from the design: incorrect-while-stable, incorrect-while-recovering, correct-recovering-below-missed, correct-recovering-at-or-above-missed, correct-stable-streak, correct-stable-no-streak
    - Implement mastery as a weighted average where recent answers carry more weight and higher difficulty correct answers increase mastery more
    - Enforce invariants: mastery ∈ [0, 1], difficulty ∈ {1, 2, 3, 4, 5}
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9_

  - [ ]* 12.2 Write property test: Adaptive engine state transitions
    - **Property 9: Adaptive engine state transitions**
    - **Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5, 5.6**

  - [ ]* 12.3 Write property test: Adaptive engine output invariants
    - **Property 10: Adaptive engine output invariants**
    - **Validates: Requirements 5.7, 5.8**

  - [ ] 12.4 Integrate Adaptive Engine into Tutor Service
    - After grading an answer in `handleAnswer`, call `adaptiveEngine.processAnswer` with the concept, correctness, and current mastery
    - Include updated mastery and difficulty in the feedback message sent to the webview
    - Pass the current difficulty to the Prompt Builder for subsequent explanations
    - _Requirements: 5.1, 5.9_

- [ ] 13. Implement Gamification Service
  - [ ] 13.1 Implement XP, level, and streak logic
    - Create `src/services/gamification.ts` with `awardQuizXp(isCorrect, isRecovering)`, `awardAttemptXp()`, `updateStreak()`, `getState()`, `loadState(state)`
    - +5 XP when the learner submits any quiz answer (the only trigger — generating an explanation alone does not award XP); +10 XP if correct; +5 bonus XP if correct while recovering; no deduction for incorrect
    - Level: `Math.floor(totalXp / 100) + 1`, capped at 10
    - Streak: increment on first quiz of a new calendar day, reset to 1 if gap > 1 day, preserve if already completed today
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

  - [ ]* 13.2 Write property test: XP award correctness
    - **Property 11: XP award correctness**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.7**

  - [ ]* 13.3 Write property test: Level calculation
    - **Property 12: Level calculation**
    - **Validates: Requirements 6.4**

  - [ ]* 13.4 Write property test: Streak update logic
    - **Property 13: Streak update logic**
    - **Validates: Requirements 6.5, 6.6, 8.5**

  - [ ] 13.5 Integrate Gamification Service into Tutor Service
    - After grading and adaptive update, call gamification service to award XP and update streak
    - Send `gamificationUpdate` message to webview with updated state
    - Update HeaderBar in the webview to reflect new XP, level, and streak
    - _Requirements: 6.1, 6.2, 6.3, 6.8_

- [ ] 14. Implement Storage Service and local persistence
  - [ ] 14.1 Implement Storage Service
    - Create `src/services/storage.ts` with `createStorageService(context: vscode.ExtensionContext)`
    - Implement `readMastery`, `writeMastery`, `readAllMastery` using `workspaceState`
    - Implement `readGamification`, `writeGamification` using `globalState`
    - Implement `readApiKey`, `writeApiKey` using `SecretStorage`
    - On corrupted or missing data, return valid defaults and log a warning
    - Validate stored data against Zod schemas on read
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [ ]* 14.2 Write property test: Corrupted storage recovery
    - **Property 14: Corrupted storage recovery**
    - **Validates: Requirements 7.5**

  - [ ] 14.3 Integrate Storage Service into the tutor loop
    - Load mastery and gamification state from storage on extension activation
    - Persist updated ConceptMastery and GamificationState after each answer in the Tutor Service
    - Verify state survives a simulated VS Code reload
    - _Requirements: 7.1, 7.2_

- [ ] 15. Checkpoint — Verify adaptive engine, gamification, and persistence
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 16. Implement pause/snooze control
  - [ ] 16.1 Add pause state to Tutor Service
    - Add `getPauseState()` and `setPauseState(paused)` to the Tutor Service
    - When paused, `startExplanation` should do nothing (suppress new generation)
    - When resumed, normal behavior resumes on the next user-initiated action
    - _Requirements: 8.2, 8.4_

  - [ ] 16.2 Create pause UI components
    - Create `webview/src/components/PausedState.tsx` with a paused indicator and resume button
    - Add a pause/snooze toggle to the sidebar footer area
    - Handle `togglePause` message from webview → host and `paused` message from host → webview
    - Update `tutorReducer.ts` to handle the paused state
    - _Requirements: 8.1, 8.3_

  - [ ] 16.3 Ensure pause does not break earned streaks
    - Verify that activating pause after completing a quiz today does not alter the streak
    - _Requirements: 8.5_

- [ ] 17. Polish UI and add demo snippets
  - [ ] 17.1 Add demo code snippets
    - Create `src/test-data/snippets/` with 1–2 polished Python snippets and 1 JavaScript/TypeScript snippet for demo use
    - Ensure snippets produce clear, demonstrable explanations and quizzes
    - _Requirements: (demo readiness)_

  - [ ] 17.2 Polish webview theme support and layout
    - Ensure all components render correctly in VS Code light and dark themes
    - Add accessible button labels and keyboard navigation support
    - Verify difficulty indicator, concept badge, and feedback banner are visually clear without relying solely on color
    - _Requirements: 3.5_

- [ ] 18. Final checkpoint — Full loop verification
  - Ensure all tests pass, ask the user if questions arise.
  - Verify the full demo flow: select code → explanation → quiz → correct answer → XP update → difficulty increase → persist → reload → state restored.
  - Verify the error recovery flow: Gemini failure → retry → success.
  - Verify the incorrect answer flow: wrong answer → hint → easier retry → recovery → stable.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery.
- Each task references specific requirements for traceability.
- Checkpoints ensure incremental validation at natural breakpoints.
- Property tests validate the 14 universal correctness properties from the design document using fast-check.
- Unit tests validate specific examples and edge cases.
- All Gemini API calls are mocked in automated tests — no live API calls in the test suite.
- The existing Python/FastAPI scaffold in the repo is not part of this implementation and should be left untouched.
