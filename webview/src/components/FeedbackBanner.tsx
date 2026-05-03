import React from 'react';

interface FeedbackBannerProps {
  isCorrect: boolean;
  hint: string;
  xpAwarded: number;
  quizExplanation?: string;
}

export function FeedbackBanner({ isCorrect, hint, xpAwarded, quizExplanation }: FeedbackBannerProps) {
  if (isCorrect) {
    return (
      <div className="mt-4 p-4 rounded border border-[var(--vybe-amber)]/30 bg-[var(--vybe-amber-dark)]/20">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[var(--vybe-amber)] font-bold text-sm">✓ Nice work!</span>
          <span className="text-xs text-[var(--vybe-amber)] opacity-80">+{xpAwarded} XP</span>
        </div>
        {quizExplanation && (
          <p className="text-xs text-[var(--vybe-muted)] leading-relaxed mt-2">
            {quizExplanation}
          </p>
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
      <p className="text-xs text-[var(--vybe-muted)] leading-relaxed mt-2">
        <span className="text-[var(--vybe-amber)]">Hint:</span> {hint}
      </p>
    </div>
  );
}
