import React from 'react';

interface FeedbackBannerProps {
  isCorrect: boolean;
  hint: string;
  xpAwarded: number;
  combo?: number;
  isRecovering?: boolean;
  difficultyChange?: string;
  quizExplanation?: string;
  onContinue?: () => void;
  onTryEasier?: () => void;
}

export function FeedbackBanner({
  isCorrect,
  hint,
  xpAwarded,
  combo,
  isRecovering,
  difficultyChange,
  quizExplanation,
  onContinue,
  onTryEasier,
}: FeedbackBannerProps) {
  if (isCorrect) {
    return (
      <div className="mt-4 p-4 rounded border border-[var(--vybe-amber)]/30 bg-[var(--vybe-amber-dark)]/20">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[var(--vybe-amber)] font-bold text-sm">✓ Correct!</span>
          <span className="text-xs text-[var(--vybe-amber)] opacity-80">+{xpAwarded} XP</span>
          {combo !== undefined && combo > 1 && (
            <span className="text-xs font-bold text-[var(--vybe-amber)]">
              Combo x{combo}
            </span>
          )}
        </div>
        {quizExplanation && (
          <p className="text-xs text-[var(--vybe-muted)] leading-relaxed mt-2">
            {quizExplanation}
          </p>
        )}
        {onContinue && (
          <button
            onClick={onContinue}
            className="w-full mt-3 px-4 py-3 rounded border border-[var(--vybe-amber)] bg-[var(--vybe-amber-dark)]/30 text-sm font-bold text-[var(--vybe-amber)] hover:bg-[var(--vybe-amber-dark)]/50 transition-colors"
          >
            Continue
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 rounded border border-red-500/20 bg-red-500/5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-red-400 font-bold text-sm">✗ Not quite</span>
        <span className="text-xs text-[var(--vybe-muted)]">+{xpAwarded} XP</span>
      </div>
      {isRecovering && (
        <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-red-500/10 text-red-400/80 border border-red-500/20">
          RECOVERY MODE
        </span>
      )}
      {difficultyChange && (
        <p className="text-[10px] font-bold tracking-wider uppercase text-[var(--vybe-subtle)] mt-2">
          {difficultyChange}
        </p>
      )}
      <p className="text-xs text-[var(--vybe-muted)] leading-relaxed mt-2">
        <span className="text-[var(--vybe-amber)]">Hint:</span> {hint}
      </p>
      {quizExplanation && (
        <details className="mt-2">
          <summary className="text-xs text-[var(--vybe-subtle)] cursor-pointer hover:text-[var(--vybe-muted)]">
            Review Explanation
          </summary>
          <p className="text-xs text-[var(--vybe-muted)] leading-relaxed mt-1">
            {quizExplanation}
          </p>
        </details>
      )}
      {onTryEasier && (
        <button
          onClick={onTryEasier}
          className="w-full mt-3 px-4 py-3 rounded border border-[var(--vybe-border)] bg-[var(--vybe-panel-raised)] text-sm font-bold text-[var(--vybe-text)] hover:border-[var(--vybe-amber)] hover:text-[var(--vybe-amber)] transition-colors"
        >
          Try Easier Question
        </button>
      )}
    </div>
  );
}
