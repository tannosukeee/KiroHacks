import AnimateIn from './AnimateIn';

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <div className="relative bg-gradient-to-br from-green-900 to-green-800 rounded-3xl py-16 md:py-20 px-8 md:px-16 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10" aria-hidden="true">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-green-600 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <p className="text-gold-400 font-mono text-sm tracking-wide uppercase mb-4">
                One more line · One more check
              </p>
              <h2 className="font-display text-3xl md:text-5xl text-white leading-tight mb-6 font-bold">
                Your editor is open. Why not learn while you&apos;re there?
              </h2>
              <p className="text-cream-200/70 text-lg mb-10 max-w-xl mx-auto">
                Install Vybe Tutor, drop in your syllabus, and watch the next bug
                become the next &quot;oh, <em>that&apos;s</em> what&apos;s happening&quot; moment.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#install" className="bg-gold-500 text-green-900 font-semibold text-lg rounded-full px-10 py-4 hover:bg-gold-400 transition-colors shadow-lg hover:shadow-xl inline-block">
                  Add to VS Code — Free
                </a>
                <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="text-cream-200 border border-cream-200/20 font-semibold rounded-full px-8 py-4 hover:bg-white/10 transition-colors">
                  See how it works
                </button>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
