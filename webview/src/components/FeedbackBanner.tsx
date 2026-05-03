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
      <div className="mt-4 p-4 rounded border border-vybe-success-deep/40 bg-vybe-poly-green/20">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-vybe-mustang-gold font-bold text-sm">✓ Correct!</span>
          <span className="text-xs text-vybe-stadium-gold opacity-80">+{xpAwarded} XP</span>
          {combo !== undefined && combo > 1 && (
            <span className="text-xs font-bold text-vybe-poly-canyon">
              Combo x{combo}
            </span>
          )}
        </div>
        {quizExplanation && (
          <p className="text-xs text-vybe-muted leading-relaxed mt-2">
            {quizExplanation}
          </p>
        )}
        {onContinue && (
          <button
            onClick={onContinue}
            className="w-full mt-3 px-4 py-3 rounded border border-vybe-mustang-gold bg-vybe-poly-green/30 text-sm font-bold text-vybe-mustang-gold hover:bg-vybe-poly-green/50 transition-colors"
          >
            Next Challenge
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 rounded border border-vybe-error/20 bg-vybe-error-bg/30">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-vybe-error font-bold text-sm">✗ Not quite</span>
        <span className="text-xs text-vybe-muted">+{xpAwarded} XP</span>
      </div>
      {isRecovering && (
        <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-vybe-error/10 text-vybe-error/80 border border-vybe-error/20">
          RECOVERY MODE
        </span>
      )}
      {difficultyChange && (
        <p className="text-[10px] font-bold tracking-wider uppercase text-vybe-muted mt-2">
          {difficultyChange}
        </p>
      )}
      <p className="text-xs text-vybe-muted leading-relaxed mt-2">
        <span className="text-vybe-mustang-gold">Hint:</span> {hint}
      </p>
      {quizExplanation && (
        <details className="mt-2">
          <summary className="text-xs text-vybe-muted cursor-pointer hover:text-vybe-text">
            Review Explanation
          </summary>
          <p className="text-xs text-vybe-muted leading-relaxed mt-1">
            {quizExplanation}
          </p>
        </details>
      )}
      {onTryEasier && (
        <button
          onClick={onTryEasier}
          className="w-full mt-3 px-4 py-3 rounded border border-vybe-border bg-vybe-card-raised text-sm font-bold text-vybe-text hover:border-vybe-mustang-gold hover:text-vybe-mustang-gold transition-colors"
        >
          Try Easier Question
        </button>
      )}
    </div>
  );
}
