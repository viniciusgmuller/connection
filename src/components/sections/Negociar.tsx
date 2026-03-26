'use client';

import Image from 'next/image';
import Link from 'next/link';
import { getNegociarContent } from '@/lib/content';
import { useGSAPScroll, useGSAPParallax } from '@/hooks/useGSAP';

const featureIcons: Record<string, string> = {
  handshake: '/images/negociar/icons/rodadas.svg',
  store: '/images/negociar/icons/feira.svg',
  network: '/images/negociar/icons/networking.svg',
  partnership: '/images/negociar/icons/parcerias.svg',
};

interface NegociarSectionProps {
  cmsData?: { title?: string; description?: string; features?: any[]; benefits?: any[] };
}

export function Negociar({ cmsData }: NegociarSectionProps) {
  const jsonContent = getNegociarContent();
  const content = cmsData ? { ...jsonContent, ...cmsData } : jsonContent;
  const headerRef = useGSAPScroll<HTMLDivElement>({ animation: 'fadeUp', distance: 50, duration: 0.9 });
  const featuresRef = useGSAPScroll<HTMLDivElement>({ animation: 'fadeUp', children: true, stagger: 0.15 });
  const card1Ref = useGSAPScroll<HTMLDivElement>({ animation: 'fadeUp', distance: 50, duration: 0.9 });
  const card2Ref = useGSAPScroll<HTMLDivElement>({ animation: 'fadeUp', distance: 50, duration: 0.9, delay: 0.15 });
  const decorativeRef = useGSAPParallax<HTMLDivElement>(70);

  return (
    <section id="negociar" className="relative overflow-hidden bg-[#131415]">
      {/* Decorative vectors */}
      <div
        ref={decorativeRef}
        className="pointer-events-none absolute flex items-center justify-center"
        aria-hidden="true"
        style={{
          left: '-1505px',
          top: 'calc(100% + 652px)',
          width: '4422px',
          height: '4005px',
          transform: 'translateY(-50%)',
        }}
      >
        <div className="rotate-[75deg]">
          <img
            src="/images/hero-lines.svg"
            alt=""
            className="max-w-none"
            width={3146}
            height={3735}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1412px] px-6 py-[120px] lg:px-[50px]">
        {/* ─── Top: Title + Features ─── */}
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          {/* Left: Title + Description */}
          <div ref={headerRef} className="flex flex-col gap-[30px] lg:w-[537px] lg:shrink-0 opacity-0">
            <h2 className="font-heading text-[60px] font-normal leading-[1] text-[#FFF5EC] md:text-[80px] lg:text-[109px]">
              {content.title}
            </h2>
            <p className="font-just-sans text-lg text-[#FFF5EC]/50 md:text-xl">
              {content.description}
            </p>
          </div>

          {/* Right: Features List */}
          <div ref={featuresRef} className="flex flex-col p-5 lg:w-[694px]">
            {content.features.map((feature, index) => (
              <div key={index}>
                <div className="flex flex-col gap-[10px] py-5">
                  <div className="flex flex-col gap-[25px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featureIcons[feature.icon ?? ''] ?? ''}
                      alt=""
                      className="h-9 w-9"
                      aria-hidden="true"
                    />
                    <h3 className="font-heading text-[24px] font-bold leading-[30px] text-[#FFF5EC] md:text-[30px]">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="font-just-sans text-lg text-[#FFF5EC]/50 md:text-xl">
                    {feature.description}
                  </p>
                </div>
                {index < content.features.length - 1 && (
                  <div className="h-px w-full bg-[#FFF5EC]/10" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ─── Bottom: Two Cards ─── */}
        <div className="mt-[108px] flex flex-col gap-[36px] lg:flex-row lg:items-stretch">
          {/* Card: Produtores */}
          <div ref={card1Ref} className="flex flex-1 flex-col overflow-hidden rounded-[30px] border border-[#4D564D] lg:h-[941px] lg:rounded-[40px] opacity-0">
            <div className="relative min-h-[300px] flex-1">
              <Image
                src="/images/negociar/produtores.png"
                alt="Produtor com produtos frescos"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 688px"
              />
            </div>
            <div className="flex flex-col gap-[30px] bg-[#4D564D] p-8 md:p-[50px]">
              <div className="flex flex-col gap-[10px]">
                <p className="font-heading text-[24px] font-bold leading-[30px] text-[#FFF5EC]/50 md:text-[30px]">
                  Para
                </p>
                <p className="font-heading text-[50px] font-bold leading-[1.1] text-[#FFF5EC] md:text-[70px] md:leading-[30px]">
                  Produtores
                </p>
              </div>

              <div className="flex flex-col">
                {content.benefits[0].items.map((item: string, i: number) => (
                  <div key={i}>
                    <div className="h-px w-full bg-white/15" />
                    <div className="flex items-center gap-[10px] px-[5px] py-[7px]">
                      <svg
                        width="14"
                        height="10"
                        viewBox="0 0 14 10"
                        fill="none"
                        className="shrink-0"
                      >
                        <path
                          d="M1 5L5 9L13 1"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="font-just-sans text-lg text-white md:text-[24px]">
                        {item}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="h-px w-full bg-white/15" />
              </div>

              <Link
                href="/negociar"
                className="flex w-full items-center justify-center rounded-full bg-[#FFF5EC] p-[15px] font-just-sans text-base font-semibold text-[#131415] transition-colors hover:bg-[#FFF5EC]/90"
              >
                Sou produtor e quero expor
              </Link>
            </div>
          </div>

          {/* Card: Compradores */}
          <div ref={card2Ref} className="flex flex-1 flex-col overflow-hidden rounded-[30px] border border-[#4D564D] lg:h-[941px] lg:rounded-[40px] opacity-0">
            <div className="relative min-h-[300px] flex-1">
              <Image
                src="/images/negociar/compradores.png"
                alt="Comprador avaliando produtos"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 688px"
              />
            </div>
            <div className="flex flex-col gap-[30px] bg-[#131415] p-8 md:p-[50px]">
              <div className="flex flex-col gap-[10px]">
                <p className="font-heading text-[24px] font-bold leading-[30px] text-[#FFF5EC]/50 md:text-[30px]">
                  Para
                </p>
                <p className="font-heading text-[50px] font-bold leading-[1.1] text-[#FFF5EC] md:text-[70px] md:leading-[30px]">
                  Compradores
                </p>
              </div>

              <div className="flex flex-col">
                {content.benefits[1].items.map((item: string, i: number) => (
                  <div key={i}>
                    <div className="h-px w-full bg-white/15" />
                    <div className="flex items-center gap-[10px] px-[5px] py-[7px]">
                      <svg
                        width="14"
                        height="10"
                        viewBox="0 0 14 10"
                        fill="none"
                        className="shrink-0"
                      >
                        <path
                          d="M1 5L5 9L13 1"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="font-just-sans text-lg text-white md:text-[24px]">
                        {item}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="h-px w-full bg-white/15" />
              </div>

              <Link
                href="/ingressos"
                className="flex w-full items-center justify-center rounded-full bg-[#FFF5EC] p-[15px] font-just-sans text-base font-semibold text-[#131415] transition-colors hover:bg-[#FFF5EC]/90"
              >
                Sou visitante e quero comprar ingresso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
