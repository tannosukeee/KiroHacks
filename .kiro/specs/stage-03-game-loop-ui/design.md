# Design Document

## Overview

Stage 3 transforms the static quiz interaction into a visible game loop. After answering, the learner sees XP progress, combo state, difficulty changes, and a clear next action. Wrong answers trigger recovery mode with an easier follow-up question. Correct answers increase combo and offer a Continue button.

All state is local to the webview. No persistence, no Gemini, no real adaptive engine.

## Game state model

```typescript
interface GameState {
  totalXp: number;
  level: number;           // Math.floor(totalXp / 100) + 1, cap at 10
  xpInLevel: number;       // totalXp % 100
  streak: number;          // days (mock: starts at 1)
  combo: number;           // consecutive correct answers
  difficulty: number;      // 1-5 scale
  isRecovering: boolean;   // true after wrong answer
  concept: string;         // current concept being tested
}
```

## XP and level rules

- Level = `Math.floor(totalXp / 100) + 1`, capped at 10
- XP in current level = `totalXp % 100`
- Correct answer: +10 XP (+5 attempt + +5 correct bonus, displayed as +10)
- Wrong answer: +5 XP (attempt only)
- Recovery correct: +15 XP (+5 attempt + +5 correct + +5 recovery bonus)

## Combo rules

- Starts at 0
- Increments on each consecutive correct answer
- Resets to 0 on wrong answer
- Displayed as "Combo x2", "Combo x3", etc. when > 1

## Difficulty rules (mock)

- Starts at 3 (Medium)
- Wrong answer: decrease by 1 (min 1)
- Correct while recovering: increase by 1 toward original missed difficulty
- Correct while stable + combo >= 2: increase by 1 (max 5)
- Labels: 1=Very Easy, 2=Easy, 3=Medium, 4=Hard, 5=Challenge

## Recovery mode

- Triggered on wrong answer
- Shows "RECOVERY MODE" label
- Shows difficulty change: "Medium → Easy"
- Shows hint
- Shows "Try Easier Question" button
- Cleared when learner answers correctly at or above the missed difficulty

## Mock question bank

Each concept has questions at multiple difficulties. When the learner needs an easier question, pick from the same concept at a lower difficulty. When continuing after correct, pick from the same or next concept.

```typescript
interface MockQuestion {
  concept: string;
  difficulty: number;
  question: string;
  choices: string[];
  correctAnswerIndex: number;
  hint: string;
  explanation: string;
}
```

## Component changes

### HeaderBar
- Add XP progress bar below the header line
- Show: `LV{level}  {xpInLevel}/100 XP  🔥 {streak}`
- Progress bar: thin amber bar, width = xpInLevel%

### New: XPProgressBar
- Thin horizontal bar
- Amber fill on dark background
- Shows level on left, XP fraction on right

### New: DifficultyIndicator
- Small label showing current difficulty
- Format: "Difficulty: Medium" or "Easy → Medium"

### FeedbackBanner (updated)
- Correct: show combo, XP awarded, Continue button
- Incorrect: show Recovery Mode, difficulty change, hint, Try Easier Question button

### New: NextChallengeCard
- After feedback, shows action buttons
- Correct: "Continue" button
- Incorrect: "Try Easier Question" + "Review Explanation" buttons

### MockExplainPreview (updated)
- Manages question cycling via mock question bank
- Tracks game state locally
- Passes difficulty and recovery state to child components

### App.tsx (updated)
- Lifts game state up
- Passes game state to HeaderBar
- Handles next-question flow

## Visual direction

Keep the dark/amber/monospace mockup style:
- XP bar: thin amber on dark, no rounded corners needed
- Combo: amber text, e.g. "Combo x3"
- Recovery mode: muted red/amber label
- Difficulty: small uppercase label
- Continue/Try Easier: full-width dark buttons matching ChoiceButton style
