import { useLayoutEffect, useMemo, useRef, type MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom'; // Use Link instead of <a> tags
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hls from 'hls.js';

const videoUrl = 'https://customer-9sc1a5pwms26icet.cloudflarestream.com/96315ec360fb66c08f875079d4f1324d/manifest/video.m3u8';
const heroPanelKeys = ['statementOne', 'statementTwo', 'statementThree', 'statementFour'] as const;

export default function Home() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const footerNavRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: t('nav.home', 'Home'), path: '/' },
    { id: 'photo', label: t('nav.photo', 'Photo'), path: '/photo' },
    { id: 'video', label: t('nav.video', 'Video'), path: '/video' },
    { id: 'audio', label: t('nav.audio', 'Audio'), path: '/audio' },
    { id: 'computerScience', label: t('nav.computerScience', 'Computer Science'), path: '/computer-science' },
  ];

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const video = videoRef.current;
    const heroSection = heroSectionRef.current;
    if (!video || !heroSection) return undefined;

    const panels = panelRefs.current.filter(Boolean) as HTMLElement[];
    const proxy = { time: 0 };
    const cleanup: Array<() => void> = [];
    const scrubDelay = 0.2;

    // Hide all panels initially
    gsap.set(panels, { autoAlpha: 0 });

    // Video setup with fallback
    const setupVideo = () => {
      if (Hls.isSupported()) {
        const hls = new Hls({
          debug: false,
          enableWorker: true,
          lowLatencyMode: false
        });
        
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            console.warn('HLS error. Using fallback video.');
            video.src = 'https://cdn.pixabay.com/vimeo/805661373/abstract%20digital%20space-805661373.mp4';
          }
        });
        
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        cleanup.push(() => hls.destroy());
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoUrl;
      } else {
        console.warn('HLS is not supported. Using fallback video.');
        video.src = 'https://cdn.pixabay.com/vimeo/805661373/abstract%20digital%20space-805661373.mp4';
      }
    };

    setupVideo();

    const createVideoTimeline = () => {
      const duration = video.duration || 10;
      const startTime = Math.min(0);
      const endTime = Math.max(69);
      proxy.time = startTime;
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: `+=${panels.length * 50}vh`,
          scrub: scrubDelay,
          invalidateOnRefresh: true
        }
      });

      timeline.to(proxy, {
        time: endTime,
        ease: 'none',
        onUpdate: () => {
          if (!Number.isNaN(proxy.time)) {
            video.currentTime = Math.max(startTime, Math.min(endTime, proxy.time));
          }
        }
      }, 0);

      cleanup.push(() => {
        const st = timeline.scrollTrigger as ScrollTrigger | undefined;
        st?.kill();
        timeline.kill();
      });
    };

    if (video.readyState >= 1) {
      createVideoTimeline();
    } else {
      const handleLoaded = () => createVideoTimeline();
      video.addEventListener('loadedmetadata', handleLoaded);
      cleanup.push(() => video.removeEventListener('loadedmetadata', handleLoaded));
    }

    // Panel animations
    panels.forEach((panel: HTMLElement, index: number) => {
      const panelTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: `${index * 50}vh top`,
          end: `${(index + 1) * 50}vh top`,
          scrub: true,
          invalidateOnRefresh: true
        }
      });

      // Fade in at the start of the scroll range
      panelTimeline.fromTo(
        panel,
        { autoAlpha: 0, y: 40, scale: 0.98, filter: 'blur(12px)' },
        { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', ease: 'power1.out', duration: 0.3 },
        0
      );

      if (index === heroPanelKeys.length - 1) {
        // Last panel stays visible
        panelTimeline.to(panel, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', ease: 'none', duration: 2 }, 0.3);
      } else {
        // Other panels stay visible then fade out
        panelTimeline
          .to(panel, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', ease: 'none', duration: 1.5 }, 0.3)
          .to(panel, { autoAlpha: 0, y: -40, scale: 1.02, filter: 'blur(12px)', ease: 'power1.in', duration: 0.3 }, 1.8);
      }

      cleanup.push(() => {
        const st = panelTimeline.scrollTrigger as ScrollTrigger | undefined;
        st?.kill();
        panelTimeline.kill();
      });
    });

    return () => cleanup.forEach((fn: () => void) => fn());
  }, [navigate, t]);

  const handleFooterNavClick = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    const footerNav = footerNavRef.current;
    const headerNav = document.querySelector('.page-header-nav');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!footerNav || !headerNav || window.location.pathname === path) {
      navigate(path);
      return;
    }

    const footerRect = footerNav.getBoundingClientRect();
    const headerRect = headerNav.getBoundingClientRect();
    const clone = footerNav.cloneNode(true) as HTMLElement;

    clone.style.position = 'fixed';
    clone.style.top = `${footerRect.top}px`;
    clone.style.left = `${footerRect.left}px`;
    clone.style.width = `${footerRect.width}px`;
    clone.style.height = `${footerRect.height}px`;
    clone.style.margin = '0';
    clone.style.zIndex = '9999';
    clone.style.pointerEvents = 'none';
    clone.style.opacity = '1';
    clone.style.transformOrigin = 'top left';

    document.body.appendChild(clone);

    gsap.to(clone, {
      duration: 0.45,
      top: `${headerRect.top}px`,
      left: `${headerRect.left}px`,
      width: `${headerRect.width}px`,
      height: `${headerRect.height}px`,
      opacity: 0.95,
      ease: 'power2.inOut',
      onComplete: () => {
        clone.remove();
        navigate(path);
      },
    });
  };

  const heroPanels = useMemo(
    () =>
      heroPanelKeys.map((key) => ({
        id: key,
        title: t(`hero.panels.${key}.title`),
        copy: t(`hero.panels.${key}.copy`)
      })),
    [t]
  );

  return (
    <section className="relative min-h-[120vh]" ref={heroSectionRef}>
      <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-b from-slate-900 to-black">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'saturate(1.15) brightness(1.1)', opacity: 0.7 }}    
              playsInline
              muted
              preload="metadata"
              loop
            />
          </div>

          <div className="fixed inset-0 z-10 pointer-events-none">
            {heroPanels.map((panel, index) => (
              <div key={panel.id} ref={(el) => panelRefs.current[index] = el} className={`absolute inset-0 flex flex-col items-center justify-center px-6 py-8 opacity-0 scale-95 blur-sm transition-none`} style={{ willChange: 'opacity, transform, filter', color: '#f5f5f8' }}>
                <h2 className='text-3xl md:text-5xl font-bold leading-tight tracking-tight' style={{ textAlign: 'center' }}>{panel.title}</h2>
                <p className='text-base md:text-lg max-w-2xl mt-4' style={{ textAlign: 'center' }}>{panel.copy}</p>
                {index === 3 && (
                  <div className="mt-8 opacity-100 flex flex-col items-center gap-8">
                    <nav ref={footerNavRef} className="pointer-events-auto" aria-label={t('common.pageNavigation')}>
                      <ul className="list-none m-0 p-0 flex gap-8 flex-wrap justify-center">
                        {navItems.slice(1).map((link) => (
                          <li key={link.id}>
                            <Link
                              to={link.path}
                              onClick={(event) => handleFooterNavClick(event, link.path)}
                              className="text-text hover:text-accent inline-block px-4 py-2 font-medium uppercase tracking-wide text-sm transition-colors duration-300 ease-out no-underline"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                    <a
                      href="mailto:info@finnbarbieri.com"
                      className="pointer-events-auto text-[11px] uppercase tracking-[0.22em] border border-white/40 px-7 py-3 text-white/90 hover:border-white hover:bg-white/10 transition-colors duration-200 whitespace-nowrap"
                    >
                      {t('contact.button')}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
      
    </section>

  );
}