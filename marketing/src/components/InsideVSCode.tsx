import AnimateIn from './AnimateIn';
import IDEMockup from './IDEMockup';

const surfaces = [
  { num: '1', title: 'Activity bar icon', desc: 'One click opens the Vybe panel. The pulsing dot signals a new explanation or quiz is waiting for you.', badge: '' },
  { num: '2', title: 'Command palette', desc: 'Every Vybe action \u2014 explain, quiz, pause, dashboard \u2014 is one keystroke away. No menu hunting.', badge: '\u2318 \u21E7 P \u2192 Vybe:' },
  { num: '3', title: 'Hover decorator', desc: 'Hover any token to get a Vybe explainer popover \u2014 annotated with definition, example, and "why it\u2019s used here".', badge: 'hover' },
  { num: '4', title: 'Editor inset (quiz)', desc: 'Quick checks render between code lines using VS Code\u2019s native inset API \u2014 answer without losing context.', badge: 'inline' },
  { num: '5', title: 'Status bar', desc: 'Always-visible level, streak, and XP. Click the streak flame to pause \u2014 protects today\u2019s progress.', badge: 'click to toggle' },
];

export default function InsideVSCode() {
  return (
    <section id="inside-vscode" className="py-20 md:py-28 bg-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <p className="text-gold-500 font-mono text-sm tracking-wide uppercase mb-3">
            Inside VS Code
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-green-900 mb-3 font-bold leading-tight">
            Five surfaces. One <em className="text-gold-500">tutor</em>{' '}
            <span className="block">woven into your editor.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-lg mb-12">
            Vybe doesn&apos;t replace VS Code&apos;s UI \u2014 it borrows the surfaces students already trust.
          </p>
        </AnimateIn>

        <AnimateIn delay={100}>
          <div className="mb-14">
            <IDEMockup variant="inside" />
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {surfaces.map((s, i) => (
            <AnimateIn key={s.title} delay={i * 100}>
              <div className="bg-white rounded-2xl shadow-card p-5 hover:shadow-card-hover transition-all hover:-translate-y-1 border border-green-900/5">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-green-900/5 text-green-900 font-mono text-sm font-bold mb-3">
                  {s.num}
                </span>
                <h3 className="text-green-900 font-semibold text-sm mb-1">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-2">{s.desc}</p>
                {s.badge && (
                  <span className="inline-block bg-green-900/5 text-green-800 font-mono text-[10px] px-2 py-0.5 rounded">
                    {s.badge}
                  </span>
                )}
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={600}>
          <div className="mt-10 bg-white rounded-2xl shadow-card p-6 border border-green-900/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-green-900 font-display font-bold text-lg mb-1">Tech stack</h3>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              {['VS Code Extension API', 'TypeScript', 'Gemini 2.5 Flash', 'Zod', 'Local storage'].map((t) => (
                <span key={t} className="font-mono text-xs text-gray-500">
                  <span className="font-bold text-green-900">{t.split(' · ')[0]}</span>
                  {t.includes(' · ') && <span> · {t.split(' · ')[1]}</span>}
                </span>
              ))}
            </div>
            <span className="font-mono text-xs text-gray-400">v0.1.0 · May 3 2026</span>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
