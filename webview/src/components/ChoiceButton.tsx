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
      'bg-vybe-card border-vybe-border-muted text-vybe-text hover:border-vybe-mustang-gold hover:bg-vybe-card-raised hover:shadow-[0_0_6px_rgba(189,139,19,0.15)] cursor-pointer',
    correct:
      'bg-vybe-card-raised border-vybe-dexter-green text-vybe-stadium-gold cursor-default',
    incorrect:
      'bg-vybe-card border-vybe-error/50 text-vybe-error cursor-default',
    disabled:
      'bg-vybe-card border-vybe-border-muted text-vybe-muted opacity-55 cursor-default',
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
