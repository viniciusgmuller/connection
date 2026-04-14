'use client';

import Link from 'next/link';
import { useGSAPScroll, useGSAPParallax } from '@/hooks/useGSAP';

interface CTAProps { pageHome?: any; }
export function CTA({ pageHome }: CTAProps) {
  const cms = pageHome?.ctaFinal;
  const ctaHeadline = cms?.headline || 'Garante sua presença na maior vitrine de produtos com Indicação Geográfica do Brasil';
  const ctaSubtitle = cms?.subtitle || 'Conheça produtos únicos certificados, conecte-se com produtores e descubra oportunidades de negócio.';
  const cmsButtons = cms?.buttons;
  const contentRef = useGSAPScroll<HTMLDivElement>({ animation: 'scaleIn', duration: 1 });
  const headlineRef = useGSAPScroll<HTMLHeadingElement>({ animation: 'fadeUp', distance: 40, duration: 0.9, delay: 0.1 });
  const subtitleRef = useGSAPScroll<HTMLParagraphElement>({ animation: 'fadeUp', distance: 30, delay: 0.3 });
  const buttonsRef = useGSAPScroll<HTMLDivElement>({ animation: 'fadeUp', distance: 30, delay: 0.45 });
  const leftSvgRef = useGSAPParallax<HTMLImageElement>(50);
  const rightSvgRef = useGSAPParallax<HTMLImageElement>(35);

  return (
    <section className="relative overflow-hidden bg-[#281b15] py-32 md:py-40 lg:py-48">
      {/* Decorative organic SVG — upper left */}
      <img
        ref={leftSvgRef}
        src="/images/cta/organic-lines-left.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute h-auto max-w-none -translate-x-1/2 -translate-y-1/2"
        style={{
          left: 'calc(43.75% + 43px)',
          top: 'calc(37.5% + 15px)',
          width: '2602px',
          height: '2002px',
        }}
      />

      {/* Decorative organic SVG — lower right */}
      <img
        ref={rightSvgRef}
        src="/images/cta/organic-lines-right.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute h-auto max-w-none -translate-x-1/2 -translate-y-1/2"
        style={{
          left: 'calc(56.25% + 50px)',
          top: 'calc(58.33% - 11px)',
          width: '1801px',
          height: '2424px',
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex max-w-[997px] flex-col items-center gap-[75px] px-6 opacity-0"
      >
        {/* Headline */}
        <h2 ref={headlineRef} className="text-center font-heading text-[40px] font-normal leading-[1.02] text-[#FFF5EC] sm:text-[55px] md:text-[65px] lg:text-[78.85px] lg:leading-[80px] opacity-0">
          {ctaHeadline}
        </h2>

        {/* Subtitle */}
        <p ref={subtitleRef} className="max-w-[700px] text-center font-just-sans text-lg text-[#FFF5EC]/90 md:text-[24px] md:leading-normal opacity-0">
          {ctaSubtitle}
        </p>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="flex w-full max-w-[700px] flex-col items-center gap-[18px] sm:flex-row opacity-0">
          {(cmsButtons && cmsButtons.length > 0) ? cmsButtons.map((btn: any, i: number) => (
            <Link
              key={i}
              href={btn.link || '/ingressos'}
              className={`flex w-full sm:w-[280px] md:w-[330px] items-center justify-center rounded-full p-[20px] font-just-sans text-lg font-semibold transition-colors md:p-[25px] md:text-[24px] ${
                btn.variant === 'outline'
                  ? 'border border-[#FFF5EC] text-[#FFF5EC] hover:bg-[#FFF5EC]/10'
                  : 'bg-[#FFF5EC] text-[#3D2E1E] hover:bg-[#FFF5EC]/90'
              }`}
            >
              {btn.text}
            </Link>
          )) : (
            <Link href="/ingressos" className="flex w-full sm:w-[280px] md:w-[330px] items-center justify-center rounded-full bg-[#FFF5EC] p-[20px] font-just-sans text-lg font-semibold text-[#3D2E1E] transition-colors hover:bg-[#FFF5EC]/90 md:p-[25px] md:text-[24px]">
              Garantir meu ingresso
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
