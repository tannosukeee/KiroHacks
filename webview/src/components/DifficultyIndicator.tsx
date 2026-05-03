import React from 'react';
import { getDifficultyLabel } from '../state/gameState';

interface DifficultyIndicatorProps {
  difficulty: number;
  previousDifficulty?: number;
}

export function DifficultyIndicator({ difficulty, previousDifficulty }: DifficultyIndicatorProps) {
  const currentLabel = getDifficultyLabel(difficulty);

  return (
    <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--vybe-subtle)]">
      {previousDifficulty !== undefined && previousDifficulty !== difficulty ? (
        <span>
          DIFFICULTY:{' '}
          <span className="text-[var(--vybe-muted)]">{getDifficultyLabel(previousDifficulty)}</span>
          {' → '}
          <span className="text-[var(--vybe-amber)]">{currentLabel}</span>
        </span>
      ) : (
        <span>
          DIFFICULTY: <span className="text-[var(--vybe-muted)]">{currentLabel}</span>
        </span>
      )}
    </div>
  );
}
