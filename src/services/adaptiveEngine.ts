/**
 * Adaptive Engine
 *
 * Pure, deterministic functions for mastery tracking and difficulty adjustment.
 * No side effects — callers are responsible for persisting the returned state.
 *
 * Difficulty scale: 1 (very easy) → 5 (challenge)
 */

import type { ConceptMastery, Difficulty } from "../schemas/mastery";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Maximum number of recent outcomes kept in the rolling window. */
const RECENT_WINDOW = 5;

/** Mastery delta applied on a correct answer at each difficulty level. */
const MASTERY_GAIN: Record<Difficulty, number> = {
  1: 0.05,
  2: 0.08,
  3: 0.1,
  4: 0.13,
  5: 0.15,
};

/** Mastery delta applied on an incorrect answer (always a small penalty). */
const MASTERY_LOSS = 0.05;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clampDifficulty(d: number): Difficulty {
  return Math.max(1, Math.min(5, Math.round(d))) as Difficulty;
}

function clampMastery(m: number): number {
  return Math.max(0, Math.min(1, m));
}

function appendRecent(arr: readonly boolean[], outcome: boolean): boolean[] {
  const next = [...arr, outcome];
  return next.length > RECENT_WINDOW ? next.slice(next.length - RECENT_WINDOW) : next;
}

// ---------------------------------------------------------------------------
// gradeMultipleChoiceAnswer
// ---------------------------------------------------------------------------

/**
 * Returns `true` when `selected` matches `correct` (case-insensitive trim).
 * Keeps grading logic in one place so it is easy to extend later.
 */
export function gradeMultipleChoiceAnswer(
  selected: string,
  correct: string
): boolean {
  return selected.trim().toLowerCase() === correct.trim().toLowerCase();
}

// ---------------------------------------------------------------------------
// updateMasteryState
// ---------------------------------------------------------------------------

export type UpdateMasteryInput = {
  state: ConceptMastery;
  isCorrect: boolean;
  /** Timestamp to stamp on the returned record. Defaults to now. */
  now?: string;
};

/**
 * Applies one quiz outcome to a `ConceptMastery` record and returns the
 * updated record.  All transition rules come from adaptive-learning.md.
 */
export function updateMasteryState({
  state,
  isCorrect,
  now = new Date().toISOString(),
}: UpdateMasteryInput): ConceptMastery {
  const d = state.currentDifficulty;
  const recentCorrect = appendRecent(state.recentCorrect, isCorrect);

  if (!isCorrect) {
    // -----------------------------------------------------------------------
    // Incorrect answer — lower difficulty by 1 (min 1), enter recovery.
    // Two-in-a-row incorrect is handled naturally: each wrong answer lowers
    // by 1, so a second consecutive wrong answer lowers by 1 again.
    // -----------------------------------------------------------------------
    return {
      ...state,
      mastery: clampMastery(state.mastery - MASTERY_LOSS),
      currentDifficulty: clampDifficulty(d - 1),
      lastDifficulty: d,
      lastMissedDifficulty: d,
      recentCorrect,
      recoveryState: "recovering",
      needsReview: true,
      updatedAt: now,
    };
  }

  // -------------------------------------------------------------------------
  // Correct answer
  // -------------------------------------------------------------------------
  // MASTERY_GAIN is keyed by all five Difficulty literals so this is always
  // defined, but we provide a fallback to satisfy noUncheckedIndexedAccess.
  const gain = MASTERY_GAIN[d] ?? 0.1;
  const newMastery = clampMastery(state.mastery + gain);

  if (state.recoveryState === "recovering") {
    const missed = state.lastMissedDifficulty ?? d;

    if (d < missed) {
      // Still below the missed difficulty — step back up one level.
      const steppedUp = clampDifficulty(d + 1);
      // If stepping up lands at or beyond the missed difficulty, recovery is done.
      const recovered = steppedUp >= missed;
      return {
        ...state,
        mastery: newMastery,
        currentDifficulty: steppedUp,
        lastDifficulty: d,
        recentCorrect,
        recoveryState: recovered ? "stable" : "recovering",
        needsReview: !recovered,
        updatedAt: now,
      };
    } else {
      // Already at or above the missed difficulty — recovery complete.
      return {
        ...state,
        mastery: newMastery,
        currentDifficulty: d,
        lastDifficulty: d,
        recentCorrect,
        recoveryState: "stable",
        needsReview: false,
        updatedAt: now,
      };
    }
  }

  // Correct while stable — only increase difficulty after 2 correct in a row
  const lastTwo = recentCorrect.slice(-2);
  const twoCorrectInARow =
    lastTwo.length === 2 && lastTwo[0] === true && lastTwo[1] === true;

  const nextDifficulty = twoCorrectInARow
    ? clampDifficulty(d + 1)
    : d;

  return {
    ...state,
    mastery: newMastery,
    currentDifficulty: nextDifficulty,
    lastDifficulty: d,
    recentCorrect,
    recoveryState: "stable",
    needsReview: false,
    updatedAt: now,
  };
}

// ---------------------------------------------------------------------------
// chooseNextDifficulty
// ---------------------------------------------------------------------------

/**
 * Returns the difficulty that should be used for the *next* question on this
 * concept.  This is a read-only projection of the current state — it does not
 * mutate anything.
 */
export function chooseNextDifficulty(state: ConceptMastery): Difficulty {
  return state.currentDifficulty;
}

// ---------------------------------------------------------------------------
// shouldShowHint
// ---------------------------------------------------------------------------

/**
 * Returns `true` when the learner should receive a hint before the next
 * question.  Hints are shown whenever the learner is in recovery or has
 * `needsReview` flagged.
 */
export function shouldShowHint(state: ConceptMastery): boolean {
  return state.recoveryState === "recovering" || state.needsReview;
}
