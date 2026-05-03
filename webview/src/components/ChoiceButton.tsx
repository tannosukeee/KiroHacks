import React from 'react';

type ChoiceState = 'default' | 'correct' | 'incorrect' | 'disabled';

interface ChoiceButtonProps {
  label: string;
  text: string;
  state: ChoiceState;
  onClick: () => void;
}

export function ChoiceButton({ label, text, state, onClick }: ChoiceButtonProps) {
  const isDisabled = state === 'disabled' || state === 'correct' || state === 'incorrect';

  const baseClasses =
    'w-full flex items-center gap-3 px-4 py-3 rounded border text-left text-sm font-[var(--vybe-mono)] transition-colors duration-150';

  const stateClasses: Record<ChoiceState, string> = {
    default:
      'bg-[var(--vybe-panel)] border-[var(--vybe-border)] text-[var(--vybe-text)] hover:border-[var(--vybe-amber)] hover:bg-[var(--vybe-panel-raised)] cursor-pointer',
    correct:
      'bg-[var(--vybe-panel-raised)] border-[var(--vybe-amber)] text-[var(--vybe-amber)] cursor-default',
    incorrect:
      'bg-[var(--vybe-panel)] border-red-500/50 text-red-400 cursor-default',
    disabled:
      'bg-[var(--vybe-panel)] border-[var(--vybe-border)] text-[var(--vybe-subtle)] opacity-50 cursor-default',
  };

  return (
    <button
      className={`${baseClasses} ${stateClasses[state]}`}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
    >
      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded text-xs font-bold border border-current">
        {state === 'correct' ? '✓' : state === 'incorrect' ? '✗' : label}
      </span>
      <span className="flex-1">{text}</span>
    </button>
  );
}
