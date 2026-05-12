import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hls from 'hls.js';

// Replace this with your Cloudflare HLS manifest URL:
// e.g. https://customer.cloudflarestream.com/<video-id>/manifest/video.m3u8
const videoUrl = 'https://customer-9sc1a5pwms26icet.cloudflarestream.com/65fe3b0a3635c09706111d9592d681ff/manifest/video.m3u8';

const heroPanelKeys = [
  'statementOne',
  'statementTwo',
  'statementThree',
  'statementFour'
] as const;

type HeroPanelKey = typeof heroPanelKeys[number];

function App() {
  const { t, i18n } = useTranslation();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const video = videoRef.current;
    const heroSection = heroSectionRef.current;
    if (!video || !heroSection) return undefined;

    const panels = panelRefs.current.filter(Boolean) as HTMLElement[];
    const proxy = { time: 0 };
    const cleanup: Array<() => void> = [];
    const videoStartOffset = 5;
    const videoEndOffset = 5;
    const scrubDelay = 1;

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
      const startTime = Math.min(videoStartOffset, duration / 2);
      const endTime = Math.max(duration - videoEndOffset, startTime + 1);
      proxy.time = startTime;
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: `+=${panels.length * 100}vh`,
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
          start: `${index * 100}vh top`,
          end: `${(index + 1) * 100}vh top`,
          scrub: true,
          invalidateOnRefresh: true
        }
      });

      // Fade in at the start of the scroll range
      panelTimeline.fromTo(
        panel,
        { autoAlpha: 0, y: 40, scale: 0.98, filter: 'blur(12px)' },
        { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', ease: 'power1.out', duration: 0.1 },
        0
      );

      if (index === heroPanelKeys.length - 1) {
        // Last panel stays visible
        panelTimeline.to(panel, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', ease: 'none', duration: 0.9 }, 0.1);
      } else {
        // Other panels stay visible then fade out
        panelTimeline
          .to(panel, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', ease: 'none', duration: 0.8 }, 0.1)
          .to(panel, { autoAlpha: 0, y: -40, scale: 1.02, filter: 'blur(12px)', ease: 'power1.in', duration: 0.1 }, 0.9);
      }

      cleanup.push(() => {
        const st = panelTimeline.scrollTrigger as ScrollTrigger | undefined;
        st?.kill();
        panelTimeline.kill();
      });
    });

    return () => cleanup.forEach((fn: () => void) => fn());
  }, []);

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
    <div className="overflow-x-hidden">
      <header className="sticky top-0 z-20 flex justify-between items-center px-4 py-4 md:px-10 backdrop-blur-xl bg-black/80">
        <div className="font-bold tracking-wider">Finn Barbieri</div>
        <div className="language-switcher" role="navigation" aria-label="Language switcher">
          {(['en', 'de'] as const).map((lang) => (
            <button
              key={lang}
              className={`border border-white/20 bg-transparent px-4 py-3 mx-3 rounded-full transition-all duration-300 ease-out ${
                i18n.language === lang ? 'text-white border-green-400 bg-green-400/10' : 'text-gray-400'
              }`}
              onClick={() => i18n.changeLanguage(lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <main>
        <section className="relative min-h-[400vh]" ref={heroSectionRef}>
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
                  <div className="mt-8 opacity-100">
                    <nav>
                      <ul className="list-none m-0 p-0 flex gap-8 flex-wrap justify-center">
                        <li><a href="#site-1" className="inline-block px-4 py-2 font-medium uppercase tracking-wide text-sm transition-colors duration-300 ease-out no-underline hover:text-green-400" style={{ color: '#f5f5f8' }}>Site 1</a></li>
                        <li><a href="#site-2" className="inline-block px-4 py-2 font-medium uppercase tracking-wide text-sm transition-colors duration-300 ease-out no-underline hover:text-green-400" style={{ color: '#f5f5f8' }}>Site 2</a></li>
                        <li><a href="#site-3" className="inline-block px-4 py-2 font-medium uppercase tracking-wide text-sm transition-colors duration-300 ease-out no-underline hover:text-green-400" style={{ color: '#f5f5f8' }}>Site 3</a></li>
                        <li><a href="#site-4" className="inline-block px-4 py-2 font-medium uppercase tracking-wide text-sm transition-colors duration-300 ease-out no-underline hover:text-green-400" style={{ color: '#f5f5f8' }}>Site 4</a></li>
                      </ul>
                    </nav>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="py-8 px-4 md:px-10 text-center">
        <div>{t('footer.copy')}</div>
      </footer>
    </div>
  );
}

export default App;
