import { useTranslation } from 'react-i18next';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = ['sk1', 'sk2', 'sk3', 'sk4', 'sk5'];

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-[10px] font-mono tracking-[0.16em] text-muted/50">{n}</span>
      <span className="h-px w-5 bg-muted/25 block shrink-0" />
      <span className="text-[11px] uppercase tracking-[0.24em] text-muted">{label}</span>
    </div>
  );
}

export default function ComputerScience() {
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
          <p className="cs-eyebrow text-[11px] uppercase tracking-[0.28em] text-muted mb-7">
            {t('cs.eyebrow')}
          </p>
          <h1 className="font-bold text-6xl md:text-7xl tracking-tight">
            <div className="overflow-hidden leading-[1.25]">
              <span className="cs-h1-line inline-block">{t('cs.h1a')}</span>
            </div>
            {t('cs.h1b') && (
              <div className="overflow-hidden leading-[1.25]">
                <span className="cs-h1-line inline-block">{t('cs.h1b')}</span>
              </div>
            )}
          </h1>
          <p className="cs-subtitle mt-7 text-muted max-w-md leading-relaxed text-sm">
            {t('cs.subtitle')}
          </p>
        </header>

        {/* ── 01 Background ───────────────────────────────────── */}
        <section className="mb-28">
          <SectionLabel n="01" label={t('cs.labels.background')} />
          <h2 className="anim-heading font-bold text-4xl md:text-5xl tracking-tight mb-12">
            {t('cs.fascination1')}<br />{t('cs.fascination2')}
          </h2>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-5 text-sm text-muted leading-[1.9]">
              <p>{t('cs.bg1')}</p>
              <p>{t('cs.bg2')}</p>
              <p>{t('cs.bg3')}</p>
            </div>

            <div className="service-card opacity-0 border border-line p-8 md:p-10 flex flex-col gap-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted">{t('cs.facts.heading')}</p>
              <ul className="space-y-4 text-sm text-muted leading-relaxed">
                {[
                  { label: t('cs.facts.role'), value: t('cs.facts.roleValue') },
                  { label: t('cs.facts.since'), value: '2020' },
                  { label: t('cs.facts.industry'), value: 'Cybersecurity' },
                  { label: t('cs.facts.focus'), value: t('cs.facts.focusValue') },
                ].map((fact) => (
                  <li key={fact.label} className="flex gap-4">
                    <span className="w-16 shrink-0 text-muted/50">{fact.label}</span>
                    <span className="text-text">{fact.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── 02 Skills ───────────────────────────────────────── */}
        <section className="mb-28">
          <SectionLabel n="02" label={t('cs.labels.skills')} />
          <h2 className="anim-heading font-bold text-4xl md:text-5xl tracking-tight mb-12">
            {t('cs.skillsHeading1')}<br />{t('cs.skillsHeading2')}
          </h2>

          <div className="grid sm:grid-cols-2 gap-px border border-line">
            {skills.map((id) => (
              <div key={id} className="service-card opacity-0 p-8 md:p-10 sm:last:col-span-2">
                <h3 className="font-semibold text-2xl mb-4 text-text">{t(`cs.skills.${id}.title`)}</h3>
                <p className="text-sm text-muted leading-relaxed">{t(`cs.skills.${id}.description`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 03 Projects ─────────────────────────────────────── */}
        <section className="mb-28">
          <SectionLabel n="03" label={t('cs.labels.projects')} />
          <h2 className="anim-heading font-bold text-4xl md:text-5xl tracking-tight mb-12">
            {t('cs.projectsHeading')}
          </h2>

          <div className="service-card opacity-0 border border-line p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div>
                <h3 className="font-bold text-3xl text-text mb-2">Heycloud</h3>
                <p className="text-[10px] uppercase tracking-[0.22em] text-muted">{t('cs.heycloud.meta')}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <span className="text-[10px] uppercase tracking-[0.14em] border border-line px-3 py-1 text-muted">Go</span>
                <span className="text-[10px] uppercase tracking-[0.14em] border border-line px-3 py-1 text-muted">React</span>
                <span className="text-[10px] uppercase tracking-[0.14em] border border-line px-3 py-1 text-muted">Proxmox</span>
              </div>
            </div>

            <div className="text-sm text-muted leading-relaxed max-w-2xl mb-8 space-y-4">
              <p>{t('cs.heycloud.p1')}</p>
              <p>{t('cs.heycloud.p2')}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-10">
              {[
                t('cs.heycloud.features.vps'),
                t('cs.heycloud.features.login'),
                t('cs.heycloud.features.billing'),
                t('cs.heycloud.features.dashboard'),
                t('cs.heycloud.features.console'),
              ].map((feature) => (
                <span
                  key={feature}
                  className="text-[10px] uppercase tracking-[0.14em] text-muted/70 border border-line/50 px-3 py-2 text-center"
                >
                  {feature}
                </span>
              ))}
            </div>

            <p className="text-sm text-muted leading-relaxed max-w-2xl mb-8">
              {t('cs.heycloud.p3')}
            </p>

            <a
              href="mailto:info@finnbarbieri.com?subject=Heycloud Source Code"
              className="inline-block text-[11px] uppercase tracking-[0.22em] border border-line px-7 py-3 text-text hover:border-line-strong hover:bg-accent-soft transition-colors duration-200"
            >
              {t('cs.heycloud.request')}
            </a>
          </div>
        </section>

        {/* ── 04 Connect ──────────────────────────────────────── */}
        <section>
          <SectionLabel n="04" label={t('cs.labels.connect')} />
          <h2 className="anim-heading font-bold text-4xl md:text-5xl tracking-tight mb-6">
            {t('cs.story.heading')}
          </h2>
          <p className="text-sm text-muted leading-relaxed max-w-md mb-10">
            {t('cs.story.copy')}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px border border-line">
            {[
              { label: 'GitHub', href: 'https://github.com/theunknownport' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/finn-barbieri-71431b1bb/' },
              { label: t('cs.email'), href: 'mailto:info@finnbarbieri.com' },
              { label: 'Instagram', href: 'https://www.instagram.com/insta_fb/' },
            ].map((p) => (
              <a
                key={p.label}
                href={p.href}
                target={p.href.startsWith('mailto') ? undefined : '_blank'}
                rel={p.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
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

      </div>
    </div>
  );
}
