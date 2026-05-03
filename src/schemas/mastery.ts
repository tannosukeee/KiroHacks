import { z } from "zod";

/** Difficulty levels 1 (very easy) → 5 (challenge). */
export const DifficultySchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
]);

export type Difficulty = z.infer<typeof DifficultySchema>;

export const RecoveryStateSchema = z.enum(["stable", "recovering"]);
export type RecoveryState = z.infer<typeof RecoveryStateSchema>;

export const ConceptMasterySchema = z.object({
  concept: z.string().min(1),
  /** 0.0 – 1.0 mastery score. */
  mastery: z.number().min(0).max(1),
  currentDifficulty: DifficultySchema,
  lastDifficulty: DifficultySchema,
  /** Set when the user last answered incorrectly. */
  lastMissedDifficulty: DifficultySchema.optional(),
  /**
   * Rolling window of recent quiz outcomes.
   * `true` = correct, `false` = incorrect.
   * Newest entry is appended to the end.
   */
  recentCorrect: z.array(z.boolean()),
  recoveryState: RecoveryStateSchema,
  needsReview: z.boolean(),
  /** ISO-8601 timestamp of the last update. */
  updatedAt: z.string(),
});

export type ConceptMastery = z.infer<typeof ConceptMasterySchema>;

/** Convenience factory – creates a fresh mastery record for a new concept. */
export function createConceptMastery(
  concept: string,
  initialDifficulty: Difficulty = 3
): ConceptMastery {
  return {
    concept,
    mastery: 0,
    currentDifficulty: initialDifficulty,
    lastDifficulty: initialDifficulty,
    lastMissedDifficulty: undefined,
    recentCorrect: [],
    recoveryState: "stable",
    needsReview: false,
    updatedAt: new Date().toISOString(),
  };
}
