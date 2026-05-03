import React from 'react';

interface HeaderBarProps {
  isLive: boolean;
  totalXp: number;
}

export function HeaderBar({ isLive, totalXp }: HeaderBarProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--vybe-border)] bg-[var(--vybe-panel)]">
      <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--vybe-text)]">
        VYBE EXPLAIN
      </span>
      <div className="flex items-center gap-3">
        {totalXp > 0 && (
          <span className="text-[10px] font-bold tracking-wider text-[var(--vybe-amber)]">
            {totalXp} XP
          </span>
        )}
        <span
          className={`px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full ${
            isLive
              ? 'bg-[var(--vybe-amber-dark)] text-[var(--vybe-amber)]'
              : 'bg-[var(--vybe-panel-raised)] text-[var(--vybe-subtle)]'
          }`}
        >
          {isLive ? 'LIVE' : 'IDLE'}
        </span>
      </div>
    </header>
  );
}
