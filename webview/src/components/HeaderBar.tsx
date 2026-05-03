interface HeaderBarProps {
  mode: "IDLE" | "LIVE";
}

export function HeaderBar({ mode }: HeaderBarProps) {
  return (
    <header className="flex items-center justify-between border-b border-vybe-border bg-vybe-panel px-4 py-3">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-vybe-text">
        VYBE EXPLAIN
      </span>
      <span className="rounded-full bg-[#8f6f1f] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-vybe-amber">
        {mode}
      </span>
    </header>
  );
}
