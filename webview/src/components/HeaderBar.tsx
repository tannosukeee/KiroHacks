import React from 'react';
import { XPProgressBar } from './XPProgressBar';
import { GameState } from '../state/gameState';

interface HeaderBarProps {
  isLive: boolean;
  gameState: GameState;
}

export function HeaderBar({ isLive, gameState }: HeaderBarProps) {
  return (
    <header className="border-b border-vybe-border bg-vybe-panel">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-vybe-text">
          VYBE EXPLAIN
        </span>
        <div className="flex items-center gap-3">
          {gameState.streak > 0 && (
            <span className="text-[10px] font-bold tracking-wider text-vybe-stadium-gold opacity-70">
              🔥 {gameState.streak}
            </span>
          )}
          <span
            className={`px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full ${
              isLive
                ? 'bg-vybe-poly-green text-vybe-mustang-gold'
                : 'bg-vybe-panel-2 text-vybe-muted'
            }`}
          >
            {isLive ? 'LIVE' : 'IDLE'}
          </span>
        </div>
      </div>
      <XPProgressBar level={gameState.level} xpInLevel={gameState.xpInLevel} />
    </header>
  );
}
