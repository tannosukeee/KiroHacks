import { useState, useEffect, useCallback } from 'react';
import AnimateIn from './AnimateIn';

const demoSteps = [
  {
    id: 1,
    label: 'Write code',
    title: 'You write or paste code',
    description: 'Vybe detects new or changed code in your active editor — whether you typed it, pasted it, or accepted an AI suggestion.',
    highlight: 'editor',
  },
  {
    id: 2,
    label: 'Explain',
    title: 'Vybe explains line-by-line',
    description: 'A clear, concise explanation appears in the sidebar. Key concepts are highlighted with inline code chips so you know exactly what matters.',
    highlight: 'sidebar',
  },
  {
    id: 3,
    label: 'Quick check',
    title: 'A comprehension check appears',
    description: 'One focused question tests whether you understood the core concept. It adapts to your skill level — no trick questions.',
    highlight: 'quiz',
  },
  {
    id: 4,
    label: 'Feedback',
    title: 'Instant, encouraging feedback',
    description: 'Right or wrong, you get a clear explanation of why. If you missed it, Vybe offers a hint and an easier retry.',
    highlight: 'feedback',
  },
  {
    id: 5,
    label: 'Level up',
    title: 'Earn XP and level up',
    description: 'Every correct answer earns XP. Build streaks, unlock levels, and watch your mastery grow — all stored locally.',
    highlight: 'xp',
  },
];

const STEP_DURATION = 5000;

export default function AnimatedDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const advanceStep = useCallback(() => {
    setActiveStep((prev) => (prev + 1) % demoSteps.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          advanceStep();
          return 0;
        }
        return prev + (100 / (STEP_DURATION / 50));
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isPaused, advanceStep]);

  const step = demoSteps[activeStep];

  return (
    <section id="demo" className="py-20 md:py-28 bg-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <div className="text-center mb-12">
            <span className="text-gold-500 font-mono text-sm tracking-wider uppercase">See it in action</span>
            <h2 className="font-display text-4xl md:text-5xl text-green-900 font-bold mt-3 mb-4">
              60 seconds with Vybe Tutor
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Watch the full learning loop — from writing code to earning XP — without leaving your editor.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-3">
            {demoSteps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => { setActiveStep(i); setProgress(0); }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                  i === activeStep
                    ? 'bg-white shadow-card border border-green-900/10'
                    : 'bg-transparent hover:bg-white/50 border border-transparent'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    i === activeStep ? 'bg-green-900 text-white' : 'bg-green-900/10 text-green-900/40'
                  }`}>
                    {s.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-mono text-xs tracking-wider uppercase ${i === activeStep ? 'text-gold-500' : 'text-gray-400'}`}>{s.label}</span>
                    </div>
                    <h3 className={`font-display text-lg font-bold mb-1 ${i === activeStep ? 'text-green-900' : 'text-green-900/50'}`}>{s.title}</h3>
                    {i === activeStep && (
                      <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
                    )}
                    {i === activeStep && (
                      <div className="mt-3 h-1 bg-green-900/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold-500 rounded-full transition-all duration-50 ease-linear"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <AnimateIn>
            <div className="bg-[#1e1e2e] rounded-xl shadow-ide overflow-hidden border border-white/10">
              <div className="flex items-center px-4 py-2.5 bg-[#181825] border-b border-white/5">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-gray-400 text-xs font-mono ml-3">demo.py — cs101</span>
              </div>
              <div className="p-6 min-h-[320px] flex items-center justify-center">
                <div className="text-center max-w-sm">
                  <div className={`text-5xl mb-4 transition-all duration-500 ${step.highlight === 'xp' ? 'scale-110' : ''}`}>
                    {step.highlight === 'editor' && '✍️'}
                    {step.highlight === 'sidebar' && '💡'}
                    {step.highlight === 'quiz' && '✅'}
                    {step.highlight === 'feedback' && '🎯'}
                    {step.highlight === 'xp' && '🏆'}
                  </div>
                  <h3 className="text-white font-display text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <span className="text-gold-500 font-mono text-xs">Step {step.id} of {demoSteps.length}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-1 bg-[#181825] border-t border-white/5 text-[9px] font-mono">
                <span className="flex items-center gap-1 text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Vybe Active
                </span>
                <span className="text-gray-500">Python</span>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
