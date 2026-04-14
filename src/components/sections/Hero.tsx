'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EventPhaseWrapper, PhaseConditional } from '@/components/shared/EventPhaseWrapper';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPParallax } from '@/hooks/useGSAP';

gsap.registerPlugin(ScrollTrigger);

interface Speaker {
  id: string;
  name: string;
  title?: string | null;
  photo?: { url?: string; filename?: string; alt?: string } | string | null;
}

interface HeroProps {
  siteSettings?: any;
  pageHome?: any;
  speakers?: Speaker[];
}

export function Hero({ siteSettings, pageHome, speakers = [] }: HeroProps) {
  const speakersTag = pageHome?.speakers?.tag || 'Confirmados';
  const speakersTitle = pageHome?.speakers?.title || 'Palestrantes';
  const hero = pageHome?.hero;
  const event = siteSettings?.event;
  const startDay = event?.startDate ? new Date(event.startDate).getUTCDate() : 10;
  const endDay = event?.endDate ? new Date(event.endDate).getUTCDate() : 13;
  const monthYear = event?.startDate
    ? new Date(event.startDate).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    : 'Junho 2026';
  const location = event?.location || 'Gramado, Rio Grande do Sul';

  // Hero content from CMS
  const headline = hero?.headline || 'Deguste, conheça e sinta os melhores produtos de origem do Brasil.';
  const subtitle = hero?.subtitle || 'O maior evento de produtos de origem do Brasil. Quatro dias de experiências gastronômicas, culturais e de conteúdo em Gramado.';
  const videoUrl = hero?.videoUrl || '/videos/hero.mp4';
  const secondaryText = hero?.secondaryButtonText || 'Saiba mais';
  const secondaryLink = hero?.secondaryButtonLink || '#sobre';
  const preEventText = hero?.preEventCta?.buttonText || 'Garanta seu Ingresso';
  const preEventLink = hero?.preEventCta?.buttonLink || '/ingressos';
  const duringText = hero?.duringEventCta?.buttonText || 'Confira a Programação';
  const duringLink = hero?.duringEventCta?.buttonLink || '/programacao';
  const postText = hero?.postEventCta?.buttonText || 'Reviva a Experiência';
  const postLink = hero?.postEventCta?.buttonLink || '/blog';
  const sectionRef = useRef<HTMLDivElement>(null);
  const decorativeRef = useGSAPParallax<HTMLDivElement>(80);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-headline', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 })
        .fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        .fromTo('.hero-ctas', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .fromTo('.hero-date-card', { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.6 }, '-=0.5');

      // (video parallax moved to HeroVideo component)
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#131415]">
      {/* Green background block — extends behind hero image */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[138px] w-[calc(100%-40px)] max-w-[1449px] h-[800px] md:h-[1100px] lg:h-[1431px] bg-[#4D564D] rounded-[15px]" />

      {/* Decorative organic SVG vector */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[5]" aria-hidden="true">
        <div
          ref={decorativeRef}
          className="absolute flex items-center justify-center"
          style={{
            left: '-1505px',
            top: 'calc(50% + 1198px)',
            width: '4422px',
            height: '4005px',
            transform: 'translateY(-50%)',
          }}
        >
          <div className="rotate-[75deg]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-lines.svg"
              alt=""
              width={3146}
              height={3735}
              className="max-w-none"
            />
          </div>
        </div>
      </div>

      {/* Main hero content area */}
      <div className="relative z-10 mx-auto max-w-[1330px] px-4 md:px-8 pt-[196px] pb-8">
        <div className="flex flex-col justify-between min-h-[407px]">
          {/* Headline */}
          <div className="hero-headline opacity-0">
            <h1 className="font-heading font-normal text-[#FFF5EC] text-4xl sm:text-5xl md:text-6xl lg:text-[78.85px] leading-[1.02] lg:max-w-[calc(100%-220px)]">
              {headline}
            </h1>
          </div>

          {/* Subtitle */}
          <p className="hero-subtitle opacity-0 font-just-sans font-normal text-lg md:text-xl lg:text-[24px] text-[#FFF5EC]/60 max-w-[604px] mt-6 md:mt-8">
            {subtitle}
          </p>

          {/* CTAs + Navigation tabs row */}
          <div className="hero-ctas opacity-0 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mt-8 md:mt-10 w-full">
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[10px] w-full lg:w-[604px]">
              <PhaseConditional
                preEvent={
                  <Link
                    href={preEventLink}
                    className="inline-flex items-center justify-center flex-1 sm:flex-none sm:w-[200px] p-[15px] bg-[#FFF5EC] rounded-full font-just-sans font-semibold text-[16px] text-[#3D2E1E] text-center hover:bg-[#FFF5EC]/90 transition-colors"
                  >
                    {preEventText}
                  </Link>
                }
                duringEvent={
                  <Link
                    href={duringLink}
                    className="inline-flex items-center justify-center flex-1 sm:flex-none sm:w-[200px] p-[15px] bg-[#FFF5EC] rounded-full font-just-sans font-semibold text-[16px] text-[#3D2E1E] text-center hover:bg-[#FFF5EC]/90 transition-colors"
                  >
                    {duringText}
                  </Link>
                }
                postEvent={
                  <Link
                    href={postLink}
                    className="inline-flex items-center justify-center flex-1 sm:flex-none sm:w-[200px] p-[15px] bg-[#FFF5EC] rounded-full font-just-sans font-semibold text-[16px] text-[#3D2E1E] text-center hover:bg-[#FFF5EC]/90 transition-colors"
                  >
                    {postText}
                  </Link>
                }
              />
              <Link
                href={secondaryLink}
                className="inline-flex items-center justify-center flex-1 sm:flex-none sm:w-[200px] p-[15px] border border-[#FFF5EC] rounded-full font-just-sans font-semibold text-[16px] text-[#FFF5EC] text-center hover:bg-[#FFF5EC]/10 transition-colors"
              >
                {secondaryText}
              </Link>
            </div>

            {/* Navigation tabs */}
            <div className="flex items-start gap-2 sm:gap-[18px] w-full lg:w-[510px]">
              <a
                href="#conhecer"
                className="flex-1 flex items-center justify-center px-[25px] py-[10px] border-b border-[#FFF5EC] font-just-sans font-normal text-[14px] text-[#FFF5EC] text-center hover:bg-[#FFF5EC]/5 transition-colors"
              >
                Conhecer
              </a>
              <a
                href="#experimentar"
                className="flex-1 flex items-center justify-center px-[25px] py-[10px] border-b border-[#FFF5EC] font-just-sans font-normal text-[14px] text-[#FFF5EC] text-center hover:bg-[#FFF5EC]/5 transition-colors"
              >
                Experimentar
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Date card (floating top right) */}
      <div className="hero-date-card hidden lg:flex absolute top-[138px] right-[20px] xl:right-[calc(50%-665px)] z-20 flex-col gap-[11px] items-start bg-[#1C1F21] rounded-b-[20px] pt-[16px] pb-[20px] px-[16px] w-[181px] opacity-0">
        <Image
          src="/images/icon-location-figma.svg"
          alt="Localização"
          width={24}
          height={24}
        />
        <p className="font-heading font-bold text-[#FFF5EC] text-center w-full">
          <span className="text-[48px] leading-[24px]">{startDay} </span>
          <span className="text-[24px] leading-[24px]">a</span>
          <span className="text-[48px] leading-[24px]"> {endDay}</span>
        </p>
        <p className="font-heading font-bold text-[20px] leading-[22px] text-[#FFF5EC] text-center w-full">
          de {monthYear}
        </p>
        <p className="font-just-sans font-normal text-[10px] leading-[12px] text-[#FFF5EC]/80 text-center w-full">
          {location}
        </p>
      </div>

      {/* Speakers grid */}
      {speakers.length > 0 && (
        <div className="relative z-10 mx-auto max-w-[1450px] px-4 md:px-5 mt-4">
          <div className="rounded-[15px] overflow-hidden bg-[#131415] p-8 md:p-12 lg:p-16">
            <div className="mb-10 text-center">
              <span className="mb-3 inline-block font-just-sans text-sm uppercase tracking-[0.2em] text-[#C9A962]">
                {speakersTag}
              </span>
              <h2 className="font-heading text-[32px] font-normal leading-[1.1] text-[#FFF5EC] md:text-[40px] lg:text-[48px]">
                {speakersTitle}
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
              {speakers.map((speaker) => {
                const photo =
                  typeof speaker.photo === 'object' && speaker.photo !== null
                    ? speaker.photo
                    : null;
                const photoUrl = photo?.url || (photo?.filename ? `/media/${photo.filename}` : null);
                const initials = speaker.name
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2);

                return (
                  <div key={speaker.id} className="group flex flex-col items-center">
                    <div className="relative mb-5 aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#1a1a1a]">
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={photo?.alt || speaker.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <span className="font-heading text-4xl text-[#C9A962]/30">
                            {initials}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#131415]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                    <h3 className="text-center font-heading text-lg leading-tight text-[#FFF5EC] md:text-xl">
                      {speaker.name}
                    </h3>
                    {speaker.title && (
                      <p className="mt-1.5 text-center font-just-sans text-sm leading-relaxed text-[#FFF5EC]/60">
                        {speaker.title}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
