import React, { useState, useEffect } from 'react';
import { HeaderBar } from './components/HeaderBar';
import { EmptyState } from './components/EmptyState';
import { MockExplainPreview } from './components/MockExplainPreview';
import { useVSCodeApi } from './hooks/useVSCodeApi';

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
  const [totalXp, setTotalXp] = useState(0);
  const [explanationKey, setExplanationKey] = useState(0);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (message.type === 'mockExplanation') {
        setExplanationData(message.data);
        setIsLive(true);
        setExplanationKey((prev) => prev + 1);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleXpUpdate = (xp: number) => {
    setTotalXp((prev) => prev + xp);
  };

  return (
    <div className="min-h-screen bg-[var(--vybe-bg)] text-[var(--vybe-text)] font-[var(--vybe-mono)]">
      <HeaderBar isLive={isLive} totalXp={totalXp} />
      <main className="p-4">
        {explanationData ? (
          <MockExplainPreview
            key={explanationKey}
            data={explanationData}
            onXpUpdate={handleXpUpdate}
          />
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}
