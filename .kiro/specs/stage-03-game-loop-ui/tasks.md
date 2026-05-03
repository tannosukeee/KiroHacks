# Implementation Plan

## Stage 3: Game Loop UI

- [ ] 1. Add mock question bank
  - [ ] 1.1 Create mock question data
    - Create a set of mock questions per concept at multiple difficulty levels.
    - Include at least 2-3 questions per concept per difficulty for cycling.
    - Store in a simple array or map in the webview code.
    - _Requirements: 4.1, 4.2, 4.4, 4.5_

- [ ] 2. Add game state management
  - [ ] 2.1 Create game state in App.tsx
    - Add GameState interface with totalXp, level, xpInLevel, streak, combo, difficulty, isRecovering, concept.
    - Level = Math.floor(totalXp / 100) + 1, capped at 10.
    - Streak starts at 1 (mock).
    - Combo starts at 0, increments on correct, resets on wrong.
    - Difficulty starts at 3, decreases on wrong (min 1), increases on correct+combo.
    - _Requirements: 1.1, 1.2, 1.5, 2.3, 3.4_

- [ ] 3. Create XP progress bar component
  - [ ] 3.1 Create XPProgressBar component
    - Thin amber bar on dark background.
    - Shows level on left, XP/100 on right.
    - Width proportional to xpInLevel.
    - _Requirements: 1.2, 1.3_

- [ ] 4. Update HeaderBar with game progress
  - [ ] 4.1 Add XPProgressBar, level, and streak to HeaderBar
    - Show LV{level}, XP progress bar, streak with flame icon.
    - Keep VYBE EXPLAIN label and LIVE/IDLE badge.
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 5. Add difficulty indicator
  - [ ] 5.1 Create DifficultyIndicator component
    - Small uppercase label showing current difficulty name.
    - Show transition when difficulty changes, e.g. "Medium → Easy".
    - _Requirements: 3.5, 4.5_

- [ ] 6. Update feedback with game loop actions
  - [ ] 6.1 Update FeedbackBanner with combo, recovery, and action buttons
    - Correct: show combo count, XP awarded, Continue button.
    - Incorrect: show Recovery Mode label, difficulty change, hint, Try Easier Question button.
    - Add Review Explanation button for wrong answers.
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [ ] 7. Wire next-question flow
  - [ ] 7.1 Implement question cycling in MockExplainPreview
    - On Continue: load next question at same or higher difficulty.
    - On Try Easier Question: load question at lower difficulty, same concept.
    - Reset answer state and feedback on new question.
    - Update difficulty indicator.
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 8. Build and verify
  - [ ] 8.1 Build webview and extension
    - Run build:webview and build.
    - Verify no errors.

  - [ ] 8.2 Manual verification
    - Select code, run Explain Selection.
    - Answer correctly: verify +10 XP, combo increase, Continue button, XP bar updates.
    - Click Continue: verify new question loads, difficulty maintained or increased.
    - Answer incorrectly: verify +5 XP, Recovery Mode, difficulty lowered, Try Easier Question.
    - Click Try Easier Question: verify easier question loads, same concept.
    - Answer correctly in recovery: verify recovery clears, difficulty moves back up.
    - Verify streak shows with flame icon.
    - Verify level increases when XP crosses 100.

## Done criteria

Stage 3 is complete when:
- XP progress bar shows in header with level and streak
- Correct answers show combo, +XP, and Continue button
- Wrong answers show Recovery Mode, difficulty change, hint, and Try Easier Question
- Next-question flow works for both correct and incorrect paths
- Difficulty visually updates
- Combo increments on consecutive correct, resets on wrong
- All state is local webview only
- No Gemini, storage, or real adaptive engine
