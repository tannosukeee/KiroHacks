import React, { useState } from 'react';
import { ChoiceButton } from './ChoiceButton';
import { FeedbackBanner } from './FeedbackBanner';
import { DifficultyIndicator } from './DifficultyIndicator';
import { GameState, processCorrectAnswer, processWrongAnswer, getDifficultyLabel } from '../state/gameState';
import { getNextQuestion, MockQuestion } from '../data/mockQuestions';

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
  gameState: GameState;
  onGameStateUpdate: (newState: GameState) => void;
}

const CHOICE_LABELS = ['A', 'B', 'C', 'D'];

type ChoiceState = 'default' | 'correct' | 'incorrect' | 'disabled';

export function MockExplainPreview({ data, gameState, onGameStateUpdate }: MockExplainPreviewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuizData>(data.quiz);
  const [previousDifficulty, setPreviousDifficulty] = useState<number | undefined>(undefined);

  const handleChoiceClick = (index: number) => {
    if (isAnswered) return;

    setSelectedIndex(index);
    setIsAnswered(true);

    const isCorrect = index === currentQuestion.correctAnswerIndex;

    if (isCorrect) {
      const newState = processCorrectAnswer(gameState);
      setPreviousDifficulty(gameState.difficulty);
      onGameStateUpdate(newState);
    } else {
      const newState = processWrongAnswer(gameState);
      setPreviousDifficulty(gameState.difficulty);
      onGameStateUpdate(newState);
    }
  };

  const getChoiceState = (index: number): ChoiceState => {
    if (!isAnswered) return 'default';
    if (index === currentQuestion.correctAnswerIndex) return 'correct';
    if (index === selectedIndex) return 'incorrect';
    return 'disabled';
  };

  const handleContinue = () => {
    // Get next question at same or higher difficulty
    const nextQ = getNextQuestion(
      gameState.concept,
      gameState.difficulty,
      currentQuestion.question
    );
    if (nextQ) {
      loadNewQuestion(nextQ);
    }
  };

  const handleTryEasier = () => {
    // Get question at lower difficulty, same concept
    const nextQ = getNextQuestion(
      gameState.concept,
      gameState.difficulty,
      currentQuestion.question
    );
    if (nextQ) {
      loadNewQuestion(nextQ);
    }
  };

  const loadNewQuestion = (q: MockQuestion) => {
    setCurrentQuestion({
      question: q.question,
      choices: q.choices,
      correctAnswerIndex: q.correctAnswerIndex,
      hint: q.hint,
      explanation: q.explanation,
    });
    setSelectedIndex(null);
    setIsAnswered(false);
    setPreviousDifficulty(undefined);
  };

  const isCorrect = selectedIndex === currentQuestion.correctAnswerIndex;
  const xpAwarded = isAnswered
    ? isCorrect
      ? gameState.isRecovering ? 15 : 10
      : 5
    : 0;

  // Build difficulty change string for wrong answers
  const difficultyChangeStr = isAnswered && !isCorrect && previousDifficulty !== undefined
    ? `${getDifficultyLabel(previousDifficulty)} → ${getDifficultyLabel(gameState.difficulty)}`
    : undefined;

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
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--vybe-subtle)]">
            QUICK CHECK · +10 XP
          </div>
          <DifficultyIndicator
            difficulty={gameState.difficulty}
            previousDifficulty={previousDifficulty}
          />
        </div>

        <p className="text-sm text-[var(--vybe-text)] leading-relaxed">
          {currentQuestion.question}
        </p>

        {/* Answer choices */}
        <div className="space-y-2">
          {currentQuestion.choices.map((choice, index) => (
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
            hint={currentQuestion.hint}
            xpAwarded={xpAwarded}
            combo={gameState.combo}
            isRecovering={!isCorrect ? true : undefined}
            difficultyChange={difficultyChangeStr}
            quizExplanation={currentQuestion.explanation}
            onContinue={isCorrect ? handleContinue : undefined}
            onTryEasier={!isCorrect ? handleTryEasier : undefined}
          />
        )}
      </div>
    </div>
  );
}
