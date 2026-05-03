# Implementation Plan

## Stage 2: Mock Tutor Interaction

- [ ] 1. Update Explain Selection command
  - [ ] 1.1 Read selected editor text, language ID, and filename
    - Update `src/commands/explainSelection.ts` to extract `editor.document.getText(selection)`, `editor.document.languageId`, and `editor.document.fileName`.
    - If no text is selected, show info message and return early.
    - _Requirements: 1.1, 1.2, 1.5_

  - [ ] 1.2 Build and send mock TutorResponse
    - Create a hardcoded mock TutorResponse object with: concept, lineReference, explanation, codeTokens, language, fileName, quiz (question, 4 choices, correctAnswerIndex, hint).
    - Use the selected code's language and filename in the mock response.
    - Send `{ type: "mockExplanation", data: mockResponse }` to the webview via `provider.postMessage`.
    - Focus the sidebar after sending.
    - _Requirements: 1.3, 1.4, 1.5_

- [ ] 2. Add interactive answer components
  - [ ] 2.1 Create ChoiceButton component
    - Create `webview/src/components/ChoiceButton.tsx`.
    - Full-width dark button with subtle border, labeled A., B., C., D.
    - Props: `label`, `text`, `state` (default | correct | incorrect | disabled), `onClick`.
    - Correct state: amber/green border + checkmark icon or text label.
    - Incorrect state: red/muted border + X icon or text label.
    - Disabled state: reduced opacity, no pointer events.
    - Do not rely only on color — include text indicators.
    - _Requirements: 2.1, 2.5, 2.6_

  - [ ] 2.2 Create FeedbackBanner component
    - Create `webview/src/components/FeedbackBanner.tsx`.
    - Props: `isCorrect`, `hint`, `xpAwarded`.
    - Correct: amber accent, encouraging text like "Nice work!", shows XP awarded.
    - Incorrect: muted styling, shows hint text.
    - Calm tone matching the mockup style.
    - _Requirements: 2.3, 2.4_

- [ ] 3. Wire quiz interaction in webview
  - [ ] 3.1 Update MockExplainPreview with interactive quiz
    - Replace static choice rendering with ChoiceButton components.
    - Track `selectedAnswer` and `isAnswered` state.
    - On choice click: compare to `correctAnswerIndex`, set button states, show FeedbackBanner, disable all buttons.
    - Calculate XP: +5 for attempt, +10 if correct.
    - Call parent callback to update XP total.
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 3.1, 3.2_

  - [ ] 3.2 Update App.tsx state management
    - Add `totalXp` state (number, starts at 0).
    - Add `isLive` state (boolean, starts at false).
    - When `mockExplanation` message arrives: set explanation data, set `isLive = true`, reset feedback state.
    - Pass `onXpUpdate` callback to MockExplainPreview.
    - Pass `isLive` and `totalXp` to HeaderBar.
    - _Requirements: 3.3, 3.4, 4.3, 5.1, 5.2, 5.3_

- [ ] 4. Update header with LIVE/IDLE and XP
  - [ ] 4.1 Update HeaderBar with dynamic badge and XP
    - Accept `isLive` and `totalXp` props.
    - Show `LIVE` in amber when `isLive` is true, `IDLE` in muted when false.
    - Show XP total, e.g. `42 XP` in a compact display.
    - _Requirements: 4.1, 4.2, 4.3, 3.3_

- [ ] 5. Build and verify
  - [ ] 5.1 Build webview and extension
    - Run `npm run build:webview` and `npm run build`.
    - Verify no TypeScript or build errors.

  - [ ] 5.2 Manual verification
    - Open extension in Extension Host.
    - Select code in editor.
    - Run Explain Selection.
    - Verify sidebar shows LIVE badge and mock explanation.
    - Click a correct answer — verify correct feedback + XP update.
    - Click an incorrect answer on next explanation — verify hint feedback.
    - Run Explain Selection again with new code — verify explanation resets, XP carries over.

## Done criteria

Stage 2 is complete when:
- Explain Selection reads selected code and sends mock data to the sidebar
- The sidebar shows LIVE badge when explanation is active
- Answer choices are clickable and submit immediately on click
- Correct answers show encouraging feedback + XP
- Incorrect answers show hint
- XP accumulates across multiple explanations
- New explanations reset the quiz but keep XP
- No Gemini, Zod, adaptive, storage, or persistence logic exists
