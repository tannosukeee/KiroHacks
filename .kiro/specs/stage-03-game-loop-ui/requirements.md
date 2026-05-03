# Requirements Document

## Introduction

Stage 3 adds the visible game loop to the mock tutor experience. The current quiz interaction supports answer selection and feedback, but the product does not yet feel gamified. This stage adds local mock XP progression, levels, streak display, combo state, recovery mode, difficulty labels, and next-question flow.

This stage remains mock/local only. It does not implement Gemini, persistent storage, real adaptive engine, file import, or deep dive.

## Requirement 1: Display game progress in header

**User Story:** As a learner, I want to see my level, XP progress, and streak, so that answering questions feels rewarding.

### Acceptance Criteria

1. THE header SHALL display current level.
2. THE header SHALL display current XP and XP needed for the next level.
3. THE header SHALL display a progress bar.
4. THE header SHALL display a streak indicator with a flame icon.
5. THE state SHALL be mock webview state only.

## Requirement 2: Reward correct answers

**User Story:** As a learner, I want correct answers to feel rewarding, so that I am motivated to keep learning.

### Acceptance Criteria

1. WHEN the learner answers correctly, THE UI SHALL add 10 XP.
2. THE UI SHALL show a positive success message.
3. THE UI SHALL increase combo count.
4. THE UI SHALL show a Continue button.
5. THE UI SHALL update the XP progress bar immediately.

## Requirement 3: Turn wrong answers into recovery mode

**User Story:** As a learner, I want wrong answers to guide me into recovery instead of punishing me, so that I can keep learning.

### Acceptance Criteria

1. WHEN the learner answers incorrectly, THE UI SHALL add 5 attempt XP.
2. THE UI SHALL show Recovery Mode.
3. THE UI SHALL show the hint.
4. THE UI SHALL reset combo count.
5. THE UI SHALL show that difficulty was lowered.
6. THE UI SHALL show a Try Easier Question button.

## Requirement 4: Add mock next-question flow

**User Story:** As a learner, I want another question after feedback, so that the quiz feels like a game loop.

### Acceptance Criteria

1. WHEN the learner clicks Continue after a correct answer, THE UI SHALL load another mock question.
2. WHEN the learner clicks Try Easier Question after a wrong answer, THE UI SHALL load an easier mock question on the same concept.
3. THE new question SHALL reset answer selection and feedback state.
4. THE concept SHALL remain visible.
5. THE difficulty SHALL update visually.

## Requirement 5: Preserve mockup style

### Acceptance Criteria

1. THE UI SHALL keep the dark terminal-inspired style.
2. THE UI SHALL use amber accents for XP, active state, and correct emphasis.
3. THE UI SHALL use red only for incorrect feedback.
4. THE UI SHALL keep large readable answer cards.
5. THE UI SHALL avoid generic chatbot styling.

## Non-goals

- No Gemini API calls.
- No real adaptive engine service.
- No persistent storage.
- No Zod validation.
- No file import or deep dive.
- No onboarding/calibration screen.
