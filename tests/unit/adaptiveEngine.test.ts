import { describe, it, expect } from "vitest";
import {
  gradeMultipleChoiceAnswer,
  updateMasteryState,
  chooseNextDifficulty,
  shouldShowHint,
} from "../../src/services/adaptiveEngine";
import { createConceptMastery } from "../../src/schemas/mastery";
import type { ConceptMastery } from "../../src/schemas/mastery";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const NOW = "2026-05-02T12:00:00.000Z";

function stable(overrides: Partial<ConceptMastery> = {}): ConceptMastery {
  return {
    ...createConceptMastery("closures", 3),
    updatedAt: NOW,
    ...overrides,
  };
}

function correct(state: ConceptMastery): ConceptMastery {
  return updateMasteryState({ state, isCorrect: true, now: NOW });
}

function incorrect(state: ConceptMastery): ConceptMastery {
  return updateMasteryState({ state, isCorrect: false, now: NOW });
}

// ---------------------------------------------------------------------------
// gradeMultipleChoiceAnswer
// ---------------------------------------------------------------------------

describe("gradeMultipleChoiceAnswer", () => {
  it("returns true for an exact match", () => {
    expect(gradeMultipleChoiceAnswer("A", "A")).toBe(true);
  });

  it("is case-insensitive", () => {
    expect(gradeMultipleChoiceAnswer("a", "A")).toBe(true);
    expect(gradeMultipleChoiceAnswer("Option B", "option b")).toBe(true);
  });

  it("trims surrounding whitespace", () => {
    expect(gradeMultipleChoiceAnswer("  B  ", "B")).toBe(true);
  });

  it("returns false for a wrong answer", () => {
    expect(gradeMultipleChoiceAnswer("B", "A")).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// updateMasteryState — incorrect answer
// ---------------------------------------------------------------------------

describe("updateMasteryState — incorrect answer", () => {
  it("lowers difficulty by 1 on an incorrect answer", () => {
    const s = stable({ currentDifficulty: 3 });
    const next = incorrect(s);
    expect(next.currentDifficulty).toBe(2);
  });

  it("does not lower difficulty below 1", () => {
    const s = stable({ currentDifficulty: 1 });
    const next = incorrect(s);
    expect(next.currentDifficulty).toBe(1);
  });

  it("sets recoveryState to 'recovering'", () => {
    const next = incorrect(stable());
    expect(next.recoveryState).toBe("recovering");
  });

  it("sets needsReview to true", () => {
    const next = incorrect(stable());
    expect(next.needsReview).toBe(true);
  });

  it("records lastMissedDifficulty", () => {
    const s = stable({ currentDifficulty: 4 });
    const next = incorrect(s);
    expect(next.lastMissedDifficulty).toBe(4);
  });

  it("decreases mastery slightly", () => {
    const s = stable({ mastery: 0.5 });
    const next = incorrect(s);
    expect(next.mastery).toBeLessThan(0.5);
    expect(next.mastery).toBeGreaterThanOrEqual(0);
  });

  it("does not drop mastery below 0", () => {
    const s = stable({ mastery: 0 });
    const next = incorrect(s);
    expect(next.mastery).toBe(0);
  });

  it("appends false to recentCorrect", () => {
    const s = stable({ recentCorrect: [true] });
    const next = incorrect(s);
    expect(next.recentCorrect.at(-1)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// updateMasteryState — two incorrect in a row
// ---------------------------------------------------------------------------

describe("updateMasteryState — two incorrect in a row", () => {
  it("keeps difficulty lowered (min 1) after two wrong answers", () => {
    const s = stable({ currentDifficulty: 3 });
    const after1 = incorrect(s);      // difficulty → 2
    const after2 = incorrect(after1); // difficulty → 1
    expect(after2.currentDifficulty).toBe(1);
    expect(after2.recoveryState).toBe("recovering");
  });

  it("stays at difficulty 1 when already at minimum", () => {
    const s = stable({ currentDifficulty: 1 });
    const after1 = incorrect(s);
    const after2 = incorrect(after1);
    expect(after2.currentDifficulty).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// updateMasteryState — correct while recovering
// ---------------------------------------------------------------------------

describe("updateMasteryState — correct while recovering", () => {
  it("steps difficulty back up toward lastMissedDifficulty", () => {
    // Miss at 3 → difficulty drops to 2 (recovering)
    const afterMiss = incorrect(stable({ currentDifficulty: 3 }));
    expect(afterMiss.currentDifficulty).toBe(2);
    expect(afterMiss.recoveryState).toBe("recovering");

    // Correct at 2 → should step up to 3
    const afterRecovery = correct(afterMiss);
    expect(afterRecovery.currentDifficulty).toBe(3);
  });

  it("clears recoveryState when difficulty reaches lastMissedDifficulty", () => {
    const afterMiss = incorrect(stable({ currentDifficulty: 3 }));
    const afterRecovery = correct(afterMiss); // back to 3 == lastMissedDifficulty
    expect(afterRecovery.recoveryState).toBe("stable");
    expect(afterRecovery.needsReview).toBe(false);
  });

  it("increases mastery on a correct recovery answer", () => {
    const afterMiss = incorrect(stable({ currentDifficulty: 3, mastery: 0.3 }));
    const afterRecovery = correct(afterMiss);
    expect(afterRecovery.mastery).toBeGreaterThan(afterMiss.mastery);
  });
});

// ---------------------------------------------------------------------------
// updateMasteryState — correct while stable
// ---------------------------------------------------------------------------

describe("updateMasteryState — correct while stable", () => {
  it("does NOT increase difficulty after only one correct answer", () => {
    const s = stable({ currentDifficulty: 3, recentCorrect: [] });
    const next = correct(s);
    expect(next.currentDifficulty).toBe(3);
  });

  it("increases difficulty after two correct answers in a row", () => {
    const s = stable({ currentDifficulty: 3, recentCorrect: [] });
    const after1 = correct(s);
    const after2 = correct(after1);
    expect(after2.currentDifficulty).toBe(4);
  });

  it("does not increase difficulty above 5", () => {
    const s = stable({ currentDifficulty: 5, recentCorrect: [true] });
    const next = correct(s);
    expect(next.currentDifficulty).toBe(5);
  });

  it("increases mastery on a correct stable answer", () => {
    const s = stable({ mastery: 0.5 });
    const next = correct(s);
    expect(next.mastery).toBeGreaterThan(0.5);
  });

  it("does not exceed mastery of 1", () => {
    const s = stable({ mastery: 1 });
    const next = correct(s);
    expect(next.mastery).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// chooseNextDifficulty
// ---------------------------------------------------------------------------

describe("chooseNextDifficulty", () => {
  it("returns currentDifficulty from the state", () => {
    const s = stable({ currentDifficulty: 4 });
    expect(chooseNextDifficulty(s)).toBe(4);
  });
});

// ---------------------------------------------------------------------------
// shouldShowHint
// ---------------------------------------------------------------------------

describe("shouldShowHint", () => {
  it("returns true when recovering", () => {
    const s = stable({ recoveryState: "recovering", needsReview: false });
    expect(shouldShowHint(s)).toBe(true);
  });

  it("returns true when needsReview is set", () => {
    const s = stable({ recoveryState: "stable", needsReview: true });
    expect(shouldShowHint(s)).toBe(true);
  });

  it("returns false when stable and no review needed", () => {
    const s = stable({ recoveryState: "stable", needsReview: false });
    expect(shouldShowHint(s)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Demo scenario: medium wrong → hint → easier right → back to medium
// ---------------------------------------------------------------------------

describe("demo scenario", () => {
  it("shows the full recovery loop from the steering doc", () => {
    // 1. Student gets a medium (3) question wrong
    const initial = stable({ currentDifficulty: 3, mastery: 0.4 });
    const afterWrong = incorrect(initial);

    expect(afterWrong.currentDifficulty).toBe(2);
    expect(afterWrong.recoveryState).toBe("recovering");
    expect(shouldShowHint(afterWrong)).toBe(true);

    // 2. Student gets the easier (2) question right
    const afterEasyRight = correct(afterWrong);

    expect(afterEasyRight.currentDifficulty).toBe(3); // stepped back up
    expect(afterEasyRight.recoveryState).toBe("stable");
    expect(afterEasyRight.needsReview).toBe(false);
    expect(afterEasyRight.mastery).toBeGreaterThan(afterWrong.mastery);
  });
});
