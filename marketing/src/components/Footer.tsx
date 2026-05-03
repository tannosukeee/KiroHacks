const linkGroups = [
  {
    title: 'Product',
    links: [
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Features', href: '#features' },
      { label: 'Inside VS Code', href: '#inside-vscode' },
      { label: 'Changelog', href: '#' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Discord', href: '#' },
      { label: 'GitHub', href: 'https://github.com/vybe-tutor' },
      { label: 'Blog', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'For educators', href: '#for-students' },
      { label: 'Privacy', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-cream-200 text-green-900 border-t border-green-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Top */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src={`${import.meta.env.BASE_URL}logo.png`}
                alt="Vybe Tutor logo"
                className="h-9 w-auto"
              />
              <span className="font-display text-xl text-green-900 font-bold">
                Vybe Tutor
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              A Cal Poly capstone project turning AI-assisted coding from a shortcut into a study tool. Made in San Luis Obispo.
            </p>
            <div className="font-mono text-xs text-gray-400 space-y-1">
              <p>Built by · Naomi · Brian · Tan · Valerie</p>
              <p>Powered by Gemini · Local-first</p>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h4 className="text-green-900 font-mono font-bold text-xs tracking-wider uppercase mb-3">
                  {group.title}
                </h4>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-gray-500 hover:text-green-900 text-sm transition-colors"
                        {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-green-900/10 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="h-6 w-auto opacity-40" />
            <span>&copy; 2026 Vybe Tutor — A Cal Poly student project.</span>
          </div>
          <span className="font-mono text-xs">Learn by doing.</span>
        </div>
      </div>
    </footer>
  );
}
