import { useTranslation } from 'react-i18next';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { key: 'home', path: '/' },
  { key: 'photo', path: '/photo' },
  { key: 'video', path: '/video' },
  { key: 'audio', path: '/audio' },
  { key: 'computerScience', path: '/computer-science' },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/insta_fb/' },
  { label: 'Vimeo', href: 'https://vimeo.com/user208734290' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/finn-barbieri-71431b1bb/' },
];

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.5" />
      <line x1="12" y1="2" x2="12" y2="4.5" />
      <line x1="12" y1="19.5" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.99" y2="5.99" />
      <line x1="18.01" y1="18.01" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4.5" y2="12" />
      <line x1="19.5" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.99" y2="18.01" />
      <line x1="18.01" y1="5.99" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Layout() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { theme, toggle } = useTheme();
  const isHome = location.pathname === '/';

  return (
    <div className="overflow-x-hidden min-h-screen flex flex-col bg-bg text-text">
      <header
        className="sticky top-0 z-50 border-b border-line backdrop-blur-sm"
        style={{ background: 'var(--color-nav-bg)' }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-5 md:px-10">

          <div className="text-[11px] tracking-[0.2em] uppercase text-text font-medium">
            Finn Barbieri
          </div>

          <nav className={`${isHome ? 'opacity-0 pointer-events-none md:flex' : 'hidden md:flex'} items-center gap-8`}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-200 hover:text-text"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            {/* Language */}
            <div className="hidden sm:flex items-center gap-3">
              {(['en', 'de'] as const).map((lang, idx) => (
                <span key={lang} className="flex items-center gap-3">
                  {idx > 0 && <span className="text-muted/25 select-none text-xs">·</span>}
                  <button
                    className={`text-[11px] tracking-[0.18em] uppercase transition-colors duration-200 ${
                      i18n.language === lang ? 'text-text' : 'text-muted hover:text-text'
                    }`}
                    onClick={() => i18n.changeLanguage(lang)}
                  >
                    {lang.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label={t('common.toggleTheme')}
              className="text-muted hover:text-text transition-colors duration-200 flex items-center"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Get in touch */}
            <a
              href="mailto:info@finnbarbieri.com"
              className="text-[11px] uppercase tracking-[0.18em] border border-line px-4 py-2 text-text hover:border-line-strong hover:bg-accent-soft transition-colors duration-200 whitespace-nowrap"
            >
              {t('contact.button')}
            </a>
          </div>

        </div>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="relative z-20 bg-bg border-t border-line py-8 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col-reverse sm:flex-row items-center justify-between gap-5">
          <span className="text-[11px] tracking-[0.14em] uppercase text-muted">{t('footer.copy')}</span>

          <div className="flex items-center gap-5">
            {socialLinks.map((social, idx) => (
              <span key={social.label} className="flex items-center gap-5">
                {idx > 0 && <span className="text-muted/25 select-none text-xs">·</span>}
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-[0.18em] uppercase text-muted hover:text-text transition-colors duration-200"
                >
                  {social.label}
                </a>
              </span>
            ))}
            <span className="text-muted/25 select-none text-xs">·</span>
            <Link
              to="/imprint"
              className="text-[11px] tracking-[0.18em] uppercase text-muted hover:text-text transition-colors duration-200"
            >
              {t('footer.imprint')}
            </Link>
            <span className="text-muted/25 select-none text-xs">·</span>
            <Link
              to="/privacy"
              className="text-[11px] tracking-[0.18em] uppercase text-muted hover:text-text transition-colors duration-200"
            >
              {t('footer.privacy')}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
