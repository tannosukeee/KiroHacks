import AnimateIn from './AnimateIn';

interface Feature {
  icon: string;
  name: string;
  desc: string;
  tag: string;
}

const features: Feature[] = [
  {
    icon: '⬇',
    name: 'One-click install',
    desc: 'Add to VS Code Marketplace in a single click. No accounts, no sign-up, no setup wizard you\u2019ll abandon halfway through.',
    tag: 'Req #1 · Must have',
  },
  {
    icon: '⤷',
    name: 'Real-time code explanation',
    desc: 'On save or accept, Vybe explains the changed block in plain English \u2014 context-aware, language-aware, and right next to your cursor.',
    tag: 'Req #2 · Must have',
  },
  {
    icon: '?',
    name: 'Comprehension quizzes',
    desc: '1\u20133 questions per explanation block \u2014 multiple choice or fill-in. Verify understanding before you ship the next line.',
    tag: 'Req #3 · Must have',
  },
  {
    icon: '★',
    name: 'XP, levels & streaks',
    desc: '10 XP per correct answer, 5 XP per explanation read, daily streak multipliers. Levels 1\u201310 from Syntax Padawan to Architecture Wizard.',
    tag: 'Req #4 · Must have',
  },
  {
    icon: '↻',
    name: 'Adaptive difficulty',
    desc: 'Miss a question? The next one on that concept gets easier. Recover, and Vybe walks you back up to where you started.',
    tag: 'Req #5 · Should have',
  },
  {
    icon: '≡',
    name: 'Syllabus-aware',
    desc: 'Drop in a PDF syllabus or .txt notes. Vybe parses your weekly topics so explanations use your class\u2019s vocabulary.',
    tag: 'Req #6 · Should have',
  },
  {
    icon: '{ }',
    name: 'Multi-language support',
    desc: 'Python, JavaScript, Java, and C++ at launch. Auto-detected from file extension \u2014 no manual switching.',
    tag: 'Req #7 · Should have',
  },
  {
    icon: '→',
    name: 'Guided walkthrough',
    desc: 'First-time tooltips show every panel, button, and shortcut. Skippable. Re-openable from settings.',
    tag: 'Req #8 · Could have',
  },
  {
    icon: '⌘',
    name: 'Private & local-first',
    desc: 'Mastery state lives in VS Code\u2019s local storage \u2014 never cloud-synced. Pause anytime; streaks are protected for that day.',
    tag: 'Core principle',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <p className="text-gold-500 font-mono text-sm tracking-wide uppercase mb-3">
            What&apos;s inside
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-green-900 mb-3 font-bold leading-tight">
            Everything you need to{' '}
            <em className="text-gold-500">actually</em> understand the code.
          </h2>
          <p className="text-gray-500 text-lg max-w-lg mb-14">
            The core loop \u2014 explain → check → adapt \u2014 runs entirely in your editor, on your machine.
          </p>
        </AnimateIn>

        <div className="space-y-5">
          {features.map((f, i) => (
            <AnimateIn key={f.name} delay={i * 80}>
              <div className="bg-white rounded-2xl shadow-card p-7 hover:shadow-card-hover transition-all hover:-translate-y-0.5 border border-green-900/5">
                <div className="w-12 h-12 rounded-xl bg-green-900/5 flex items-center justify-center text-green-900 text-xl mb-4 font-display font-bold">
                  {f.icon}
                </div>
                <h3 className="text-green-900 font-display font-bold text-xl mb-2">{f.name}</h3>
                <p className="text-gray-500 text-base leading-relaxed mb-3">{f.desc}</p>
                <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">{f.tag}</span>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
