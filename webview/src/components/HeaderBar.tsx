import React from 'react';

export function HeaderBar() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-[var(--vybe-border)] bg-[var(--vybe-panel)]">
      <span className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--vybe-text)]">
        VYBE EXPLAIN
      </span>
      <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-[var(--vybe-amber-dark)] text-[var(--vybe-amber)]">
        LIVE
      </span>
    </header>
  );
}
