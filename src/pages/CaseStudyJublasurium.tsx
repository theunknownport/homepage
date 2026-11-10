import { useTranslation } from 'react-i18next';
import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VimeoEmbed } from '../components/VideoEmbeds';

gsap.registerPlugin(ScrollTrigger);

const bts = [
  { id: 'b1', image: '/case-studies/jublasurium/bts-1.jpg', credit: 'Dominik Bütler' },
  { id: 'b2', image: '/case-studies/jublasurium/bts-2.jpg', credit: 'Darwin Hansen' },
  { id: 'b3', image: '/case-studies/jublasurium/bts-3.jpg', credit: 'Alain Sethmacher' },
  { id: 'b4', image: '/case-studies/jublasurium/bts-4.jpg', credit: 'Gianna Mohler' },
  { id: 'b5', image: '/case-studies/jublasurium/bts-5.jpg', credit: '' },
];

const reels = [
  { id: 'r1', videoId: '1138281966', day: 1 },
  { id: 'r2', videoId: '1138284229', day: 2 },
  { id: 'r3', videoId: '1138282689', day: 3 },
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

export default function CaseStudyJublasurium() {
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

      const batchTargets = ['.bts-card', '.reel-card'];
      batchTargets.forEach((sel) => {
        ScrollTrigger.batch(sel, {
          onEnter: (els) =>
            gsap.fromTo(els,
              { opacity: 0, y: 28 },
              { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, overwrite: true }
            ),
          start: 'top 91%',
          once: true,
        });
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
            {t('jublasurium.eyebrow')}
          </p>
          <h1 className="font-bold text-6xl md:text-7xl tracking-tight">
            <div className="overflow-hidden leading-[1.25]">
              <span className="cs-h1-line inline-block">Jublasurium</span>
            </div>
            <div className="overflow-hidden leading-[1.25]">
              <span className="cs-h1-line inline-block">{t('jublasurium.h1b')}</span>
            </div>
          </h1>
          <div className="cs-subtitle mt-7 text-muted max-w-xl leading-relaxed text-sm space-y-4">
            <p>{t('jublasurium.intro1')}</p>
            <p>{t('jublasurium.intro2')}</p>
          </div>
        </header>

        {/* ── On Site ─────────────────────────────────────────── */}
        <section className="mb-28">
          <SectionLabel n="01" label={t('jublasurium.onSite')} />
          <h2 className="anim-heading font-bold text-4xl md:text-5xl tracking-tight mb-12">
            {t('jublasurium.btsHeading')}
          </h2>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
            {bts.map((b) => (
              <div key={b.id} className="bts-card opacity-0">
                <div className="aspect-[4/3] w-full overflow-hidden bg-black/10">
                  <img src={b.image} alt={t(`jublasurium.bts.${b.id}`)} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <p className="text-sm text-muted leading-relaxed mt-5">{t(`jublasurium.bts.${b.id}`)}</p>
                {b.credit && (
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted/45 mt-2">
                    {t('common.photoCredit', { name: b.credit })}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Daily Recaps ────────────────────────────────────── */}
        <section>
          <SectionLabel n="02" label={t('common.labels.result')} />
          <h2 className="anim-heading font-bold text-4xl md:text-5xl tracking-tight mb-12">
            {t('jublasurium.h1b')}
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            {reels.map((r) => (
              <div key={r.id} className="reel-card opacity-0">
                <VimeoEmbed id={r.videoId} aspect="aspect-[9/16]" />
                <div className="mt-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted">{t('jublasurium.day', { n: r.day })}</span>
                  <h3 className="font-semibold text-lg mt-1">{t('jublasurium.recapTitle', { n: r.day })}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
