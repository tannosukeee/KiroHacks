interface IDEMockupProps {
  variant?: 'hero' | 'inside';
}

export default function IDEMockup({ variant = 'hero' }: IDEMockupProps) {
  const isHero = variant === 'hero';

  return (
    <div className={`bg-[#1e1e2e] rounded-xl shadow-ide overflow-hidden border border-white/10 ${isHero ? 'w-full max-w-[580px]' : 'w-full max-w-[960px]'}`}>
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#181825] border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-gray-500 text-[10px] font-mono ml-2">[Extension Development Host]</span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex items-center bg-[#181825] border-b border-white/5 px-2 overflow-hidden">
        <Tab name="auth.ts" active />
        {!isHero && <Tab name="route.ts" />}
        {!isHero && <Tab name="db.ts" />}
      </div>

      {/* Main content */}
      <div className="flex">
        {/* Activity bar */}
        <div className="w-10 bg-[#181825] border-r border-white/5 flex flex-col items-center py-3 gap-3 shrink-0">
          <ActivityIcon d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          <ActivityIcon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          <ActivityIcon d="M13 10V3L4 14h7v7l9-11h-7z" />
          <div className="w-7 h-7 rounded bg-gold-500/20 flex items-center justify-center ring-1 ring-gold-500/30">
            <span className="text-gold-500 text-[10px] font-bold font-mono">V</span>
          </div>
          <div className="mt-auto">
            <ActivityIcon d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          </div>
        </div>

        {/* Vybe Tutor sidebar */}
        <VybeSidebar isHero={isHero} />

        {/* Code editor */}
        <div className="flex-1 overflow-hidden">
          <div className="px-1 py-1 text-[10px] text-gray-500 font-mono border-b border-white/5 bg-[#1e1e2e]">
            <span className="text-gray-600">src &gt; lib &gt;</span> <span className="text-gray-400">auth.ts</span>
          </div>
          <CodeEditor isHero={isHero} />
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-3 py-0.5 bg-[#181825] border-t border-white/5 text-[9px] font-mono">
        <div className="flex items-center gap-3">
          <span className="text-gray-500">⎇ main</span>
          <span className="text-gray-500">⊘ 0 ⚠ 2</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-gold-400">
            <span>🔥</span> Vybe · LV 1
          </span>
          <span className="text-green-400">20 XP</span>
          <span className="text-gray-500">Ln 22, Col 1</span>
          <span className="text-gray-500">TypeScript</span>
        </div>
      </div>
    </div>
  );
}

/* ---- Vybe Tutor Sidebar ---- */
function VybeSidebar({ isHero }: { isHero: boolean }) {
  return (
    <div className={`bg-[#0f1a15] border-r border-green-900/20 flex flex-col shrink-0 ${isHero ? 'w-[220px]' : 'w-[280px]'}`}>
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-white/5">
        <div className="flex items-center justify-between">
          <span className="text-gray-200 font-mono text-[10px] font-bold tracking-widest">VYBE EXPLAIN</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px]">🔥</span>
            <span className="text-gray-400 text-[10px] font-mono">1</span>
            <span className="bg-green-500/20 text-green-400 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded">LIVE</span>
          </div>
        </div>
        {/* XP bar */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-gray-500 font-mono text-[9px]">LV1</span>
          <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: '20%' }} />
          </div>
          <span className="text-gray-500 font-mono text-[9px]">20/100 XP</span>
        </div>
      </div>

      {/* Line reference */}
      <div className="px-3 py-2 border-b border-white/5">
        <span className="text-gray-500 font-mono text-[9px] tracking-wider">
          LINE 22 · AUTH.TS · <span className="text-gold-400">ASYNC/AWAIT</span>
        </span>
      </div>

      {/* Explanation */}
      <div className="px-3 py-3 flex-1 overflow-hidden">
        <p className="text-gray-300 text-[11px] leading-relaxed mb-3">
          The async/await pattern lets you write asynchronous code that reads like synchronous code. An async function always returns a Promise, and await pauses execution until that Promise resolves.
        </p>

        {/* Concept chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {[
            { label: 'function', color: 'border-gray-600 bg-white/5 text-gray-300' },
            { label: 'variable', color: 'border-gold-500/40 bg-gold-500/10 text-gold-400' },
            { label: 'logic', color: 'border-green-500/30 bg-green-500/10 text-green-400' },
          ].map((chip) => (
            <span key={chip.label} className={`px-2 py-0.5 rounded border font-mono text-[9px] ${chip.color}`}>
              {chip.label}
            </span>
          ))}
        </div>

        {/* Quick check */}
        <div className="border-t border-white/5 pt-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gold-400 font-mono text-[9px] font-bold tracking-wider">QUICK CHECK · +10 XP</span>
            <span className="text-gray-600 font-mono text-[8px]">DIFFICULTY: EASY → MEDIUM</span>
          </div>
          <p className="text-gray-200 text-[11px] mb-3">
            What keyword marks a function as asynchronous?
          </p>

          {/* Answer choices */}
          <div className="space-y-1.5">
            <AnswerChoice letter="A" text="await" />
            <AnswerChoice letter="B" text="async" correct />
            <AnswerChoice letter="C" text="promise" />
            <AnswerChoice letter="D" text="defer" />
          </div>

          {/* Correct feedback */}
          {!isHero ? (
            <div className="mt-3 bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <p className="text-green-400 text-[10px] font-mono font-bold mb-1">✓ Correct! +10 XP</p>
              <p className="text-gray-400 text-[10px] leading-relaxed">
                The async keyword before a function declaration marks it as asynchronous, meaning it will always return a Promise.
              </p>
              <button className="w-full mt-2.5 bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-[10px] py-2 rounded transition-colors">
                Next Challenge
              </button>
            </div>
          ) : (
            <div className="mt-3 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-red-400 text-[10px] font-mono font-bold">✗ Not quite</span>
                <span className="text-gray-500 text-[9px]">+5 XP</span>
              </div>
              <span className="inline-block border border-gray-600 text-gray-400 font-mono text-[8px] px-1.5 py-0.5 rounded mb-1.5">RECOVERY MODE</span>
              <p className="text-gray-500 font-mono text-[8px] mb-1">MEDIUM → EASY</p>
              <p className="text-gold-400 text-[10px] mb-1">
                <span className="text-gold-500">Hint:</span>{' '}
                <span className="text-gray-400">Think about what happens when you change code you don't fully understand.</span>
              </p>
              <p className="text-gray-500 text-[10px] mb-2">▾ Review Explanation</p>
              <p className="text-gray-400 text-[10px] leading-relaxed mb-2.5">
                Understanding structure helps you predict how changes will affect behavior, making it easier to find and prevent bugs.
              </p>
              <button className="w-full bg-green-900/30 hover:bg-green-900/40 border border-green-800/30 text-gray-200 font-mono text-[10px] py-2.5 rounded transition-colors font-semibold">
                Try Easier Question
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AnswerChoice({ letter, text, correct }: { letter: string; text: string; correct?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border transition-colors ${
        correct
          ? 'border-gold-500/50 bg-gold-500/10'
          : letter === 'A'
          ? 'border-red-500/40 bg-red-500/5'
          : 'border-white/5 bg-white/[0.02] hover:bg-white/5'
      }`}
    >
      <span
        className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-mono font-bold shrink-0 ${
          correct
            ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
            : letter === 'A'
            ? 'bg-red-500/20 text-red-400 border border-red-500/40'
            : 'bg-white/5 text-gray-500 border border-white/10'
        }`}
      >
        {correct ? '✓' : letter === 'A' ? '✗' : letter}
      </span>
      <span className={`text-[10px] font-mono ${correct ? 'text-gray-200' : letter === 'A' ? 'text-red-300/70' : 'text-gray-400'}`}>
        {text}
      </span>
    </div>
  );
}

/* ---- Code Editor ---- */
function CodeEditor({ isHero }: { isHero: boolean }) {
  const lines = [
    { num: 12, tokens: [{ t: 'const ', c: 'kw' }, { t: 'isValidAbsoluteUrl', c: 'fn' }, { t: ' = (', c: '' }, { t: 'value', c: 'pm' }, { t: ': string) => {', c: '' }] },
    { num: 13, tokens: [{ t: '  } ', c: '' }, { t: 'catch', c: 'kw' }, { t: ' {', c: '' }] },
    { num: 14, tokens: [{ t: '    ', c: '' }, { t: 'return', c: 'kw' }, { t: ' ', c: '' }, { t: 'false', c: 'bool' }, { t: ';', c: '' }] },
    { num: 15, tokens: [{ t: '  }', c: '' }] },
    { num: 16, tokens: [{ t: '};', c: '' }] },
    { num: 17, tokens: [] },
    { num: 18, tokens: [{ t: 'const ', c: 'kw' }, { t: 'hasWeakSecret', c: 'fn' }, { t: ' = (', c: '' }, { t: 'value', c: 'pm' }, { t: ': string) => {', c: '' }] },
    { num: 19, tokens: [{ t: '  ', c: '' }, { t: 'const ', c: 'kw' }, { t: 'normalized', c: 'var' }, { t: ' = ', c: '' }, { t: 'value', c: 'pm' }, { t: '.toLowerCase();', c: '' }] },
    { num: 20, tokens: [{ t: '  ', c: '' }, { t: 'return', c: 'kw' }, { t: ' !', c: '' }, { t: 'value', c: 'pm' }, { t: ' || ', c: 'kw' }, { t: 'value', c: 'pm' }, { t: '.length < ', c: '' }, { t: '32', c: 'num' }, { t: ' || normalized.includes(', c: '' }, { t: '"default"', c: 'str' }, { t: ')', c: '' }] },
    { num: 21, tokens: [{ t: '};', c: '' }] },
  ];

  if (isHero) {
    return (
      <div className="px-2 py-3 font-mono text-[10px] leading-[1.7]">
        {lines.slice(0, 8).map((line) => (
          <CodeLine key={line.num} {...line} highlight={line.num === 18} />
        ))}
      </div>
    );
  }

  return (
    <div className="px-2 py-3 font-mono text-[10px] leading-[1.7]">
      {lines.map((line) => (
        <CodeLine key={line.num} {...line} highlight={line.num === 18} />
      ))}
    </div>
  );
}

function CodeLine({ num, tokens, highlight }: { num: number; tokens: { t: string; c: string }[]; highlight?: boolean }) {
  const colorMap: Record<string, string> = {
    kw: 'text-purple-400',
    fn: 'text-yellow-300',
    pm: 'text-blue-300',
    var: 'text-blue-200',
    str: 'text-orange-300',
    num: 'text-green-400',
    bool: 'text-blue-400',
    '': 'text-gray-300',
  };

  return (
    <div className={`flex ${highlight ? 'bg-gold-500/10 border-l-2 border-gold-500' : ''}`}>
      <span className="w-8 text-right pr-3 text-gray-600 select-none shrink-0">{num}</span>
      <span className="whitespace-pre">
        {tokens.map((token, i) => (
          <span key={i} className={colorMap[token.c] || 'text-gray-300'}>{token.t}</span>
        ))}
      </span>
    </div>
  );
}

function Tab({ name, active }: { name: string; active?: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 text-[10px] font-mono border-r border-white/5 ${active ? 'bg-[#1e1e2e] text-gray-300 border-t-2 border-t-gold-500' : 'text-gray-500'}`}>
      <span>{name}</span>
      {active && <span className="text-gray-600 text-[9px] hover:text-gray-400 cursor-pointer">×</span>}
    </div>
  );
}

function ActivityIcon({ d }: { d: string }) {
  return (
    <svg className="w-5 h-5 text-gray-600 hover:text-gray-400 transition-colors cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}
