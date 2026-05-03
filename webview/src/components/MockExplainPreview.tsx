import React, { useState } from 'react';
import { ChoiceButton } from './ChoiceButton';
import { FeedbackBanner } from './FeedbackBanner';

interface QuizData {
  question: string;
  choices: string[];
  correctAnswerIndex: number;
  hint: string;
  explanation: string;
}

interface MockExplanationData {
  concept: string;
  lineReference: string;
  explanation: string;
  codeTokens: string[];
  language?: string;
  fileName?: string;
  quiz: QuizData;
}

interface MockExplainPreviewProps {
  data: MockExplanationData;
  onXpUpdate: (xp: number) => void;
}

const CHOICE_LABELS = ['A', 'B', 'C', 'D'];

type ChoiceState = 'default' | 'correct' | 'incorrect' | 'disabled';

export function MockExplainPreview({ data, onXpUpdate }: MockExplainPreviewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleChoiceClick = (index: number) => {
    if (isAnswered) return;

    setSelectedIndex(index);
    setIsAnswered(true);

    const isCorrect = index === data.quiz.correctAnswerIndex;
    const xpAwarded = isCorrect ? 15 : 5;
    onXpUpdate(xpAwarded);
  };

  const getChoiceState = (index: number): ChoiceState => {
    if (!isAnswered) return 'default';
    if (index === data.quiz.correctAnswerIndex) return 'correct';
    if (index === selectedIndex) return 'incorrect';
    return 'disabled';
  };

  const isCorrect = selectedIndex === data.quiz.correctAnswerIndex;
  const xpAwarded = isCorrect ? 15 : 5;

  return (
    <div className="space-y-4">
      {/* Line/concept title */}
      <div className="text-xs text-[var(--vybe-subtle)] tracking-wide uppercase">
        {data.lineReference} · <span className="text-[var(--vybe-amber)]">{data.concept}</span>
      </div>

      {/* Explanation text */}
      <p className="text-sm leading-relaxed text-[var(--vybe-text)]">
        {data.explanation}
      </p>

      {/* Code tokens */}
      <div className="flex flex-wrap gap-2">
        {data.codeTokens.map((token, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs rounded bg-[var(--vybe-chip-bg)] text-[var(--vybe-amber)] border border-[var(--vybe-border)]"
          >
            {token}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--vybe-border)] my-2" />

      {/* Quick check section */}
      <div className="space-y-3">
        <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--vybe-subtle)]">
          QUICK CHECK · +10 XP
        </div>

        <p className="text-sm text-[var(--vybe-text)] leading-relaxed">
          {data.quiz.question}
        </p>

        {/* Answer choices */}
        <div className="space-y-2">
          {data.quiz.choices.map((choice, index) => (
            <ChoiceButton
              key={index}
              label={CHOICE_LABELS[index] || String(index + 1)}
              text={choice}
              state={getChoiceState(index)}
              onClick={() => handleChoiceClick(index)}
            />
          ))}
        </div>

        {/* Feedback banner */}
        {isAnswered && (
          <FeedbackBanner
            isCorrect={isCorrect}
            hint={data.quiz.hint}
            xpAwarded={xpAwarded}
            quizExplanation={isCorrect ? data.quiz.explanation : undefined}
          />
        )}
      </div>
    </div>
  );
}
