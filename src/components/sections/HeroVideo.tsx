'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroVideoProps {
  videoUrl?: string;
  posterUrl?: string;
}

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{11})/);
  return match ? match[1] : null;
}

const DEFAULT_VIDEO_URL = 'https://www.youtube.com/watch?v=jNQXAC9IVRw';

export function HeroVideo({ videoUrl, posterUrl }: HeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const effectiveUrl = videoUrl && getYouTubeId(videoUrl) ? videoUrl : DEFAULT_VIDEO_URL;
  const youtubeId = getYouTubeId(effectiveUrl);
  const thumbnail = posterUrl || (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg` : null);
  const embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1` : null;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector('.hero-video-thumb'),
        { scale: 1.05 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  if (!youtubeId) {
    return null;
  }

  return (
    <>
      <section className="relative bg-[#131415] py-4">
        <div className="mx-auto max-w-[1450px] px-4 md:px-5">
          <div
            ref={containerRef}
            className="relative h-[400px] w-full overflow-hidden rounded-[15px] md:h-[600px] lg:h-[810px]"
          >
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="hero-video-thumb group absolute inset-0 h-full w-full cursor-pointer"
              aria-label="Reproduzir vídeo"
            >
              {thumbnail && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={thumbnail}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 transition-colors group-hover:from-black/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF5EC]/95 shadow-2xl transition-transform duration-300 group-hover:scale-110 md:h-24 md:w-24">
                  <svg className="ml-1 h-8 w-8 text-[#131415] md:h-10 md:w-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Vídeo"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm md:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF5EC]/10 text-[#FFF5EC] transition-colors hover:bg-[#FFF5EC]/20 md:right-6 md:top-6"
            aria-label="Fechar vídeo"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative aspect-video w-full max-w-[1400px]">
            <iframe
              src={embedUrl || ''}
              title="Vídeo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full rounded-[12px] bg-black"
            />
          </div>
        </div>
      )}
    </>
  );
}
