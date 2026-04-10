'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroVideoProps {
  videoUrl?: string;
}

export function HeroVideo({ videoUrl = '/videos/hero.mp4' }: HeroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelector('video'),
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

  return (
    <section className="relative bg-[#131415] py-4">
      <div className="mx-auto max-w-[1450px] px-4 md:px-5">
        <div
          ref={containerRef}
          className="relative w-full h-[400px] md:h-[600px] lg:h-[810px] rounded-[15px] overflow-hidden"
        >
          <video
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
