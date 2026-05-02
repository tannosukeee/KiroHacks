# Requirements Document

## Introduction

The core tutor loop is the MVP-critical learning flow for Vybe Tutor, a local-first AI coding tutor built as a VS Code extension. The loop drives the primary user experience: a student selects code in the editor, receives a Gemini-generated explanation with concept identification, answers a comprehension quiz, gets adaptive feedback with hints on incorrect answers, earns XP and streak progress, and has all state persisted locally. This feature must work reliably end-to-end for a hackathon demo.

The loop is: **code context → explanation → quiz → feedback → adaptive difficulty → XP/streak → local persistence**.

## Glossary

- **Extension_Host**: The TypeScript process running inside VS Code that registers commands, manages the webview panel, orchestrates services, and communicates with the Sidebar_Webview.
- **Sidebar_Webview**: The React-based VS Code sidebar view that renders explanations, quizzes, feedback, and gamification state to the learner. Hosted by a `WebviewViewProvider` registered in `contributes.views`.
- **TutorViewProvider**: The `WebviewViewProvider` implementation (`src/panels/TutorViewProvider.ts`) that manages the sidebar webview lifecycle, loads the bundled React app, and routes typed messages between the Extension_Host and the Sidebar_Webview.
- **Tutor_Service**: The orchestration service (`src/services/tutor.ts`) that coordinates the full tutor loop from code context extraction through state persistence.
- **ActiveQuizSession**: An in-memory data structure tracking the current TutorResponse and the number of answer attempts for the active quiz. Used to determine when to reveal the correct answer. Not persisted.
- **Context_Service**: The service (`src/services/context.ts`) that extracts selected code, language ID, filename, and diagnostics from the active VS Code editor.
- **Gemini_Service**: The service (`src/services/gemini.ts`) that sends prompts to the Gemini API and returns raw responses for validation.
- **Prompt_Builder**: The modules in `src/prompts/` that construct structured prompts for Gemini, including code context, difficulty, and concept parameters.
- **Response_Validator**: The Zod schema validation layer (`src/schemas/`) that parses and validates all Gemini JSON responses before they reach the Sidebar_Webview.
- **Adaptive_Engine**: The deterministic local service (`src/services/adaptiveEngine.ts`) that manages difficulty transitions, recovery state, and concept mastery based on quiz outcomes.
- **Gamification_Service**: The local service (`src/services/gamification.ts`) that calculates XP awards, level progression, and streak updates.
- **Storage_Service**: The service (`src/services/storage.ts`) that reads and writes ConceptMastery and GamificationState to VS Code globalState and workspaceState.
- **Guardrails_Module**: The utility (`src/utils/guardrails.ts`) that checks Gemini output for solution-like content and blocks direct rendering when detected.
- **ConceptMastery**: A local data structure tracking a learner's mastery score, current difficulty, recovery state, and recent performance for a single concept.
- **GamificationState**: A local data structure tracking total XP, level, current streak, last quiz date, and completed quiz dates.
- **TutorResponse**: The validated Gemini output containing summary, explanation, concept, difficulty, key ideas, quiz, and a solution-like output flag.
- **Difficulty**: An integer from 1 (very easy) to 5 (challenge) representing quiz question complexity.
- **Recovery_State**: A state value of "stable" or "recovering" indicating whether the learner is working back toward a previously missed difficulty level.

## Requirements

### Requirement 1: Initiate Tutoring on Selected Code

**User Story:** As a learner, I want to start a tutoring session on code I select in the editor, so that I can understand the code I am working with.

#### Acceptance Criteria

1. WHEN the learner invokes the "Explain Selection" command with code selected in the active editor, THE Extension_Host SHALL open the Sidebar_Webview and pass the selected code to the Tutor_Service.
2. WHEN the learner invokes the "Explain Selection" command with no code selected in the active editor, THE Extension_Host SHALL display an informational message prompting the learner to select code first.
3. THE Context_Service SHALL extract the selected code text, language ID, filename, and active diagnostics from the VS Code editor API.
4. THE Context_Service SHALL limit the extracted context to the selected code and a small surrounding window, excluding full file contents.

### Requirement 2: Generate Explanation and Quiz via Gemini

**User Story:** As a learner, I want to receive a beginner-friendly explanation of my selected code along with a comprehension quiz question, so that I can actively learn the concept behind the code.

#### Acceptance Criteria

1. WHEN the Tutor_Service receives extracted code context, THE Prompt_Builder SHALL construct a structured JSON prompt that includes the selected code, language ID, filename, relevant diagnostics, current concept (if known), and current Difficulty level.
2. WHEN a structured prompt is ready, THE Gemini_Service SHALL send the prompt to the Gemini API and return the raw JSON response.
3. THE Gemini_Service SHALL include a request for exactly one comprehension quiz question tied to the identified concept in every explanation prompt.
4. WHEN the Gemini API returns a response, THE Response_Validator SHALL parse the response against the TutorResponse Zod schema and return a validated TutorResponse object.
5. IF the Gemini API returns invalid JSON, THEN THE Response_Validator SHALL reject the response and THE Tutor_Service SHALL send a friendly retry message to the Sidebar_Webview and log the schema error internally.
6. IF the Gemini API returns a response where `containsSolutionLikeOutput` is true, THEN THE Guardrails_Module SHALL replace the solution-like content with a conceptual explanation or hint before the Tutor_Service sends data to the Sidebar_Webview.
7. IF the Gemini API request fails due to a network error or API error, THEN THE Tutor_Service SHALL send an error state to the Sidebar_Webview with a retry option and log the error internally.
8. WHEN the validated TutorResponse contains explanation fields but missing quiz fields, THE Tutor_Service SHALL render the explanation in the Sidebar_Webview and display a prompt to retry quiz generation.

### Requirement 3: Render Explanation and Quiz in Sidebar

**User Story:** As a learner, I want to see the code explanation and quiz question in a clear sidebar panel, so that I can read the explanation and attempt the quiz without leaving my editor.

#### Acceptance Criteria

1. WHEN the Tutor_Service sends a validated TutorResponse to the Sidebar_Webview, THE Sidebar_Webview SHALL display the explanation card with the summary, concept badge, language label, difficulty indicator, explanation text, and key ideas.
2. WHEN the Sidebar_Webview receives a TutorResponse with a quiz object, THE Sidebar_Webview SHALL render the quiz question with answer choices below the explanation card.
3. THE Sidebar_Webview SHALL display a loading state while the Gemini API request is in progress.
4. WHEN no tutoring session has been started, THE Sidebar_Webview SHALL display an empty state with instructions on how to begin.
5. THE Sidebar_Webview SHALL render correctly in both VS Code light and dark themes.
6. THE Extension_Host SHALL communicate with the Sidebar_Webview using typed message payloads validated against the messages Zod schema.

### Requirement 4: Submit Quiz Answer and Display Feedback

**User Story:** As a learner, I want to submit my quiz answer and see whether I was correct along with helpful feedback, so that I can learn from my mistakes or confirm my understanding.

#### Acceptance Criteria

1. WHEN the learner selects an answer choice and submits, THE Sidebar_Webview SHALL send the selected answer to the Extension_Host via a typed message.
2. WHEN the Extension_Host receives a quiz answer, THE Tutor_Service SHALL compare the submitted answer against the TutorResponse's `correctAnswer` field locally and determine correctness. Quizzes are multiple-choice and graded locally without a Gemini call.
3. WHEN the submitted answer is correct, THE Sidebar_Webview SHALL display a positive feedback message and the quiz explanation.
4. WHEN the submitted answer is incorrect, THE Sidebar_Webview SHALL display the hint from the TutorResponse and indicate the answer was incorrect without revealing the correct answer immediately. THE Tutor_Service SHALL increment the attempt counter in the ActiveQuizSession.
5. WHEN the submitted answer is incorrect and the ActiveQuizSession attempt count reaches 2 or more, THE Sidebar_Webview SHALL reveal the correct answer along with the full quiz explanation.

### Requirement 5: Adaptive Difficulty Adjustment

**User Story:** As a learner, I want the quiz difficulty to adjust based on my performance, so that questions stay challenging but not frustrating.

#### Acceptance Criteria

1. WHEN the learner answers incorrectly at Difficulty D, THE Adaptive_Engine SHALL set `lastMissedDifficulty` to D, set `recoveryState` to "recovering", set the next Difficulty to max(1, D − 1), and set `needsReview` to true.
2. WHEN the learner answers correctly while `recoveryState` is "recovering" and `currentDifficulty` is less than `lastMissedDifficulty`, THE Adaptive_Engine SHALL increase the next Difficulty by 1 and increase mastery slightly.
3. WHEN the learner answers correctly while `recoveryState` is "recovering" and `currentDifficulty` is greater than or equal to `lastMissedDifficulty`, THE Adaptive_Engine SHALL set `recoveryState` to "stable", set `needsReview` to false, and increase mastery.
4. WHEN the learner answers correctly while `recoveryState` is "stable" and has answered correctly 2 times in a row for the same concept, THE Adaptive_Engine SHALL increase the next Difficulty by 1, capped at 5.
5. WHEN the learner answers correctly while `recoveryState` is "stable" and has fewer than 2 correct answers in a row, THE Adaptive_Engine SHALL increase mastery without changing Difficulty.
6. WHEN the learner answers incorrectly twice in a row for the same concept, THE Adaptive_Engine SHALL lower Difficulty by 1 (minimum 1), keep the same concept, and signal that a hint and simpler explanation are needed.
7. THE Adaptive_Engine SHALL store mastery as a number from 0 to 1, weighting recent performance more heavily than older performance.
8. THE Adaptive_Engine SHALL cap Difficulty at a maximum of 5 and a minimum of 1 for all transitions.
9. THE Adaptive_Engine SHALL make all difficulty and recovery state transitions deterministically based on local state, without delegating transition decisions to the Gemini API.

### Requirement 6: XP, Level, and Streak Updates

**User Story:** As a learner, I want to earn XP, see my level, and track my daily streak, so that I feel motivated to keep learning.

#### Acceptance Criteria

1. WHEN the learner submits a correct quiz answer, THE Gamification_Service SHALL award 10 XP.
2. WHEN the learner submits any quiz answer (regardless of correctness), THE Gamification_Service SHALL award 5 XP. This is the only trigger for the attempt bonus — generating an explanation alone does not award XP.
3. WHEN the learner answers correctly while `recoveryState` is "recovering", THE Gamification_Service SHALL award an additional 5 bonus XP for recovery success.
4. THE Gamification_Service SHALL calculate level as `Math.floor(totalXp / 100) + 1`, capped at 10.
5. WHEN the learner completes at least one quiz on a calendar day, THE Gamification_Service SHALL increment the current streak by 1 if the previous streak day was the prior calendar day, or reset the streak to 1 if more than one calendar day has passed since the last quiz.
6. THE Gamification_Service SHALL preserve the current streak value when the learner has already completed a quiz on the current calendar day, even if the learner activates pause or snooze.
7. THE Gamification_Service SHALL not deduct XP for incorrect answers.
8. WHEN XP or streak values change, THE Sidebar_Webview SHALL update the XP progress bar, level badge, and streak counter in the sidebar header.

### Requirement 7: Local Persistence of Progress

**User Story:** As a learner, I want my mastery scores, XP, and streak to persist across VS Code sessions, so that I do not lose my progress.

#### Acceptance Criteria

1. WHEN ConceptMastery changes, THE Storage_Service SHALL write the updated state to VS Code workspaceState (per-workspace learning progress).
2. WHEN GamificationState changes, THE Storage_Service SHALL write the updated state to VS Code globalState (shared across workspaces).
3. THE Storage_Service SHALL store API keys exclusively in VS Code SecretStorage, separate from progress data.
4. THE Storage_Service SHALL not persist raw code snippets, full source files, or full chat transcripts.
5. IF the Storage_Service encounters corrupted or missing state data on read, THEN THE Storage_Service SHALL initialize default state values (mastery 0, XP 0, streak 0, Difficulty 1) and log a warning.

### Requirement 8: Pause and Snooze Control

**User Story:** As a learner, I want to pause or snooze the tutoring experience, so that I can focus on coding without interruptions when I choose.

#### Acceptance Criteria

1. THE Sidebar_Webview SHALL display a pause or snooze toggle in the footer area.
2. WHEN the learner activates pause or snooze, THE Extension_Host SHALL suppress new explanation and quiz generation until the learner deactivates pause.
3. WHILE the extension is in a paused state, THE Sidebar_Webview SHALL display a paused state indicator and provide a control to resume.
4. WHEN the learner deactivates pause, THE Extension_Host SHALL resume normal tutoring behavior on the next user-initiated action.
5. THE Gamification_Service SHALL not break a streak that was already earned on the current calendar day when the learner activates pause.

### Requirement 9: Host-Webview Communication

**User Story:** As a developer, I want all messages between the extension host and the webview to be typed and validated, so that the communication layer is reliable and testable.

#### Acceptance Criteria

1. THE Extension_Host SHALL send messages to the Sidebar_Webview using typed payloads defined in the messages Zod schema.
2. THE Sidebar_Webview SHALL send messages to the Extension_Host using typed payloads defined in the messages Zod schema.
3. IF the Extension_Host or Sidebar_Webview receives a message that fails Zod validation, THEN the receiving side SHALL discard the message and log a validation error.

### Requirement 10: Gemini Response Parsing and Validation

**User Story:** As a developer, I want all Gemini API responses to be validated with Zod schemas before use, so that malformed AI output does not crash the extension or mislead the learner.

#### Acceptance Criteria

1. THE Response_Validator SHALL validate every Gemini response against the TutorResponse Zod schema before the data is used by any service or sent to the Sidebar_Webview.
2. WHEN a Gemini response passes Zod validation, THE Response_Validator SHALL return a typed, validated object.
3. WHEN a Gemini response fails Zod validation, THE Response_Validator SHALL return a structured error containing the validation failure details.
4. FOR ALL valid TutorResponse objects, parsing the object to JSON and validating the JSON against the TutorResponse Zod schema SHALL produce an equivalent validated object (round-trip property).

### Requirement 11: Gemini API Key Setup

**User Story:** As a learner, I want to configure my Gemini API key through a simple command, so that the extension can generate explanations and quizzes.

#### Acceptance Criteria

1. THE Extension_Host SHALL register a `vybeTutor.setApiKey` command.
2. WHEN the learner invokes the `setApiKey` command, THE Extension_Host SHALL prompt the user with a password input box and store the key in VS Code SecretStorage under `vybeTutor.apiKey`.
3. WHEN the API key is successfully stored, THE Extension_Host SHALL display a confirmation message.
4. THE Extension_Host SHALL never send the API key to the Sidebar_Webview.
5. WHEN the Gemini_Service detects a missing API key, THE Extension_Host SHALL prompt the learner to configure the key via the `setApiKey` command.
