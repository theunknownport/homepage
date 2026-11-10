import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback, useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Photo {
  id: string;
  src: string;
  alt: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  cover: string;
  year: string;
  caseStudy?: string;
}

const photos: Photo[] = [
  { id: '1',  src: 'https://live.staticflickr.com/65535/53615492491_46f6121539_b.jpg', alt: 'artist' },
  { id: '2',  src: 'https://live.staticflickr.com/65535/54534232949_c257883171_b_d.jpg', alt: 'fashion' },
  { id: '3',  src: 'https://live.staticflickr.com/65535/54534048711_9604b5a6f2_b_d.jpg', alt: 'london' },
  { id: '4',  src: 'https://live.staticflickr.com/65535/54534282763_a0da661163_b_d.jpg', alt: 'london' },
  { id: '5',  src: 'https://live.staticflickr.com/65535/54534048761_e87e98ab16_b_d.jpg', alt: 'fashion' },
  { id: '6',  src: 'https://live.staticflickr.com/65535/55354319541_c06d8601e9_b.jpg', alt: 'club' },
  { id: '7',  src: 'https://live.staticflickr.com/65535/55354748460_464cfc39f9_b.jpg', alt: 'association' },
  { id: '8',  src: 'https://live.staticflickr.com/65535/55354755650_e8c746d0e5_b.jpg', alt: 'studio' },
  
  { id: '12', src: 'https://live.staticflickr.com/65535/55354532749_1370599356_b.jpg', alt: 'club' },
];

const projects: Project[] = [
  {
    id: '1',
    title: 'Sxclout | Vision Collection',
    category: 'fashion',
    cover: 'https://live.staticflickr.com/65535/53400256819_6e077941fd_b.jpg',
    year: '2023',
    caseStudy: '/case-study-sxclout-vision',
  },
];

export default function Photo() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<Photo | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const pageRef = useRef<HTMLDivElement>(null);

  /* ── Lightbox ────────────────────────────────── */
  const close = useCallback(() => setSelected(null), []);

  const navigate = useCallback((dir: 1 | -1) => {
    setSelectedIndex((i) => {
      const next = (i + dir + photos.length) % photos.length;
      setSelected(photos[next]);
      return next;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close, navigate]);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const open = (photo: Photo, index: number) => {
    setSelected(photo);
    setSelectedIndex(index);
  };

  const n = photos.length;
  const gridCols =
    n <= 4  ? 'grid-cols-1 sm:grid-cols-2' :
    n <= 8  ? 'grid-cols-2 sm:grid-cols-3' :
              'grid-cols-2 sm:grid-cols-3';

  /* ── GSAP animations ─────────────────────────── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ── Header: eyebrow fade in
      gsap.from('.photo-eyebrow', {
        opacity: 0,
        y: 18,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.05,
      });

      // ── Header: h1 lines slide up from clip
      gsap.from('.photo-h1-line', {
        y: '108%',
        duration: 1.15,
        ease: 'power4.out',
        stagger: 0.09,
        delay: 0.15,
      });

      // ── Header: subtitle
      gsap.from('.photo-subtitle', {
        opacity: 0,
        y: 22,
        duration: 1,
        ease: 'power3.out',
        delay: 0.45,
      });

      // ── Grid: batch reveal on scroll
      ScrollTrigger.batch('.photo-grid-item', {
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.06, overwrite: true }
          ),
        start: 'top 92%',
        once: true,
      });

      // ── Projects heading
      gsap.from('.projects-heading', {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-heading',
          start: 'top 88%',
          once: true,
        },
      });

      // ── Project rows: staggered slide-in from left
      ScrollTrigger.batch('.project-row', {
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { opacity: 0, x: -18 },
            { opacity: 1, x: 0, duration: 0.75, ease: 'power3.out', stagger: 0.09, overwrite: true }
          ),
        start: 'top 88%',
        once: true,
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-bg pt-16 pb-32 px-6 text-text">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ──────────────────────────────── */}
        <header className="pt-10 pb-12 mb-14 border-b border-line">
          <p className="photo-eyebrow text-[11px] uppercase tracking-[0.28em] text-muted mb-7">
            {t('photo.eyebrow')}
          </p>
          <h1 className="font-bold text-6xl md:text-7xl tracking-tight">
            <div className="overflow-hidden leading-[1.25]">
              <span className="photo-h1-line inline-block">{t('photo.h1a')}</span>
            </div>
            <div className="overflow-hidden leading-[1.25]">
              <span className="photo-h1-line inline-block">{t('photo.h1b')}</span>
            </div>
          </h1>
          <p className="photo-subtitle mt-7 text-muted max-w-md leading-relaxed text-sm">
            {t('photo.subtitle')}
          </p>
        </header>

        {/* ── Photo grid ──────────────────────────── */}
        <div className={`grid ${gridCols} gap-3 mb-28`}>
          {photos.map((photo, i) => (
            <div
              key={photo.id}
              className="photo-grid-item aspect-square relative overflow-hidden group cursor-pointer opacity-0"
              onClick={() => open(photo, i)}
            >
              <img
                src={photo.src}
                alt={t(`photo.alts.${photo.alt}`)}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-3 left-4 text-white/80 text-[11px] tracking-[0.12em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0 transform">
                {t(`photo.alts.${photo.alt}`)}
              </span>
            </div>
          ))}
        </div>

        {/* ── Projects ─────────────────────────────── */}
        <section>
          <div className="projects-heading flex items-baseline justify-between mb-0">
            <h2 className="font-bold text-4xl md:text-5xl tracking-tight">{t('photo.selectedWork')}</h2>
            <span className="text-[11px] uppercase tracking-[0.24em] text-muted hidden sm:block">{t('photo.projects')}</span>
          </div>

          {projects.map((project, i) => {
            const content = (
              <>
                <span className="text-[10px] tracking-[0.18em] text-muted/55 font-mono pt-[6px]">
                  0{i + 1}
                </span>

                <div>
                  <h3 className="font-semibold text-xl md:text-2xl mb-2 group-hover:opacity-70 transition-opacity duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed max-w-md">
                    {t(`photo.projectDescriptions.${project.id}`)}
                  </p>
                  {project.caseStudy && (
                    <span className="mt-3 inline-block text-[10px] uppercase tracking-[0.2em] text-muted group-hover:text-text transition-colors duration-300">
                      {t('common.viewCaseStudy')}
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-4 md:gap-6 pt-[3px]">
                  <div className="text-right hidden sm:block">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted mb-1">{t(`common.categories.${project.category}`)}</div>
                    <div className="text-[10px] tracking-[0.08em] text-muted/45">{project.year}</div>
                  </div>
                  <div className="w-16 h-11 md:w-20 md:h-14 overflow-hidden shrink-0 opacity-30 group-hover:opacity-70 transition-opacity duration-300">
                    <img
                      src={project.cover}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>
              </>
            );
            const className = 'project-row group grid grid-cols-[2rem_1fr_auto] md:grid-cols-[3rem_1fr_auto] gap-6 md:gap-10 border-t border-line py-8 md:py-10 items-start hover:border-line-strong transition-colors duration-300 cursor-pointer opacity-0';
            return project.caseStudy ? (
              <Link key={project.id} to={project.caseStudy} className={className}>{content}</Link>
            ) : (
              <div key={project.id} className={className}>{content}</div>
            );
          })}
          <div className="border-t border-line" />
        </section>

      </div>

      {/* ── Lightbox ─────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/96"
          onClick={close}
        >
          <button
            className="absolute top-6 right-7 text-white/35 hover:text-white/80 text-3xl font-light leading-none transition-colors duration-200"
            onClick={close}
            aria-label={t('photo.close')}
          >
            ×
          </button>

          <button
            className="absolute left-5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/70 text-5xl font-thin leading-none transition-colors duration-200 px-2 py-3"
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            aria-label={t('photo.previous')}
          >
            ‹
          </button>

          <img
            src={selected.src.replace('w=900', 'w=1800')}
            alt={t(`photo.alts.${selected.alt}`)}
            className="max-w-[90vw] max-h-[88vh] object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/70 text-5xl font-thin leading-none transition-colors duration-200 px-2 py-3"
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            aria-label={t('photo.next')}
          >
            ›
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/25 text-[10px] tracking-[0.22em] uppercase">
            {t(`photo.alts.${selected.alt}`)} &nbsp;·&nbsp; {selectedIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  );
}
