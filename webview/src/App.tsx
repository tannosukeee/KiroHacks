import React, { useState, useEffect } from 'react';
import { HeaderBar } from './components/HeaderBar';
import { EmptyState } from './components/EmptyState';
import { MockExplainPreview } from './components/MockExplainPreview';
import { useVSCodeApi } from './hooks/useVSCodeApi';

interface MockExplanationData {
  concept: string;
  lineReference: string;
  explanation: string;
  codeTokens: string[];
}

export function App() {
  const vscodeApi = useVSCodeApi();
  const [explanationData, setExplanationData] = useState<MockExplanationData | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (message.type === 'mockExplanation') {
        setExplanationData(message.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--vybe-bg)] text-[var(--vybe-text)] font-[var(--vybe-mono)]">
      <HeaderBar />
      <main className="p-4">
        {explanationData ? (
          <MockExplainPreview data={explanationData} />
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
}
