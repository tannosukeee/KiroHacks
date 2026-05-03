import React, { useState, useEffect } from 'react';
import { HeaderBar } from './components/HeaderBar';
import { EmptyState } from './components/EmptyState';
import { MockExplainPreview } from './components/MockExplainPreview';
import { useVSCodeApi } from './hooks/useVSCodeApi';
import { GameState, createInitialGameState } from './state/gameState';

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

export function App() {
  const vscodeApi = useVSCodeApi();
  const [explanationData, setExplanationData] = useState<MockExplanationData | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [gameState, setGameState] = useState<GameState>(createInitialGameState(''));
  const [explanationKey, setExplanationKey] = useState(0);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (message.type === 'mockExplanation') {
        setExplanationData(message.data);
        setIsLive(true);
        setExplanationKey((prev) => prev + 1);

        // Initialize game state concept from the explanation data
        setGameState((prev) => ({
          ...prev,
          concept: message.data.concept,
        }));
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleGameStateUpdate = (newState: GameState) => {
    setGameState(newState);
  };

  return (
    <div className="min-h-screen bg-vybe-bg text-vybe-text font-[var(--vybe-mono)]">
      <HeaderBar isLive={isLive} gameState={gameState} />
      <main className="p-4">
        {explanationData ? (
          <MockExplainPreview
            key={explanationKey}
            data={explanationData}
            gameState={gameState}
            onGameStateUpdate={handleGameStateUpdate}
          />
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}
