'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function getResponsiveDistance(distance: number): number {
  if (typeof window === 'undefined') return distance;
  const w = window.innerWidth;
  if (w < 480) return Math.round(distance * 0.4);
  if (w < 768) return Math.round(distance * 0.6);
  return distance;
}

interface GSAPScrollOptions {
  animation?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'fadeIn' | 'scaleIn' | 'parallax';
  duration?: number;
  delay?: number;
  distance?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  stagger?: number;
  children?: boolean;
  markers?: boolean;
}

export function useGSAPScroll<T extends HTMLElement = HTMLDivElement>({
  animation = 'fadeUp',
  duration = 0.8,
  delay = 0,
  distance = 60,
  start = 'top 85%',
  end = 'top 20%',
  scrub = false,
  stagger = 0.12,
  children = false,
  markers = false,
}: GSAPScrollOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const effectiveDistance = getResponsiveDistance(distance);

    const ctx = gsap.context(() => {
      const targets = children ? el.children : el;

      const fromVars: gsap.TweenVars = { opacity: 0 };
      const toVars: gsap.TweenVars = {
        opacity: 1,
        duration,
        delay,
        ease: 'power2.out',
        stagger: children ? stagger : 0,
      };

      switch (animation) {
        case 'fadeUp':
          fromVars.y = effectiveDistance;
          toVars.y = 0;
          break;
        case 'fadeLeft':
          fromVars.x = -effectiveDistance;
          toVars.x = 0;
          break;
        case 'fadeRight':
          fromVars.x = effectiveDistance;
          toVars.x = 0;
          break;
        case 'fadeIn':
          break;
        case 'scaleIn':
          fromVars.scale = 0.92;
          toVars.scale = 1;
          break;
        case 'parallax':
          gsap.fromTo(el, { y: effectiveDistance }, {
            y: -effectiveDistance,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub: typeof scrub === 'boolean' ? 1 : scrub,
              markers,
            },
          });
          return;
      }

      if (scrub) {
        gsap.fromTo(targets, fromVars, {
          ...toVars,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub: typeof scrub === 'number' ? scrub : 1,
            markers,
          },
        });
      } else {
        gsap.fromTo(targets, fromVars, {
          ...toVars,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none none',
            markers,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [animation, duration, delay, distance, start, end, scrub, stagger, children, markers]);

  return ref;
}

export function useGSAPTimeline<T extends HTMLElement = HTMLDivElement>(
  buildTimeline: (tl: gsap.core.Timeline, el: T) => void,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
  } = {}
) {
  const ref = useRef<T>(null);
  const { start = 'top 80%', end = 'top 20%', scrub = false, markers = false } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: scrub ? (typeof scrub === 'number' ? scrub : 1) : false,
          toggleActions: scrub ? undefined : 'play none none none',
          markers,
        },
      });
      buildTimeline(tl, el);
    }, el);

    return () => ctx.revert();
  }, [buildTimeline, start, end, scrub, markers]);

  return ref;
}

export function useGSAPParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 50,
  options: { start?: string; end?: string } = {}
) {
  const { start = 'top bottom', end = 'bottom top' } = options;
  return useGSAPScroll<T>({
    animation: 'parallax',
    distance: speed,
    start,
    end,
    scrub: 1,
  });
}
