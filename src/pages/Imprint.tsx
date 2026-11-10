import { useTranslation } from 'react-i18next';

export default function Imprint() {
  const { t } = useTranslation();
  return (
    <div className="bg-bg pt-16 pb-32 px-6 text-text">
      <div className="max-w-2xl mx-auto">
        <header className="pt-10 pb-12 mb-14 border-b border-line">
          <p className="text-[11px] uppercase tracking-[0.28em] text-muted mb-7">{t('common.legal')}</p>
          <h1 className="font-bold text-5xl md:text-6xl tracking-tight">{t('footer.imprint')}</h1>
        </header>

        <div className="space-y-1.5 text-sm text-text leading-relaxed">
          <p>Finn Barbieri</p>
          <p>5313 Klingnau</p>
          <p>{t('imprint.country')}</p>
        </div>

        <div className="mt-10 space-y-1.5 text-sm leading-relaxed">
          <p className="text-muted">{t('imprint.email')}</p>
          <p>
            <a href="mailto:info@finnbarbieri.com" className="text-text hover:text-muted transition-colors duration-200">
              info@finnbarbieri.com
            </a>
          </p>
        </div>

        <div className="mt-10 space-y-1.5 text-sm leading-relaxed">
          <p className="text-muted">Internet</p>
          <p>
            <a href="https://www.finnbarbieri.com" target="_blank" rel="noopener noreferrer" className="text-text hover:text-muted transition-colors duration-200">
              https://www.finnbarbieri.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
