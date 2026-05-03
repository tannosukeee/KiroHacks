/**
 * Gamification Service
 *
 * Pure, deterministic functions for XP, levels, and daily streaks.
 * No side effects — callers are responsible for persisting the returned state.
 *
 * Scoring rules (from gamification.md):
 *   +10 XP  correct quiz answer
 *   + 5 XP  completing an explanation + quiz attempt (any answer)
 *   + 5 XP  recovery bonus (correct after a previous wrong answer)
 *   Level   = Math.floor(totalXp / 100) + 1, capped at 10
 */

import type { GamificationState } from "../schemas/gamification";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const XP_CORRECT_ANSWER = 10;
export const XP_QUIZ_ATTEMPT = 5;
export const XP_RECOVERY_BONUS = 5;

export const LEVEL_XP_STEP = 100;
export const MAX_LEVEL = 10;

// ---------------------------------------------------------------------------
// calculateLevel
// ---------------------------------------------------------------------------

/**
 * Derives the current level from total XP.
 * Deterministic: `level = Math.floor(totalXp / 100) + 1`, capped at 10.
 */
export function calculateLevel(totalXp: number): number {
  const raw = Math.floor(totalXp / LEVEL_XP_STEP) + 1;
  return Math.min(raw, MAX_LEVEL);
}

// ---------------------------------------------------------------------------
// awardQuizXp
// ---------------------------------------------------------------------------

export type AwardQuizXpInput = {
  state: GamificationState;
  isCorrect: boolean;
  /** True when this correct answer follows a previous wrong answer on the same concept. */
  isRecovery?: boolean;
};

/**
 * Awards XP for a quiz attempt and returns the updated `GamificationState`.
 *
 * Always awards the attempt XP (+5).
 * Awards correct-answer XP (+10) only when `isCorrect` is true.
 * Awards recovery bonus (+5) only when `isCorrect && isRecovery`.
 * Recalculates `level` from the new `totalXp`.
 */
export function awardQuizXp({
  state,
  isCorrect,
  isRecovery = false,
}: AwardQuizXpInput): GamificationState {
  let earned = XP_QUIZ_ATTEMPT;

  if (isCorrect) {
    earned += XP_CORRECT_ANSWER;
    if (isRecovery) {
      earned += XP_RECOVERY_BONUS;
    }
  }

  const totalXp = state.totalXp + earned;
  const level = calculateLevel(totalXp);

  return { ...state, totalXp, level };
}

// ---------------------------------------------------------------------------
// updateDailyStreak
// ---------------------------------------------------------------------------

export type UpdateDailyStreakInput = {
  state: GamificationState;
  /**
   * ISO date string (YYYY-MM-DD) representing today in the user's local
   * timezone.  Callers must derive this from `new Date()` using local date
   * formatting — never UTC — so the streak reflects the user's calendar day.
   */
  todayDate: string;
};

/**
 * Records a quiz completion for `todayDate` and updates the streak counter.
 *
 * Rules:
 * - If the user already completed a quiz today, the streak is unchanged.
 * - If the last quiz date was yesterday, the streak increments.
 * - If the last quiz date was before yesterday (gap), the streak resets to 1.
 * - If no quiz has ever been completed, the streak starts at 1.
 */
export function updateDailyStreak({
  state,
  todayDate,
}: UpdateDailyStreakInput): GamificationState {
  // Already recorded a quiz today — nothing changes.
  if (state.lastQuizDate === todayDate) {
    return state;
  }

  const completedQuizDates = state.completedQuizDates.includes(todayDate)
    ? state.completedQuizDates
    : [...state.completedQuizDates, todayDate].sort();

  const yesterday = getPreviousDate(todayDate);
  const currentStreak =
    state.lastQuizDate === yesterday
      ? state.currentStreak + 1
      : 1;

  return {
    ...state,
    currentStreak,
    lastQuizDate: todayDate,
    completedQuizDates,
  };
}

// ---------------------------------------------------------------------------
// Internal date helper
// ---------------------------------------------------------------------------

/**
 * Returns the YYYY-MM-DD string for the day before `dateStr`.
 *
 * Parses as local midnight (no Z suffix) so the result stays in the user's
 * timezone — matching how callers derive `todayDate`.
 *
 * Throws if `dateStr` is not a valid YYYY-MM-DD string, so a malformed date
 * never silently resets a streak.
 */
function getPreviousDate(dateStr: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error(`getPreviousDate: invalid date string "${dateStr}"`);
  }
  const d = new Date(`${dateStr}T00:00:00`);
  if (isNaN(d.getTime())) {
    throw new Error(`getPreviousDate: unparseable date "${dateStr}"`);
  }
  d.setDate(d.getDate() - 1);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
