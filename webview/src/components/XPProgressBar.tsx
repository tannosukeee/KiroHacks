import React from 'react';

interface XPProgressBarProps {
  level: number;
  xpInLevel: number;
}

export function XPProgressBar({ level, xpInLevel }: XPProgressBarProps) {
  const percentage = Math.min(xpInLevel, 100);

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-vybe-panel">
      <span className="text-[10px] font-bold tracking-wider text-vybe-mustang-gold">
        LV{level}
      </span>
      <div className="flex-1 h-1.5 rounded-sm bg-vybe-poly-green overflow-hidden">
        <div
          className="h-full bg-vybe-mustang-gold transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-[10px] font-bold tracking-wider text-vybe-muted">
        {xpInLevel}/100 XP
      </span>
    </div>
  );
}
