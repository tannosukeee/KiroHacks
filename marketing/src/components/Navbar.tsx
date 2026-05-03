import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'How it works', id: 'how-it-works' },
  { label: 'Features', id: 'features' },
  { label: 'Inside VS Code', id: 'inside-vscode' },
  { label: 'For students', id: 'for-students' },
  { label: 'FAQ', id: 'faq' },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-green-900/95 backdrop-blur-md shadow-lg' : 'bg-green-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5 shrink-0">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Vybe Tutor logo" className="h-9 w-auto" />
            <span className="text-white font-display text-lg font-bold tracking-tight">Vybe Tutor</span>
          </div>
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)} className="text-sm text-cream-200/80 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-all">{link.label}</button>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <a href="#install" className="text-sm font-semibold bg-gold-500 text-green-900 px-5 py-2 rounded-lg hover:bg-gold-400 transition-colors shadow-sm">Add to VS Code</a>
          </div>
          <button className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden bg-green-900 border-t border-green-800 px-4 pb-4 animate-fade-in">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => { scrollTo(link.id); setOpen(false); }} className="block w-full text-left text-sm text-cream-200 hover:text-white py-3 transition-colors">{link.label}</button>
          ))}
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-green-800">
            <a href="#install" className="text-sm font-semibold bg-gold-500 text-green-900 px-4 py-2.5 rounded-lg text-center">Add to VS Code</a>
          </div>
        </div>
      )}
    </nav>
  );
}
