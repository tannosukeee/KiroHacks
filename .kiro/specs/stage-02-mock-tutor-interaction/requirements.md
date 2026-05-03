# Requirements Document

## Introduction

Stage 2 fixes the integration gap after Stage 1. The extension opens and the sidebar renders, but the quick check is static: there is no answer submission, no feedback state, and Explain Selection does not reliably send selected-code mock data to the sidebar.

This stage wires the existing scaffold into a fully clickable mock tutor loop before Gemini exists. All data is mocked. No Gemini, Zod, adaptive engine, storage, file import, or deep dive.

## Glossary

- Mock_TutorResponse: A hardcoded explanation + quiz payload sent from the extension host to the webview.
- Quick_Check: The quiz section of the sidebar where the learner answers a multiple-choice question.
- Feedback_State: The UI state shown after the learner clicks an answer choice.
- Mock_XP: A local webview-only XP counter that updates after each quiz attempt. Not persisted.

## Requirement 1: Wire Explain Selection to selected editor text

**User Story:** As a learner, I want to select code and run Explain Selection, so that the sidebar shows an explanation of my code.

### Acceptance Criteria

1. WHEN the user runs `vybeTutor.explainSelection` with code selected, THE extension SHALL read the selected text from the active editor.
2. WHEN no code is selected, THE extension SHALL show an info message: "Select some code first."
3. WHEN code is selected, THE extension SHALL focus the Vybe Tutor sidebar.
4. WHEN code is selected, THE extension SHALL send a mock TutorResponse to the webview containing: concept name, line reference, explanation text, code tokens, quiz question, four answer choices, correct answer index, and a hint.
5. THE mock TutorResponse SHALL include the selected code's language ID and filename.

## Requirement 2: Interactive answer choices

**User Story:** As a learner, I want to click an answer choice and see immediate feedback, so that the quick check feels interactive.

### Acceptance Criteria

1. THE webview SHALL render four answer choices as full-width clickable buttons labeled A., B., C., D.
2. WHEN the learner clicks an answer choice, THE webview SHALL immediately show feedback (no separate Submit button needed).
3. IF the answer is correct, THE webview SHALL show a correct feedback banner with encouraging text.
4. IF the answer is incorrect, THE webview SHALL show an incorrect feedback banner with the hint from the mock data.
5. THE selected answer button SHALL visually indicate correct (amber/green treatment) or incorrect (muted/red treatment), without relying only on color.
6. AFTER feedback is shown, THE other answer buttons SHALL be disabled.

## Requirement 3: Mock XP update

**User Story:** As a learner, I want to see my XP increase after answering a quiz, so that the gamification feels real during the demo.

### Acceptance Criteria

1. AFTER the learner submits any answer, THE webview SHALL award +5 XP (attempt XP).
2. IF the answer is correct, THE webview SHALL award an additional +10 XP.
3. THE XP total SHALL be displayed in the sidebar header or near the quick check label.
4. THE XP state SHALL be local to the webview session only. It does not persist across reloads.

## Requirement 4: LIVE/IDLE badge state

**User Story:** As a learner, I want the sidebar to show whether an explanation is active, so that I know the tutor is engaged.

### Acceptance Criteria

1. WHEN no explanation has been sent, THE header badge SHALL show `IDLE` in a muted style.
2. WHEN a mock explanation is active, THE header badge SHALL show `LIVE` in amber.
3. THE badge SHALL update when the webview receives a mockExplanation message.

## Requirement 5: Try another / reset flow

**User Story:** As a learner, I want to select new code and get a new explanation, so that I can keep learning.

### Acceptance Criteria

1. WHEN the learner runs Explain Selection again with new code selected, THE webview SHALL replace the current explanation and quiz with the new mock data.
2. THE feedback state SHALL reset when a new explanation arrives.
3. THE XP total SHALL carry over (not reset) when a new explanation arrives.

## Non-goals

- No Gemini API calls.
- No Zod validation.
- No adaptive engine or difficulty changes.
- No real gamification service.
- No local persistence.
- No file import or deep dive.
- No onboarding/calibration screen.
