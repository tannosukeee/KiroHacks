import AnimateIn from './AnimateIn';

const testimonials = [
  {
    quote: 'I used to copy AI suggestions and pray they worked. Now Vybe asks me a quick check before I move on, and I actually remember what `enumerate` does on the midterm. Wild.',
    name: 'Priya Mehta',
    role: 'CS sophomore · Cal Poly SLO',
    initials: 'PM',
    bg: 'bg-gold-500',
    featured: true,
  },
  {
    quote: 'The streak system is dumb in the best way. I open VS Code now just so I don\u2019t lose my 14-day flame.',
    name: 'Jordan Kim',
    role: 'Software Eng. major · Cal Poly',
    initials: 'JK',
    bg: 'bg-green-700',
    featured: false,
  },
  {
    quote: 'My students stopped asking "what does this line do" in office hours and started asking "why did the professor pick this approach". Different conversation.',
    name: 'Dr. R. Alvarez',
    role: 'CS lecturer · CSU system',
    initials: 'DR',
    bg: 'bg-gold-500',
    featured: false,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateIn>
          <div className="text-center mb-14">
            <p className="text-gold-500 font-mono text-sm tracking-wide uppercase mb-3">
              From the Cal Poly community
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-green-900 mb-3 font-bold">
              Students who came for the AI,{' '}
              <span className="block">stayed for the <em className="text-gold-500">understanding.</em></span>
            </h2>
          </div>
        </AnimateIn>

        <div className="space-y-6 max-w-3xl mx-auto">
          {testimonials.map((t, i) => (
            <AnimateIn key={t.name} delay={i * 150}>
              <div className={`rounded-2xl p-8 transition-all hover:-translate-y-0.5 ${t.featured ? 'bg-green-900 text-white shadow-ide' : 'bg-white shadow-card hover:shadow-card-hover border border-green-900/5'}`}>
                <span className={`font-display text-4xl leading-none block mb-4 ${t.featured ? 'text-gold-400' : 'text-gold-500'}`}>&ldquo;</span>
                <p className={`text-lg md:text-xl leading-relaxed mb-6 ${t.featured ? 'text-white font-medium' : 'text-gray-700'}`}>{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.bg} flex items-center justify-center shrink-0`}>
                    <span className={`text-xs font-bold ${t.featured ? 'text-green-900' : 'text-white'}`}>{t.initials}</span>
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${t.featured ? 'text-white' : 'text-green-900'}`}>{t.name}</p>
                    <p className={`text-xs ${t.featured ? 'text-cream-200/60' : 'text-gray-400'}`}>{t.role}</p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
