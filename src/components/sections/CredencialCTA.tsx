'use client';

import Link from 'next/link';
import { useGSAPScroll } from '@/hooks/useGSAP';

const beneficios = [
  {
    icon: 'content',
    title: 'Conteúdo exclusivo',
    description: 'Todas as palestras, painéis e debates com especialistas.',
  },
  {
    icon: 'business',
    title: 'Rodadas de negócios',
    description: 'Encontros B2B com produtores e compradores de todo o Brasil.',
  },
  {
    icon: 'gastro',
    title: 'Experiências gastronômicas',
    description: 'Degustações, aulas show e harmonizações com chefs renomados.',
  },
  {
    icon: 'opening',
    title: 'Coquetel de abertura',
    description: 'Jantar exclusivo com networking e produtos de origem selecionados.',
  },
];

interface CredencialCTAProps { pageHome?: any; }
export function CredencialCTA({ pageHome }: CredencialCTAProps) {
  const headerRef = useGSAPScroll<HTMLDivElement>({ animation: 'fadeUp', distance: 50, duration: 0.8 });
  const gridRef = useGSAPScroll<HTMLDivElement>({ animation: 'fadeUp', children: true, stagger: 0.12 });
  const ctaRef = useGSAPScroll<HTMLDivElement>({ animation: 'fadeUp', delay: 0.1 });

  return (
    <section className="relative bg-[#131415] py-16 md:py-24">
      <div className="mx-auto max-w-[1330px] px-4 md:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className="mb-12 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between md:mb-16 opacity-0"
        >
          <div className="lg:w-[500px] lg:shrink-0">
            <span className="mb-5 inline-block rounded-full border border-[#C9A962]/30 bg-[#C9A962]/10 px-4 py-1.5 font-just-sans text-sm font-medium uppercase tracking-wider text-[#C9A962]">
              Garanta sua vaga
            </span>
            <h2 className="font-heading text-3xl text-[#FFF5EC] leading-[1.1] md:text-4xl lg:text-5xl">
              Viva o Connection
              <br />
              <em className="italic text-[#C9A962]">por completo</em>
            </h2>
          </div>
          <div className="max-w-xl flex-1">
            <p className="font-just-sans text-lg leading-relaxed text-[#FFF5EC]/70">
              O Connection tem uma{' '}
              <strong className="font-bold text-[#FFF5EC]">área pública e gratuita</strong> com
              exposição na Rua Coberta. Mas a experiência completa — com conteúdo,
              degustações exclusivas e networking — é para{' '}
              <strong className="font-bold text-[#FFF5EC] underline">credenciados</strong>.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div
          ref={gridRef}
          className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5"
        >
          {beneficios.map((b, i) => (
            <div
              key={i}
              className="group flex h-[280px] flex-col justify-between rounded-[16px] border border-[#4D564D] bg-[#1C1F21] p-7 transition-colors hover:border-[#956A47]/40 md:h-[320px] md:p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#956A47]/10">
                <BenefitIcon name={b.icon} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-heading text-xl text-[#FFF5EC]">
                  {b.title}
                </h3>
                <p className="font-just-sans text-sm leading-relaxed text-[#FFF5EC]/60">
                  {b.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Row */}
        <div
          ref={ctaRef}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row opacity-0"
        >
          <Link
            href="/ingressos"
            className="inline-flex w-full sm:w-[280px] items-center justify-center rounded-full bg-[#C9A962] px-8 py-4 font-just-sans text-base font-semibold text-[#131415] transition-colors hover:bg-[#C9A962]/90"
          >
            Garantir minha credencial
          </Link>
          <Link
            href="#sobre"
            className="inline-flex w-full sm:w-[280px] items-center justify-center rounded-full border border-[#FFF5EC]/20 px-8 py-4 font-just-sans text-base font-semibold text-[#FFF5EC] transition-colors hover:bg-[#FFF5EC]/5"
          >
            O que está incluso?
          </Link>
        </div>
      </div>
    </section>
  );
}

function BenefitIcon({ name }: { name: string }) {
  const cls = 'w-6 h-6 text-[#C9A962]';

  switch (name) {
    case 'content':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
        </svg>
      );
    case 'business':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
      );
    case 'gastro':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      );
    case 'opening':
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      );
    default:
      return null;
  }
}
