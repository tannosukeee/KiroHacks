import React from 'react';
import { getDifficultyLabel } from '../state/gameState';

interface DifficultyIndicatorProps {
  difficulty: number;
  previousDifficulty?: number;
}

export function DifficultyIndicator({ difficulty, previousDifficulty }: DifficultyIndicatorProps) {
  const currentLabel = getDifficultyLabel(difficulty);

  return (
    <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-vybe-muted">
      {previousDifficulty !== undefined && previousDifficulty !== difficulty ? (
        <span>
          DIFFICULTY:{' '}
          <span className="text-vybe-muted">{getDifficultyLabel(previousDifficulty)}</span>
          {' → '}
          <span className="text-vybe-mustang-gold">{currentLabel}</span>
        </span>
      ) : (
        <span>
          DIFFICULTY: <span className="text-vybe-muted">{currentLabel}</span>
        </span>
      )}
    </div>
  );
}
