import React from 'react';

export function EmptyState() {
  return (
    <div className="flex items-center justify-center min-h-[200px] px-6">
      <p className="text-sm text-[var(--vybe-muted)] text-center leading-relaxed">
        Select code and run{' '}
        <span className="text-[var(--vybe-amber)]">'Vybe Tutor: Explain Selection'</span>{' '}
        to get started.
      </p>
    </div>
  );
}
