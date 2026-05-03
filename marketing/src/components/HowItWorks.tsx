import AnimateIn from './AnimateIn';

const steps = [
  {
    number: '01',
    title: 'You write code (or AI does)',
    description: 'Vybe watches your active editor. When you write, paste, or accept AI-generated code, it detects the change automatically.',
    time: '0 sec',
    icon: '✍️',
  },
  {
    number: '02',
    title: 'Vybe explains what happened',
    description: 'A concise, line-by-line explanation appears in the sidebar — highlighting the concepts that matter most at your level.',
    time: '~2 sec',
    icon: '💡',
  },
  {
    number: '03',
    title: 'Quick check pops up',
    description: 'A short comprehension question tests whether you understood the key concept. No trick questions — just honest checks.',
    time: '~5 sec',
    icon: '✅',
  },
  {
    number: '04',
    title: 'You earn XP & level up',
    description: 'Correct answers earn XP. Streaks build momentum. The difficulty adapts so you\'re always in the learning zone.',
    time: '~8 sec',
    icon: '🏆',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <div className="text-center mb-16">
            <span className="text-gold-500 font-mono text-sm tracking-wider uppercase">How it works</span>
            <h2 className="font-display text-4xl md:text-5xl text-green-900 font-bold mt-3 mb-4">
              Four steps. Zero context-switching.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Vybe Tutor fits into the flow you already have. No new tabs, no separate apps — just learning woven into coding.
            </p>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {steps.map((step, i) => (
            <AnimateIn key={step.number} delay={i * 100}>
              <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow h-full relative overflow-hidden group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{step.icon}</span>
                  <span className="bg-gold-100 text-gold-500 font-mono text-xs font-bold px-2.5 py-1 rounded-full">{step.time}</span>
                </div>
                <div className="text-green-900/20 font-display text-6xl font-bold absolute -top-2 -right-1 group-hover:text-green-900/10 transition-colors">{step.number}</div>
                <h3 className="font-display text-xl text-green-900 font-bold mb-2 relative z-10">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed relative z-10">{step.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
