import { useTranslation } from 'react-i18next';
import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VimeoEmbed } from '../components/VideoEmbeds';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 's1',
    image: '/case-studies/pre-production.jpg',
  },
  {
    id: 's2',
    image: '/case-studies/film-production.jpg',
  },
  {
    id: 's3',
    image: '/case-studies/post-production.jpg',
  },
  {
    id: 's4',
    image: '/case-studies/photo-shooting.jpg',
  },
];

const stills = [
  'https://live.staticflickr.com/65535/53400256819_6e077941fd_b.jpg',
  'https://live.staticflickr.com/65535/53400369615_63ecfb2379_b.jpg',
  'https://live.staticflickr.com/65535/53399938571_2bdac59727_b.jpg',
  'https://live.staticflickr.com/65535/53399937816_978307854d_b.jpg',
  'https://live.staticflickr.com/65535/53400256584_04db12cb38_b.jpg',
  'https://live.staticflickr.com/65535/53400259239_8a0ae25cd5_b.jpg',
];

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-[10px] font-mono tracking-[0.16em] text-muted/50">{n}</span>
      <span className="h-px w-5 bg-muted/25 block shrink-0" />
      <span className="text-[11px] uppercase tracking-[0.24em] text-muted">{label}</span>
    </div>
  );
}

export default function CaseStudySxcloutVision() {
  const { t } = useTranslation();
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cs-eyebrow', { opacity: 0, y: 16, duration: 0.9, ease: 'power3.out', delay: 0.05 });
      gsap.from('.cs-h1-line', { y: '108%', duration: 1.15, ease: 'power4.out', stagger: 0.09, delay: 0.15 });
      gsap.from('.cs-subtitle', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 0.45 });

      gsap.utils.toArray<Element>('.anim-heading').forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 24, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 89%', once: true },
        });
      });

      ScrollTrigger.batch('.service-card', {
        onEnter: (els) =>
          gsap.fromTo(els,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, overwrite: true }
          ),
        start: 'top 91%',
        once: true,
      });

      ScrollTrigger.batch('.still-card', {
        onEnter: (els) =>
          gsap.fromTo(els,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, overwrite: true }
          ),
        start: 'top 91%',
        once: true,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-bg pt-16 pb-32 px-6 text-text">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ──────────────────────────────────────────── */}
        <header className="pt-10 pb-12 mb-20 border-b border-line">
          <Link
            to="/video"
            className="text-[11px] uppercase tracking-[0.2em] text-muted hover:text-text transition-colors duration-200 inline-block mb-7"
          >
            {t('common.backToVideo')}
          </Link>
          <p className="cs-eyebrow text-[11px] uppercase tracking-[0.28em] text-muted mb-7">
            {t('sxclout.eyebrow')}
          </p>
          <h1 className="font-bold text-6xl md:text-7xl tracking-tight">
            <div className="overflow-hidden leading-[1.25]">
              <span className="cs-h1-line inline-block">Sxclout</span>
            </div>
            <div className="overflow-hidden leading-[1.25]">
              <span className="cs-h1-line inline-block">{t('sxclout.h1b')}</span>
            </div>
          </h1>
          <div className="cs-subtitle mt-7 text-muted max-w-xl leading-relaxed text-sm space-y-4">
            <p>{t('sxclout.intro1')}</p>
            <p>{t('sxclout.intro2')}</p>
            <p>{t('sxclout.intro3')}</p>
          </div>
        </header>

        {/* ── Services ────────────────────────────────────────── */}
        <section className="mb-28">
          <SectionLabel n="01" label={t('common.labels.process')} />
          <h2 className="anim-heading font-bold text-4xl md:text-5xl tracking-tight mb-12">
            {t('sxclout.servicesHeading')}
          </h2>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
            {services.map((s) => (
              <div key={s.id} className="service-card opacity-0">
                <div className="aspect-[4/3] w-full overflow-hidden bg-black/10">
                  <img src={s.image} alt={t(`sxclout.services.${s.id}.title`)} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="font-semibold text-xl mt-5 mb-2">{t(`sxclout.services.${s.id}.title`)}</h3>
                <p className="text-sm text-muted leading-relaxed">{t(`sxclout.services.${s.id}.description`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Trailer ─────────────────────────────────────────── */}
        <section className="mb-28">
          <SectionLabel n="02" label={t('common.labels.result')} />
          <h2 className="anim-heading font-bold text-4xl md:text-5xl tracking-tight mb-10">
            {t('sxclout.finalFilm')}
          </h2>
          <div className="service-card opacity-0">
            <VimeoEmbed id="890867088" />
          </div>
        </section>

        {/* ── Stills ──────────────────────────────────────────── */}
        <section>
          <SectionLabel n="03" label={t('common.labels.stills')} />
          <h2 className="anim-heading font-bold text-4xl md:text-5xl tracking-tight mb-10">
            {t('sxclout.finalStills')}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {stills.map((src) => (
              <div key={src} className="still-card opacity-0 aspect-[2/3] overflow-hidden">
                <img
                  src={src}
                  alt={t('sxclout.stillAlt')}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
