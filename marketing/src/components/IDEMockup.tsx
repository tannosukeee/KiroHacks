interface IDEMockupProps {
  variant?: 'hero' | 'demo' | 'inside';
  activeStep?: number;
}

const fizzbuzzCode = [
  { line: 1, tokens: [{ text: 'def ', cls: 'text-blue-400' }, { text: 'fizzbuzz', cls: 'text-yellow-300' }, { text: '(n):', cls: 'text-gray-300' }] },
  { line: 2, tokens: [{ text: '    ', cls: '' }, { text: 'for ', cls: 'text-purple-400' }, { text: 'i ', cls: 'text-gray-300' }, { text: 'in ', cls: 'text-purple-400' }, { text: 'range', cls: 'text-blue-400' }, { text: '(', cls: 'text-gray-300' }, { text: '1', cls: 'text-green-400' }, { text: ', n + ', cls: 'text-gray-300' }, { text: '1', cls: 'text-green-400' }, { text: '):', cls: 'text-gray-300' }] },
  { line: 3, tokens: [{ text: '        ', cls: '' }, { text: 'if ', cls: 'text-purple-400' }, { text: 'i % ', cls: 'text-gray-300' }, { text: '15', cls: 'text-green-400' }, { text: ' == ', cls: 'text-purple-400' }, { text: '0', cls: 'text-green-400' }, { text: ':', cls: 'text-gray-300' }] },
  { line: 4, tokens: [{ text: '            ', cls: '' }, { text: 'print', cls: 'text-blue-400' }, { text: '(', cls: 'text-gray-300' }, { text: '"FizzBuzz"', cls: 'text-orange-300' }, { text: ')', cls: 'text-gray-300' }] },
  { line: 5, tokens: [{ text: '        ', cls: '' }, { text: 'elif ', cls: 'text-purple-400' }, { text: 'i % ', cls: 'text-gray-300' }, { text: '3', cls: 'text-green-400' }, { text: ' == ', cls: 'text-purple-400' }, { text: '0', cls: 'text-green-400' }, { text: ':', cls: 'text-gray-300' }] },
  { line: 6, tokens: [{ text: '            ', cls: '' }, { text: 'print', cls: 'text-blue-400' }, { text: '(', cls: 'text-gray-300' }, { text: '"Fizz"', cls: 'text-orange-300' }, { text: ')', cls: 'text-gray-300' }] },
  { line: 7, tokens: [{ text: '        ', cls: '' }, { text: 'elif ', cls: 'text-purple-400' }, { text: 'i % ', cls: 'text-gray-300' }, { text: '5', cls: 'text-green-400' }, { text: ' == ', cls: 'text-purple-400' }, { text: '0', cls: 'text-green-400' }, { text: ':', cls: 'text-gray-300' }] },
  { line: 8, tokens: [{ text: '            ', cls: '' }, { text: 'print', cls: 'text-blue-400' }, { text: '(', cls: 'text-gray-300' }, { text: '"Buzz"', cls: 'text-orange-300' }, { text: ')', cls: 'text-gray-300' }] },
  { line: 9, tokens: [{ text: '        ', cls: '' }, { text: 'else', cls: 'text-purple-400' }, { text: ':', cls: 'text-gray-300' }] },
  { line: 10, tokens: [{ text: '            ', cls: '' }, { text: 'print', cls: 'text-blue-400' }, { text: '(i)', cls: 'text-gray-300' }] },
];

const quizChoices = [
  { label: 'A', text: '0' },
  { label: 'B', text: '2' },
  { label: 'C', text: '3' },
  { label: 'D', text: '3.4' },
];

export default function IDEMockup({ variant = 'hero' }: IDEMockupProps) {
  const compact = variant !== 'hero';

  return (
    <div className={`bg-[#1e1e2e] rounded-xl shadow-ide overflow-hidden border border-white/10 ${compact ? 'w-full max-w-2xl' : 'w-full max-w-xl'}`}>
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#181825] border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-gray-400 text-xs font-mono ml-3">fizzbuzz.py — cs101</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-xs">⌘P</span>
        </div>
      </div>
      <div className="flex">
        <div className="w-10 bg-[#181825] border-r border-white/5 flex flex-col items-center py-3 gap-3 shrink-0">
          <div className="w-6 h-6 rounded bg-gold-500/20 flex items-center justify-center">
            <span className="text-gold-500 text-xs font-bold">V</span>
          </div>
          <div className="w-5 h-5 text-gray-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M3 7h18M3 12h18M3 17h18" /></svg>
          </div>
          <div className="w-5 h-5 text-gray-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
          </div>
        </div>
        <div className={`flex-1 overflow-hidden ${compact ? 'max-h-64' : ''}`}>
          <div className="px-4 py-3 font-mono text-xs leading-relaxed">
            {fizzbuzzCode.map((line) => (
              <div key={line.line} className="flex">
                <span className="text-gray-600 w-6 text-right mr-4 select-none shrink-0">{line.line}</span>
                <span className="whitespace-pre">
                  {line.tokens.map((token, i) => (
                    <span key={i} className={token.cls}>{token.text}</span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-56 bg-[#181825] border-l border-white/5 flex flex-col shrink-0">
          <div className="px-3 py-2.5 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="text-gold-500 font-mono text-[10px] font-bold tracking-wider">VYBE EXPLAIN</span>
              <span className="bg-green-500/20 text-green-400 text-[9px] font-mono px-1.5 py-0.5 rounded-full">LIVE</span>
            </div>
          </div>
          <div className="px-3 py-2.5 flex-1 overflow-hidden">
            <p className="text-gray-300 text-[10px] leading-relaxed mb-2">
              The <span className="text-gold-500 bg-gold-500/10 px-1 rounded font-mono">%</span> (modulo) operator returns the <em className="text-white not-italic font-medium">remainder</em> after division.
            </p>
            <p className="text-gray-400 text-[10px] leading-relaxed mb-3">
              <span className="text-gold-500 bg-gold-500/10 px-1 rounded font-mono">i % 15 == 0</span> checks if <span className="text-white font-medium">i</span> is divisible by both 3 and 5.
            </p>
            <div className="border-t border-white/5 pt-2.5">
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-gold-500 text-[9px] font-mono font-bold">Quick check</span>
                <span className="text-gold-400/60 text-[9px]">· +15 XP</span>
              </div>
              <p className="text-gray-300 text-[10px] mb-2">What does <span className="text-gold-500 font-mono bg-gold-500/10 px-1 rounded">17 % 5</span> equal?</p>
              <div className="space-y-1">
                {quizChoices.map((choice) => (
                  <button key={choice.label} className="w-full flex items-center gap-2 px-2 py-1 rounded text-[10px] bg-white/5 hover:bg-white/10 text-gray-300 transition-colors text-left">
                    <span className="text-gold-500/60 font-mono text-[9px]">{choice.label}</span>
                    <span>{choice.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="px-3 py-2 border-t border-white/5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-gray-500 text-[9px] font-mono">Level 7</span>
              <span className="text-gray-500 text-[9px] font-mono">340/500 XP</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gold-500 rounded-full" style={{ width: '68%' }} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-3 py-1 bg-[#181825] border-t border-white/5 text-[9px] font-mono">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Vybe Active
          </span>
          <span className="text-gray-500">Python</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-500">🔥 5-day streak</span>
          <span className="text-gray-500">UTF-8</span>
        </div>
      </div>
    </div>
  );
}
