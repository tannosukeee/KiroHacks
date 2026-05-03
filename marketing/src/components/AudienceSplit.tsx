import AnimateIn from './AnimateIn';

const studentTypes = [
  { label: 'CS beginners', desc: 'gentle, jargon-free explanations from your first print()' },
  { label: 'CS intermediates', desc: 'challenge mode kicks in once you\u2019ve mastered the basics' },
  { label: 'Self-taught devs', desc: 'fill in the gaps your YouTube tutorials skipped' },
  { label: 'Bootcamp students', desc: 'keep up with sprint pace without faking it' },
];

const educatorPoints = [
  'Class-wide concept heatmap, refreshed daily',
  'Aligns automatically to your syllabus & weekly topics',
  'Anonymous by default \u2014 privacy-respecting analytics',
  'Free for instructors at accredited institutions',
];

export default function AudienceSplit() {
  return (
    <section id="for-students" className="py-20 md:py-28 bg-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <div className="text-center mb-14">
            <p className="text-gold-500 font-mono text-sm tracking-wide uppercase mb-3">
              Built for both sides of the classroom
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-green-900 mb-3 font-bold">
              Students learn faster.{' '}
              <span className="block">Instructors see what&apos;s clicking.</span>
            </h2>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimateIn delay={0}>
            <div className="bg-green-900 rounded-2xl shadow-ide p-8 text-white h-full">
              <span className="text-gold-400 font-mono text-sm font-bold tracking-wide uppercase mb-4 block">
                For Students & Learners
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold mt-1 mb-5">
                Built for four kinds of learner.
              </h3>
              <p className="text-cream-200/70 text-base mb-6">
                Whether you&apos;re writing your first <code className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono">if</code> statement
                or shipping production code, Vybe meets you where you are and walks you forward.
              </p>
              <div className="space-y-4 mb-8">
                {studentTypes.map((s) => (
                  <div key={s.label} className="flex items-start gap-3 border-b border-white/10 pb-3 last:border-0">
                    <svg className="w-5 h-5 text-gold-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="text-white font-semibold text-sm">{s.label}</span>
                      <span className="text-cream-200/50 text-sm"> — {s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <a href="#install" className="inline-block bg-gold-500 text-green-900 font-semibold rounded-full px-6 py-3 hover:bg-gold-400 transition-colors">
                I&apos;m a student →
              </a>
            </div>
          </AnimateIn>

          <AnimateIn delay={150}>
            <div className="bg-white rounded-2xl shadow-card p-8 border border-green-900/5 h-full flex flex-col">
              <span className="text-gold-500 font-mono text-sm font-bold tracking-wide uppercase mb-4 block">
                For Educators
              </span>
              <h3 className="text-green-900 font-display text-2xl md:text-3xl font-bold mt-1 mb-5">
                See where your class is stuck — without grading more.
              </h3>
              <p className="text-gray-500 text-base mb-6">
                A live concept-mastery dashboard for your section. Spot the topics your students
                are gliding past or struggling with — before the next lecture.
              </p>
              <div className="space-y-4 mb-8 flex-1">
                {educatorPoints.map((item) => (
                  <div key={item} className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0">
                    <svg className="w-5 h-5 text-gold-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <button className="inline-block bg-green-900 text-white font-semibold rounded-full px-6 py-3 hover:bg-green-800 transition-colors self-start">
                Request instructor access →
              </button>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
