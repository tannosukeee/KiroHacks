import { z } from "zod";

/**
 * Validates a local-timezone calendar date in YYYY-MM-DD format.
 * Streak logic depends on exact string equality, so callers must not pass
 * ISO timestamps (e.g. "2026-05-02T00:00:00") — only bare date strings.
 */
const LocalDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Expected a YYYY-MM-DD date string");

export const GamificationStateSchema = z.object({
  totalXp: z.number().int().min(0),
  level: z.number().int().min(1),
  currentStreak: z.number().int().min(0),
  /**
   * YYYY-MM-DD date string (local timezone) of the last day a quiz was
   * completed. Undefined when no quiz has ever been completed.
   */
  lastQuizDate: LocalDateSchema.optional(),
  /**
   * Sorted array of YYYY-MM-DD date strings on which at least one quiz
   * was completed.
   */
  completedQuizDates: z.array(LocalDateSchema),
});

export type GamificationState = z.infer<typeof GamificationStateSchema>;

/** Convenience factory – creates a fresh gamification state. */
export function createGamificationState(): GamificationState {
  return {
    totalXp: 0,
    level: 1,
    currentStreak: 0,
    lastQuizDate: undefined,
    completedQuizDates: [],
  };
}
