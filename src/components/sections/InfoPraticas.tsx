'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAPScroll } from '@/hooks/useGSAP';

gsap.registerPlugin(ScrollTrigger);

const infoItems = [
  {
    icon: '/images/info-icons/calendar.svg',
    title: 'Data',
    text: '10 a 13 de Junho de 2026',
    sub: 'Quarta a Sábado',
  },
  {
    icon: '/images/info-icons/location.svg',
    title: 'Local',
    text: 'Gramado, Rio Grande do Sul',
    sub: 'Serra Gaúcha',
  },
  {
    icon: '/images/info-icons/hotel.svg',
    title: 'Hospedagem',
    text: 'Hotel Oficial: Laghetto',
    sub: 'Condições especiais para participantes',
  },
  {
    icon: '/images/info-icons/email.svg',
    title: 'Contato',
    text: 'contato@connectionexperience.com.br',
    sub: 'Atendimento em horário comercial',
  },
];

export function InfoPraticas() {
  const containerRef = useGSAPScroll<HTMLDivElement>({ animation: 'fadeUp', distance: 50, duration: 0.9 });
  const itemsRef = useRef<HTMLDivElement>(null);
  const mapRef = useGSAPScroll<HTMLDivElement>({ animation: 'scaleIn', duration: 0.8, delay: 0.3 });

  useEffect(() => {
    const el = itemsRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('.info-item');
      items.forEach((item, i) => {
        gsap.fromTo(item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: i * 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="info" className="bg-[#131415] px-6 py-[56px] md:px-[53px]">
      <div
        ref={containerRef}
        className="mx-auto flex max-w-[1412px] flex-col gap-10 rounded-[30px] bg-[#FFF5EC] px-8 py-10 md:rounded-[40px] md:px-[50px] md:py-[40px] lg:flex-row lg:items-center lg:gap-[48px] opacity-0"
      >
        {/* Left — Info */}
        <div className="flex flex-1 flex-col gap-[46px]">
          <h2 className="font-heading text-[40px] font-normal leading-[1.15] text-[#131415] md:text-[55px] lg:text-[68.85px] lg:leading-[80px]">
            Tudo que você precisa saber
          </h2>

          <div ref={itemsRef} className="flex flex-col gap-[24px] pt-[8px]">
            {infoItems.map((item) => (
              <div key={item.title} className="info-item flex items-start gap-[16px] opacity-0">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#4D564D]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.icon}
                    alt=""
                    className="h-6 w-6"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-col gap-[4px]">
                  <h3 className="font-heading text-[20px] font-bold leading-[28px] text-[#131415]">
                    {item.title}
                  </h3>
                  <p className="font-just-sans text-[16px] text-[#131415]">
                    {item.text}
                  </p>
                  <p className="font-just-sans text-[14px] text-[#131415]/50">
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Map placeholder */}
        <div ref={mapRef} className="relative flex-1 opacity-0">
          <div className="aspect-square w-full overflow-hidden rounded-[16px] border border-[#C9A962]/10 bg-[#131415] lg:rounded-[50px]">
            <div className="flex h-full w-full flex-col items-center justify-center gap-4">
              {/* Map pin icon */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#4D564D]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/info-icons/map-pin.svg"
                  alt=""
                  className="h-10 w-10"
                  aria-hidden="true"
                />
              </div>
              <p className="font-heading text-[20px] font-bold text-[#FFF5EC]">
                Gramado, RS
              </p>
              <p className="font-just-sans text-[16px] text-[#FFF5EC]/80">
                Serra Gaúcha
              </p>
              <Link
                href="https://maps.google.com/?q=Gramado+RS"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-[#4D564D] px-[18px] py-[10px] font-just-sans text-[16px] text-[#FFF5EC] transition-colors hover:bg-[#4D564D]/30"
              >
                Ver no mapa
              </Link>
            </div>
          </div>

          {/* 2026 Badge */}
          <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 flex flex-col rounded-[12px] bg-[#4D564D] p-3 sm:p-4 shadow-lg">
            <span className="font-heading text-[24px] leading-[32px] text-[#FFF5EC]">
              2026
            </span>
            <span className="font-just-sans text-[16px] text-[#FFF5EC]">
              Edição
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
