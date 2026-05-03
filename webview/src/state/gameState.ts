export interface GameState {
  totalXp: number;
  level: number;
  xpInLevel: number;
  streak: number;
  combo: number;
  difficulty: number;
  isRecovering: boolean;
  lastMissedDifficulty: number | null;
  concept: string;
}

export function createInitialGameState(concept: string): GameState {
  return {
    totalXp: 0,
    level: 1,
    xpInLevel: 0,
    streak: 1,
    combo: 0,
    difficulty: 3,
    isRecovering: false,
    lastMissedDifficulty: null,
    concept,
  };
}

function calculateLevel(totalXp: number): number {
  return Math.min(Math.floor(totalXp / 100) + 1, 10);
}

function calculateXpInLevel(totalXp: number): number {
  return totalXp % 100;
}

export function processCorrectAnswer(state: GameState): GameState {
  const xpGain = state.isRecovering ? 15 : 10;
  const newTotalXp = state.totalXp + xpGain;
  const newCombo = state.combo + 1;

  let newDifficulty = state.difficulty;
  let newIsRecovering = state.isRecovering;
  let newLastMissedDifficulty = state.lastMissedDifficulty;

  if (state.isRecovering && state.lastMissedDifficulty !== null) {
    // In recovery: increase difficulty toward the missed level
    newDifficulty = Math.min(state.difficulty + 1, 5);
    if (newDifficulty >= state.lastMissedDifficulty) {
      newIsRecovering = false;
      newLastMissedDifficulty = null;
    }
  } else if (newCombo >= 2) {
    // Stable + combo: increase difficulty
    newDifficulty = Math.min(state.difficulty + 1, 5);
  }

  return {
    ...state,
    totalXp: newTotalXp,
    level: calculateLevel(newTotalXp),
    xpInLevel: calculateXpInLevel(newTotalXp),
    combo: newCombo,
    difficulty: newDifficulty,
    isRecovering: newIsRecovering,
    lastMissedDifficulty: newLastMissedDifficulty,
  };
}

export function processWrongAnswer(state: GameState): GameState {
  const xpGain = 5;
  const newTotalXp = state.totalXp + xpGain;
  const newDifficulty = Math.max(state.difficulty - 1, 1);

  return {
    ...state,
    totalXp: newTotalXp,
    level: calculateLevel(newTotalXp),
    xpInLevel: calculateXpInLevel(newTotalXp),
    combo: 0,
    difficulty: newDifficulty,
    isRecovering: true,
    lastMissedDifficulty: state.difficulty,
  };
}

export function getDifficultyLabel(difficulty: number): string {
  const labels: Record<number, string> = {
    1: 'Very Easy',
    2: 'Easy',
    3: 'Medium',
    4: 'Hard',
    5: 'Challenge',
  };
  return labels[difficulty] || 'Medium';
}
