import { useState, useEffect } from 'react';
import IDEMockup from './IDEMockup';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className={`text-gold-500 font-mono text-sm tracking-wide uppercase mb-4 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>A Cal Poly project · Learn by doing</p>
            <h1 className={`font-display text-5xl md:text-6xl lg:text-[4.25rem] text-green-900 leading-[1.08] mb-6 font-extrabold transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Stop vibe-coding.{' '}
              <span className="block">Start{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 italic">vybe-learning.</span>
                  <span className={`absolute bottom-1 left-0 h-3 bg-gold-300/50 -z-0 rounded-sm transition-all duration-700 delay-500 ${loaded ? 'w-full' : 'w-0'}`} aria-hidden="true" />
                </span>
              </span>
            </h1>
            <p className={`text-gray-600 text-lg leading-relaxed mb-8 max-w-lg transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Vybe Tutor lives inside VS Code. As you write Python, JavaScript, Java, or C++, it explains what's happening line-by-line, asks quick checks on the tricky bits, and adapts to <em>your</em> level — so you actually understand the code you (and your AI) just shipped.
            </p>
            <div className={`flex flex-wrap gap-3 mb-8 transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <a href="#install" className="bg-green-900 text-white font-semibold rounded-full px-8 py-4 hover:bg-green-800 transition-colors shadow-md hover:shadow-lg inline-flex items-center gap-2">
                <span>🛡</span> Add to VS Code — Free
              </a>
              <button onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })} className="border-2 border-green-900/20 text-green-900 font-semibold rounded-full px-8 py-4 hover:bg-green-900 hover:text-white transition-all">
                Watch 60-sec demo →
              </button>
            </div>
            <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 transition-all duration-700 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
                <span className="text-green-900 font-semibold text-sm ml-1">4.9</span>
                <span className="text-gray-400 text-sm">· 812 reviews</span>
              </div>
              <span className="text-gray-300">·</span>
              <span className="text-gray-500 text-sm">Powered by <strong>Gemini</strong></span>
              <span className="text-gray-300">·</span>
              <span className="text-gray-500 text-sm">Local-first</span>
              <span className="text-gray-300">·</span>
              <span className="text-gray-500 text-sm">Free for <strong>.edu</strong></span>
            </div>
          </div>
          <div className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="animate-float"><IDEMockup variant="hero" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
