import { useTranslation } from 'react-i18next';
import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VimeoEmbed, YouTubeEmbed } from '../components/VideoEmbeds';

gsap.registerPlugin(ScrollTrigger);

const reels = [
  {
    id: 'r1',
    href: 'https://www.instagram.com/reel/DTIYBqHjBS_/',
    thumb: '/reels/recap-2025.jpg',
    tag: 'Recap',
  },
  {
    id: 'r2',
    href: 'https://www.instagram.com/reel/DYq_BDXIVNk/',
    thumb: '/reels/kantifaescht.jpg',
    tag: 'Events',
  },
  {
    id: 'r3',
    href: 'https://www.instagram.com/reel/DPBNCqhis-V/',
    thumb: '/reels/werkk-10-jahre.jpg',
    tag: 'Events',
    },
];

type Film = {
  id: string;
  platform: 'vimeo' | 'youtube';
  videoId: string;
  hash?: string;
  title: string;
  year: string;
  category: string;
};

const films: Film[] = [
  {
    id: 'f1',
    platform: 'vimeo',
    videoId: '1191230875',
    title: 'SOLA 2025 | Trailer',
    year: '2025',
    category: 'trailer',
  },
  {
    id: 'f2',
    platform: 'vimeo',
    videoId: '1045125895',
    title: 'Omniraves 1 | Recap',
    year: '2025',
    category: 'event',
  },
  {
    id: 'f3',
    platform: 'vimeo',
    videoId: '1045130495',
    title: 'Best Of 2024',
    year: '2025',
    category: 'event',
  },
  {
    id: 'f4',
    platform: 'youtube',
    videoId: 'yNuISwsgRac',
    title: 'Tornkid feat. Gei5t | Tell (Op.395)',
    year: '2024',
    category: 'musicVideo',
  },
  {
    id: 'f5',
    platform: 'youtube',
    videoId: 's0TIMyU3yuk',
    title: 'Chasedvision | Sxclout Rebranding Trailer',
    year: '2024',
    category: 'fashion',
  },
  {
    id: 'f6',
    platform: 'vimeo',
    videoId: '915762369',
    title: 'J Demon x JBdaplug | Evil Twins',
    year: '2024',
    category: 'musicVideo',
  },
  {
    id: 'f7',
    platform: 'vimeo',
    videoId: '924430649',
    title: 'J Demon | P.I.P Open Mic',
    year: '2024',
    category: 'musicVideo',
  },
  {
    id: 'f8',
    platform: 'vimeo',
    videoId: '890867088',
    title: 'Sxclout | Vision Collection Trailer',
    year: '2023',
    category: 'fashion',
  },
  {
    id: 'f9',
    platform: 'vimeo',
    videoId: '870820702',
    title: 'Sxclout | Coastline Drop',
    year: '2023',
    category: 'fashion',
  },
  {
    id: 'f10',
    platform: 'vimeo',
    videoId: '881495064',
    title: 'How I made a Major Tom Remix',
    year: '2023',
    category: 'shortFilm',
  },
  {
    id: 'f11',
    platform: 'vimeo',
    videoId: '870827027',
    hash: '9ade08a4bb',
    title: 'Unsichtbare Bedrohung: Eine Reise in die Welt der Cybersecurity',
    year: '2023',
    category: 'documentary',
  },
  {
    id: 'f12',
    platform: 'youtube',
    videoId: 'bKGH5KithcQ',
    title: 'Lagerfilm 2025 | Jungwacht und Blauring Klingnau',
    year: '2025',
    category: 'documentary',
  },
  {
    id: 'f13',
    platform: 'youtube',
    videoId: 'sKWe02Ljjn8',
    title: 'Lagerfilm 2023 | Jungwacht und Blauring Klingnau',
    year: '2023',
    category: 'documentary',
  },
];

const projects = [
  {
    id: '1',
    title: 'Chasedvision / Sxclout Rebrand',
    category: 'fashion',
    year: '2023',
    thumb: 'https://live.staticflickr.com/65535/54534232949_c257883171_b_d.jpg',
    caseStudy: '/case-study-sxclout-vision',
  },
  {
    id: '2',
    title: '',
    category: 'content',
    year: '2025',
    thumb: '/case-studies/jublasurium/bts-3.jpg',
    caseStudy: '/case-study-jublasurium',
  },
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

function FilmEmbed({ film }: { film: (typeof films)[number] }) {
  return film.platform === 'vimeo'
    ? <VimeoEmbed id={film.videoId} hash={film.hash} />
    : <YouTubeEmbed id={film.videoId} />;
}

export default function Video() {
  const { t } = useTranslation();
  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from('.vid-eyebrow', { opacity: 0, y: 16, duration: 0.9, ease: 'power3.out', delay: 0.05 });
      gsap.from('.vid-h1-line', { y: '108%', duration: 1.15, ease: 'power4.out', stagger: 0.09, delay: 0.15 });
      gsap.from('.vid-subtitle', { opacity: 0, y: 20, duration: 1, ease: 'power3.out', delay: 0.45 });

      // Sections: headings
      gsap.utils.toArray<Element>('.anim-heading').forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 24, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 89%', once: true },
        });
      });

      // Sections: staggered items
      const batchTargets = ['.reel-card', '.film-card', '.project-row', '.origin-block'];
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
          <p className="vid-eyebrow text-[11px] uppercase tracking-[0.28em] text-muted mb-7">
            {t('video.eyebrow')}
          </p>
          <h1 className="font-bold text-6xl md:text-7xl tracking-tight">
            <div className="overflow-hidden leading-[1.25]">
              <span className="vid-h1-line inline-block">{t('video.h1a')}</span>
            </div>
            <div className="overflow-hidden leading-[1.25]">
              <span className="vid-h1-line inline-block">{t('video.h1b')}</span>
            </div>
          </h1>
          <p className="vid-subtitle mt-7 text-muted max-w-md leading-relaxed text-sm">
            {t('video.subtitle')}
          </p>
        </header>

        {/* ── 01 Short Form ───────────────────────────────────── */}
        <section className="mb-28">
          <SectionLabel n="01" label={t('video.labels.shortForm')} />
          <h2 className="anim-heading font-bold text-4xl md:text-5xl tracking-tight mb-10">
            {t('video.reelsHeading')}
          </h2>

          {/* Horizontal scroll on mobile, 3-col grid on desktop */}
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:snap-none">
            {reels.map((reel) => (
              <a
                key={reel.id}
                href={reel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="reel-card opacity-0 group flex-shrink-0 snap-center w-[200px] sm:w-auto"
                style={{ aspectRatio: '9/16' }}
              >
                <div className="relative w-full h-full overflow-hidden border border-line bg-black">
                  <img
                    src={reel.thumb}
                    alt={t(`video.reels.${reel.id}`)}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Tag */}
                  <span className="absolute top-4 left-4 text-[9px] uppercase tracking-[0.22em] text-white/65 border border-white/20 px-2 py-1">
                    {reel.tag}
                  </span>

                  {/* Play ring */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full border border-white/35 flex items-center justify-center group-hover:border-white/65 group-hover:scale-110 transition-all duration-300">
                      <svg width="12" height="14" viewBox="0 0 12 14" fill="white" className="ml-0.5">
                        <path d="M1 1L11 7L1 13V1Z" />
                      </svg>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[11px] text-white/80 leading-snug tracking-[0.03em] mb-2">
                      {t(`video.reels.${reel.id}`)}
                    </p>
                    <div className="flex items-center gap-1.5 opacity-45">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="1" fill="white" />
                      </svg>
                      <span className="text-[9px] text-white tracking-widest uppercase">Instagram</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── 02 Storytelling ─────────────────────────────────── */}
        <section className="mb-28">
          <SectionLabel n="02" label={t('video.labels.storytelling')} />
          <h2 className="anim-heading font-bold text-4xl md:text-5xl tracking-tight mb-12">
            {t('video.projectsHeading')}
          </h2>

          {/* Featured: large with description alongside */}
          <div className="film-card opacity-0 grid md:grid-cols-[1fr_220px] gap-8 mb-10 items-end">
            <FilmEmbed film={films[0]} />
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted">{t(`common.categories.${films[0].category}`)} · {films[0].year}</span>
              <h3 className="font-semibold text-xl mt-2 mb-3">{films[0].title}</h3>
              <p className="text-sm text-muted leading-relaxed">{t(`video.films.${films[0].id}`)}</p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted/55">{t('common.credits')}</p>
            </div>
          </div>

          {/* Secondary: smaller 2-col */}
          <div className="grid sm:grid-cols-2 gap-5">
            {films.slice(1).map((film) => (
              <div key={film.id} className="film-card opacity-0">
                <FilmEmbed film={film} />
                <div className="mt-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted">{t(`common.categories.${film.category}`)} · {film.year}</span>
                  <h3 className="font-semibold text-lg mt-1">{film.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mt-1">{t(`video.films.${film.id}`)}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted/55">{t('common.credits')}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 03 Selected Work ────────────────────────────────── */}
        <section className="mb-28">
          <SectionLabel n="03" label={t('video.labels.selectedWork')} />
          <h2 className="anim-heading font-bold text-4xl md:text-5xl tracking-tight mb-2">
            {t('video.caseStudiesHeading')}
          </h2>

          {projects.map((p, i) => {
            const content = (
              <>
                <span className="text-[10px] tracking-[0.18em] text-muted/55 font-mono pt-[5px]">0{i + 1}</span>
                <div>
                  <h3 className="font-semibold text-xl md:text-2xl mb-2 group-hover:opacity-70 transition-opacity duration-300">
                    {p.title || t(`video.projects.${p.id}.title`)}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed max-w-md">{t(`video.projects.${p.id}.description`)}</p>
                  {p.caseStudy && (
                    <span className="mt-3 inline-block text-[10px] uppercase tracking-[0.2em] text-muted group-hover:text-text transition-colors duration-300">
                      {t('common.viewCaseStudy')}
                    </span>
                  )}
                </div>
                <div className="flex items-start gap-4 md:gap-6 pt-[3px]">
                  <div className="text-right hidden sm:block">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted mb-1">{t(`common.categories.${p.category}`)}</div>
                    <div className="text-[10px] tracking-[0.08em] text-muted/45">{p.year}</div>
                  </div>
                  <div className="w-16 h-11 md:w-20 md:h-14 overflow-hidden shrink-0 opacity-30 group-hover:opacity-70 transition-opacity duration-300">
                    <img
                      src={p.thumb}
                      alt={p.title || t(`video.projects.${p.id}.title`)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>
              </>
            );
            const className = `project-row opacity-0 group grid grid-cols-[2rem_1fr_auto] md:grid-cols-[3rem_1fr_auto] gap-6 md:gap-10 border-t border-line py-8 md:py-10 items-start hover:border-line-strong transition-colors duration-300 ${p.caseStudy ? 'cursor-pointer' : 'cursor-default'}`;
            return p.caseStudy ? (
              <Link key={p.id} to={p.caseStudy} className={className}>{content}</Link>
            ) : (
              <div key={p.id} className={className}>{content}</div>
            );
          })}
          <div className="border-t border-line" />
        </section>

        {/* ── 04 Origins ──────────────────────────────────────── */}
        <section>
          <SectionLabel n="04" label={t('video.labels.origins')} />
          <h2 className="anim-heading font-bold text-4xl md:text-5xl tracking-tight mb-14">
            {t('video.howItStarted')}
          </h2>

          <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-start">
            <div className="origin-block opacity-0 space-y-5 text-sm text-muted leading-[1.9]">
              <img
                src="/video/newspaper-2014.webp"
                alt={t('video.newspaperCaption')}
                className="w-full aspect-[3/2] object-cover"
                loading="lazy"
              />
              <p className="text-[11px] uppercase tracking-[0.22em] text-text">
                {t('video.newspaperCaption')}
              </p>
              <p>
                {t('video.newspaperText')}{' '}
                <a
                  href="https://www.aargauerzeitung.ch/aargau/zurzibiet/dieser-13-jahrige-zurzibieter-ist-ein-digitales-multitalent-ld.1459988"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text underline underline-offset-4 hover:text-muted transition-colors duration-200"
                >
                  aargauerzeitung.ch
                </a>
              </p>
            </div>

            <div className="origin-block opacity-0">
              <VimeoEmbed id="872021442" />
              <div className="mt-5">
                <p className="font-semibold text-xl text-text tracking-tight mb-2">
                  {t('video.awardTitle')}
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  {t('video.awardText1')}{' '}
                  <em className="text-text not-italic">"Der fressende Müllroboter"</em>
                  {t('video.awardText2')}
                </p>
              </div>
            </div>

            <div className="origin-block opacity-0 md:col-start-2">
              <VimeoEmbed id="872022330" />
              <div className="mt-5">
                <p className="font-semibold text-xl text-text tracking-tight mb-2">
                  {t('video.btsTitle')}
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  {t('video.btsText')}
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
