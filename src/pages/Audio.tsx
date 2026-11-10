import { useTranslation } from 'react-i18next';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = ['s1', 's2', 's3', 's4'];

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-[10px] font-mono tracking-[0.16em] text-muted/50">{n}</span>
      <span className="h-px w-5 bg-muted/25 block shrink-0" />
      <span className="text-[11px] uppercase tracking-[0.24em] text-muted">{label}</span>
    </div>
  );
}

export default function Audio() {
  const { t } = useTranslation();
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.aud-eyebrow', { opacity: 0, y: 16, duration: 0.9, ease: 'power3.out', delay: 0.05 });
      gsap.from('.aud-h1-line', { y: '108%', duration: 1.15, ease: 'power4.out', stagger: 0.09, delay: 0.15 });
      gsap.from('.aud-subtitle', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 0.45 });

      gsap.utils.toArray<Element>('.anim-heading').forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 24, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 89%', once: true },
        });
      });

      ScrollTrigger.batch('.service-card', {
        onEnter: (els) =>
          gsap.fromTo(
            els,
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
          <p className="aud-eyebrow text-[11px] uppercase tracking-[0.28em] text-muted mb-7">
            {t('audio.eyebrow')}
          </p>
          <h1 className="font-bold text-6xl md:text-7xl tracking-tight">
            <div className="overflow-hidden leading-[1.25]">
              <span className="aud-h1-line inline-block">{t('audio.h1a')}</span>
            </div>
            <div className="overflow-hidden leading-[1.25]">
              <span className="aud-h1-line inline-block">{t('audio.h1b')}</span>
            </div>
          </h1>
          <p className="aud-subtitle mt-7 text-muted max-w-md leading-relaxed text-sm">
            {t('audio.subtitle')}
          </p>
        </header>

        {/* ── 01 Background ───────────────────────────────────── */}
        <section className="mb-28">
          <SectionLabel n="01" label={t('audio.labels.background')} />
          <h2 className="anim-heading font-bold text-4xl md:text-5xl tracking-tight mb-12">
            {t('audio.balanceHeading')}
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { label: 'backThen', src: '/audio/back-then.webp' },
              { label: 'now', src: '/audio/now.webp' },
            ].map((item) => (
              <div key={item.label} className="service-card opacity-0">
                <div className="aspect-[3/4] w-full overflow-hidden bg-black/10">
                  <img
                    src={item.src}
                    alt={t(`audio.${item.label}.label`)}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-muted">{t(`audio.${item.label}.label`)}</p>
                  <p className="text-[10px] text-muted/50 tracking-[0.06em]">{t(`audio.${item.label}.caption`)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 space-y-5 text-sm text-muted leading-[1.9] max-w-xl">
            <p>{t('audio.balance1')}</p>
            <p>{t('audio.balance2')}</p>
          </div>
        </section>

        {/* ── 02 Services ─────────────────────────────────────── */}
        <section className="mb-28">
          <SectionLabel n="02" label={t('audio.labels.whatIDo')} />
          <h2 className="anim-heading font-bold text-4xl md:text-5xl tracking-tight mb-12">
            {t('audio.servicesHeading1')}<br />{t('audio.servicesHeading2')}
          </h2>

          <div className="grid sm:grid-cols-2 gap-px border border-line">
            {services.map((id) => (
              <div key={id} className="service-card opacity-0 p-8 md:p-10">
                <h3 className="font-semibold text-2xl mb-4 text-text">{t(`audio.services.${id}.title`)}</h3>
                <p className="text-sm text-muted leading-relaxed">{t(`audio.services.${id}.description`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 03 Music ────────────────────────────────────────── */}
        <section className="mb-28">
          <SectionLabel n="03" label={t('audio.labels.releases')} />
          <h2 className="anim-heading font-bold text-4xl md:text-5xl tracking-tight mb-10">
            {t('audio.checkOut')}
          </h2>

          {/* SoundCloud embed */}
          <div className="service-card opacity-0 mb-10">
            <iframe
              width="100%"
              height="450"
              scrolling="no"
              frameBorder={0}
              allow="autoplay"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/finnbarbieri&color=%23c8bca6&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
              title="paravirtual on SoundCloud"
            />
          </div>

          {/* Platform links */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-px border border-line">
            {[
              { label: 'SoundCloud', href: 'https://soundcloud.com/finnbarbieri' },
              { label: 'BeatStars', href: 'https://www.beatstars.com/paravirtual' },
              { label: 'YouTube', href: 'https://www.youtube.com/@paravirtual' },
              { label: 'LANDR', href: 'https://network.landr.com/users/paravirtual' },
              { label: 'Linktree', href: 'https://tr.ee/5U4zOsImTS' },
            ].map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="service-card opacity-0 group p-6 md:p-8 flex flex-col justify-between gap-6 hover:bg-accent-soft transition-colors duration-200"
              >
                <span className="text-[10px] uppercase tracking-[0.22em] text-muted group-hover:text-text transition-colors duration-200">
                  {p.label}
                </span>
                <span className="text-[11px] text-muted/50 group-hover:text-muted transition-colors duration-200 self-end">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* ── 04 CTA ──────────────────────────────────────────── */}
        <section>
          <SectionLabel n="04" label={t('audio.labels.collaboration')} />
          <h2 className="anim-heading font-bold text-4xl md:text-5xl tracking-tight mb-6">
            {t('common.collab.heading')}
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-md mb-10">
            {t('common.collab.copy')}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:info@finnbarbieri.com"
              className="inline-block text-[11px] uppercase tracking-[0.22em] border border-line px-7 py-3 text-text hover:border-line-strong hover:bg-accent-soft transition-colors duration-200"
            >
              {t('contact.button')}
            </a>
            <a
              href="https://book.stripe.com/4gw4kdcmH1Lh8UgdQR"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[11px] uppercase tracking-[0.22em] border border-line px-7 py-3 text-muted hover:border-line-strong hover:bg-accent-soft hover:text-text transition-colors duration-200"
            >
              {t('audio.bookStudio')}
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
