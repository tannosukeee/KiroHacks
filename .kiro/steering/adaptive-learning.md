---
inclusion: fileMatch
fileMatchPattern: "src/services/adaptiveEngine.ts,src/schemas/mastery.ts,tests/unit/adaptiveEngine.test.ts,src/services/tutor.ts"
---

# Adaptive Learning Engine

The quiz system adjusts difficulty based on user performance while staying on the same concept long enough for real recovery.

## Difficulty scale
- 1 = very easy
- 2 = easy
- 3 = medium
- 4 = hard
- 5 = challenge

## Core rules
- If the user answers incorrectly, the next question should be easier but on the same concept.
- If the user answers correctly, increase mastery/confidence.
- After an incorrect answer, later ask a similar-difficulty question on the same concept to confirm recovery.
- Track concept mastery locally.
- Do not jump difficulty too aggressively.
- Prefer explain -> hint -> easier question -> retry path.
- The model can generate questions, but local code owns all state transitions.
- Deep-dive questions may add concept signals, but should not replace quiz-based mastery updates.

## Transition rules

### Incorrect at difficulty D
- Set `lastMissedDifficulty = D`.
- Set `recoveryState = "recovering"`.
- Set `nextDifficulty = max(1, D - 1)`.
- Mark `needsReview = true`.
- Show a hint before the next question.

### Correct while recovering
- Increase mastery slightly.
- If `currentDifficulty < lastMissedDifficulty`, set `nextDifficulty = currentDifficulty + 1`.
- If `currentDifficulty >= lastMissedDifficulty`, set `recoveryState = "stable"` and `needsReview = false`.

### Correct while stable
- Increase mastery.
- Only increase difficulty after 2 correct answers in a row for the same concept.
- Cap difficulty at 5.

### Incorrect twice in a row
- Keep the same concept.
- Lower difficulty by 1, with a minimum of 1.
- Show a hint and a simpler explanation.
- Do not penalize XP harshly; the goal is recovery, not punishment.

## Mastery scoring
- Store mastery as a number from 0 to 1.
- Correct answers increase mastery more at higher difficulty.
- Incorrect answers decrease mastery slightly, not dramatically.
- Recent performance matters more than old performance.

## Local progress model

```ts
type ConceptMastery = {
  concept: string;
  mastery: number;
  currentDifficulty: 1 | 2 | 3 | 4 | 5;
  lastDifficulty: 1 | 2 | 3 | 4 | 5;
  lastMissedDifficulty?: 1 | 2 | 3 | 4 | 5;
  recentCorrect: boolean[];
  recoveryState: "stable" | "recovering";
  needsReview: boolean;
  updatedAt: string;
};
```

## Demo behavior
The demo should clearly show:
1. Student gets a medium question wrong.
2. Vybe Tutor gives a hint and lowers difficulty on the same concept.
3. Student gets the easier question right.
4. Vybe Tutor moves back toward the original difficulty.
5. Mastery or recovery state visibly improves.
