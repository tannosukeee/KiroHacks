---
inclusion: fileMatch
fileMatchPattern: "src/services/gamification.ts,src/schemas/gamification.ts,webview/src/components/*XP*,webview/src/components/*Streak*,webview/src/components/*Level*,webview/src/components/*QuickCheck*,tests/unit/gamification.test.ts"
---

# Gamification

Gamification should make learning feel rewarding without distracting from coding. The visual style should match the mockups: subtle, amber, compact, and integrated into the tutoring panel.

## Core elements

- XP points
- Levels
- Daily streaks
- `QUICK CHECK · +10 XP` label
- Small positive feedback after quiz attempts
- Optional level/streak summary in the sidebar header

## MVP scoring rules

- Correct quiz answer: +10 XP.
- Completing an explanation + quiz attempt: +5 XP.
- Recovery success after a previous wrong answer: +5 bonus XP.
- No harsh penalty for wrong answers.
- Streak increments when the user completes at least one quiz on a calendar day.

## Award timing

- Award the +5 attempt XP when the learner submits a quiz answer, not merely when an explanation is generated.
- Award correct-answer XP only once per quiz unless the team intentionally supports retry scoring.
- Do not let users farm XP by repeatedly generating explanations without completing quizzes.

## Level model

Use a simple deterministic level calculation for the demo.

```ts
level = Math.floor(totalXp / 100) + 1
```

Cap the displayed level at 10 unless the team implements more visuals.

## Streak rules

- Track dates in the user's local timezone.
- A streak is preserved if the user has already completed at least one quiz that calendar day.
- Pause/snooze should not break a streak after the user has already completed a quiz that day.
- A grace-window or streak-freeze item is a stretch feature, not MVP.

## UX rules

- Gamification should be visible but not noisy.
- Use amber labels and compact progress indicators.
- Prefer `QUICK CHECK · +10 XP` over large reward banners.
- Celebrate correct answers briefly but avoid confetti-heavy interactions.
- Wrong answers should trigger hints and recovery, not punishment.
- Daily streak bonus multipliers are stretch; keep MVP scoring deterministic.

## Local state model

```ts
type GamificationState = {
  totalXp: number;
  level: number;
  currentStreak: number;
  lastQuizDate?: string;
  completedQuizDates: string[];
};
```
