import React from 'react';

interface MockExplanationData {
  concept: string;
  lineReference: string;
  explanation: string;
  codeTokens: string[];
}

interface MockExplainPreviewProps {
  data: MockExplanationData;
}

export function MockExplainPreview({ data }: MockExplainPreviewProps) {
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

      {/* Placeholder quick-check card area */}
      <div className="mt-6 p-4 rounded border border-[var(--vybe-border)] bg-[var(--vybe-panel-raised)]">
        <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-[var(--vybe-subtle)] mb-2">
          QUICK CHECK · +10 XP
        </div>
        <p className="text-xs text-[var(--vybe-muted)]">
          Quiz questions will appear here in a later stage.
        </p>
      </div>
    </div>
  );
}
