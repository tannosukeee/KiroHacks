import { describe, it, expect } from "vitest";
import {
  calculateLevel,
  awardQuizXp,
  updateDailyStreak,
  XP_CORRECT_ANSWER,
  XP_QUIZ_ATTEMPT,
  XP_RECOVERY_BONUS,
  MAX_LEVEL,
} from "../../src/services/gamification";
import { createGamificationState } from "../../src/schemas/gamification";
import type { GamificationState } from "../../src/schemas/gamification";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function fresh(): GamificationState {
  return createGamificationState();
}

// ---------------------------------------------------------------------------
// calculateLevel
// ---------------------------------------------------------------------------

describe("calculateLevel", () => {
  it("starts at level 1 with 0 XP", () => {
    expect(calculateLevel(0)).toBe(1);
  });

  it("stays at level 1 below 100 XP", () => {
    expect(calculateLevel(99)).toBe(1);
  });

  it("reaches level 2 at exactly 100 XP", () => {
    expect(calculateLevel(100)).toBe(2);
  });

  it("reaches level 3 at 200 XP", () => {
    expect(calculateLevel(200)).toBe(3);
  });

  it("caps at MAX_LEVEL (10) regardless of XP", () => {
    expect(calculateLevel(10_000)).toBe(MAX_LEVEL);
    expect(calculateLevel(900)).toBe(MAX_LEVEL);
    expect(calculateLevel(1_000_000)).toBe(MAX_LEVEL);
  });

  it("reaches level 10 at exactly 900 XP", () => {
    expect(calculateLevel(900)).toBe(MAX_LEVEL);
  });
});

// ---------------------------------------------------------------------------
// awardQuizXp — attempt XP
// ---------------------------------------------------------------------------

describe("awardQuizXp — attempt XP", () => {
  it("always awards attempt XP on an incorrect answer", () => {
    const state = fresh();
    const next = awardQuizXp({ state, isCorrect: false });
    expect(next.totalXp).toBe(XP_QUIZ_ATTEMPT);
  });

  it("awards attempt XP + correct XP on a correct answer", () => {
    const state = fresh();
    const next = awardQuizXp({ state, isCorrect: true });
    expect(next.totalXp).toBe(XP_QUIZ_ATTEMPT + XP_CORRECT_ANSWER);
  });

  it("awards attempt + correct + recovery XP on a recovery correct answer", () => {
    const state = fresh();
    const next = awardQuizXp({ state, isCorrect: true, isRecovery: true });
    expect(next.totalXp).toBe(XP_QUIZ_ATTEMPT + XP_CORRECT_ANSWER + XP_RECOVERY_BONUS);
  });

  it("does NOT award recovery bonus on an incorrect recovery attempt", () => {
    const state = fresh();
    const next = awardQuizXp({ state, isCorrect: false, isRecovery: true });
    expect(next.totalXp).toBe(XP_QUIZ_ATTEMPT);
  });

  it("accumulates XP across multiple calls", () => {
    let state = fresh();
    state = awardQuizXp({ state, isCorrect: true });
    state = awardQuizXp({ state, isCorrect: true });
    expect(state.totalXp).toBe((XP_QUIZ_ATTEMPT + XP_CORRECT_ANSWER) * 2);
  });
});

// ---------------------------------------------------------------------------
// awardQuizXp — level recalculation
// ---------------------------------------------------------------------------

describe("awardQuizXp — level recalculation", () => {
  it("updates level when XP crosses a threshold", () => {
    const state: GamificationState = { ...fresh(), totalXp: 95 };
    // +15 XP (attempt + correct) → 110 XP → level 2
    const next = awardQuizXp({ state, isCorrect: true });
    expect(next.level).toBe(2);
  });

  it("does not exceed MAX_LEVEL", () => {
    const state: GamificationState = { ...fresh(), totalXp: 9_999 };
    const next = awardQuizXp({ state, isCorrect: true });
    expect(next.level).toBe(MAX_LEVEL);
  });
});

// ---------------------------------------------------------------------------
// updateDailyStreak — first quiz ever
// ---------------------------------------------------------------------------

describe("updateDailyStreak — first quiz", () => {
  it("sets streak to 1 on the very first quiz", () => {
    const state = fresh();
    const next = updateDailyStreak({ state, todayDate: "2026-05-02" });
    expect(next.currentStreak).toBe(1);
    expect(next.lastQuizDate).toBe("2026-05-02");
  });

  it("adds today to completedQuizDates", () => {
    const state = fresh();
    const next = updateDailyStreak({ state, todayDate: "2026-05-02" });
    expect(next.completedQuizDates).toContain("2026-05-02");
  });
});

// ---------------------------------------------------------------------------
// updateDailyStreak — consecutive days
// ---------------------------------------------------------------------------

describe("updateDailyStreak — consecutive days", () => {
  it("increments streak when last quiz was yesterday", () => {
    const state: GamificationState = {
      ...fresh(),
      currentStreak: 3,
      lastQuizDate: "2026-05-01",
      completedQuizDates: ["2026-04-29", "2026-04-30", "2026-05-01"],
    };
    const next = updateDailyStreak({ state, todayDate: "2026-05-02" });
    expect(next.currentStreak).toBe(4);
  });

  it("resets streak to 1 when there is a gap of more than one day", () => {
    const state: GamificationState = {
      ...fresh(),
      currentStreak: 5,
      lastQuizDate: "2026-04-28",
      completedQuizDates: ["2026-04-28"],
    };
    const next = updateDailyStreak({ state, todayDate: "2026-05-02" });
    expect(next.currentStreak).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// updateDailyStreak — same day idempotency
// ---------------------------------------------------------------------------

describe("updateDailyStreak — same day", () => {
  it("does not change streak when called twice on the same day", () => {
    const state = fresh();
    const after1 = updateDailyStreak({ state, todayDate: "2026-05-02" });
    const after2 = updateDailyStreak({ state: after1, todayDate: "2026-05-02" });
    expect(after2.currentStreak).toBe(1);
    expect(after2.lastQuizDate).toBe("2026-05-02");
  });

  it("does not duplicate the date in completedQuizDates", () => {
    const state = fresh();
    const after1 = updateDailyStreak({ state, todayDate: "2026-05-02" });
    const after2 = updateDailyStreak({ state: after1, todayDate: "2026-05-02" });
    const count = after2.completedQuizDates.filter((d) => d === "2026-05-02").length;
    expect(count).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// updateDailyStreak — malformed date guard
// ---------------------------------------------------------------------------

describe("updateDailyStreak — malformed date guard", () => {
  it("throws when todayDate is not a YYYY-MM-DD string", () => {
    const state = fresh();
    expect(() =>
      updateDailyStreak({ state, todayDate: "2026-05-02T00:00:00" })
    ).toThrow();
    expect(() =>
      updateDailyStreak({ state, todayDate: "" })
    ).toThrow();
  });
});

// ---------------------------------------------------------------------------
// updateDailyStreak — pause does not break an already-earned streak
// ---------------------------------------------------------------------------

describe("updateDailyStreak — pause/snooze safety", () => {
  it("preserves streak when the user already completed a quiz today before pausing", () => {
    // Simulate: user completed a quiz today, then paused.
    // A subsequent call with the same todayDate must not reset the streak.
    const state: GamificationState = {
      ...fresh(),
      currentStreak: 7,
      lastQuizDate: "2026-05-02",
      completedQuizDates: ["2026-05-02"],
    };
    // Calling again on the same day (e.g., after snooze expires) is a no-op.
    const next = updateDailyStreak({ state, todayDate: "2026-05-02" });
    expect(next.currentStreak).toBe(7);
  });
});

// ---------------------------------------------------------------------------
// Full XP + streak integration scenario
// ---------------------------------------------------------------------------

describe("integration — XP and streak across two days", () => {
  it("accumulates XP and streak correctly over two quiz sessions", () => {
    let gState = fresh();

    // Day 1: correct answer
    gState = awardQuizXp({ state: gState, isCorrect: true });
    gState = updateDailyStreak({ state: gState, todayDate: "2026-05-01" });

    expect(gState.totalXp).toBe(XP_QUIZ_ATTEMPT + XP_CORRECT_ANSWER); // 15
    expect(gState.currentStreak).toBe(1);

    // Day 2: recovery correct answer
    gState = awardQuizXp({ state: gState, isCorrect: true, isRecovery: true });
    gState = updateDailyStreak({ state: gState, todayDate: "2026-05-02" });

    expect(gState.totalXp).toBe(
      XP_QUIZ_ATTEMPT + XP_CORRECT_ANSWER + // day 1
      XP_QUIZ_ATTEMPT + XP_CORRECT_ANSWER + XP_RECOVERY_BONUS // day 2
    ); // 35
    expect(gState.currentStreak).toBe(2);
    expect(gState.level).toBe(1); // still below 100 XP
  });
});
