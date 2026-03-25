'use client';

import Link from 'next/link';
import { useGSAPScroll } from '@/hooks/useGSAP';

interface OQueEIGProps { pageHome?: any; }
export function OQueEIG({ pageHome }: OQueEIGProps) {
  const containerRef = useGSAPScroll<HTMLDivElement>({ animation: 'scaleIn', duration: 0.9 });
  const diagramRef = useGSAPScroll<HTMLDivElement>({ animation: 'fadeLeft', distance: 50, duration: 0.8, delay: 0.2 });
  const textRef = useGSAPScroll<HTMLDivElement>({ animation: 'fadeRight', distance: 50, duration: 0.8, delay: 0.3 });

  return (
    <section className="bg-[#131415] px-6 py-16 md:px-[53px] md:py-24">
      <div
        ref={containerRef}
        className="relative mx-auto max-w-[1412px] overflow-hidden rounded-[15px] border border-[#956A47]/20 bg-[#131415] opacity-0"
      >
        {/* Decorative background vector */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <img
            src="/images/selo-ig-vector.svg"
            alt=""
            className="h-auto w-[280%] max-w-none rotate-[75deg] opacity-100"
          />
        </div>

        <div className="relative z-10 px-6 py-24 lg:px-[144px] lg:py-[175px]">
          <div className="mb-16 flex flex-col items-center gap-[18px] text-center lg:mb-[87px]">
            <p className="font-just-sans text-xl text-[#FFF5EC]">
              O que é
            </p>
            <h2 className="font-heading text-5xl font-normal text-[#956A47] md:text-7xl lg:text-[90px] lg:leading-[60px]">
              Indicação Geográfica?
            </h2>
          </div>

          <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-[84px]">
            {/* IG Diagram */}
            <div ref={diagramRef} className="relative shrink-0 opacity-0 w-full max-w-[460px]">
              <div className="relative h-[300px] w-[340px] sm:h-[350px] sm:w-[400px] md:h-[410px] md:w-[460px] origin-center mx-auto">
                {/* Outer circle */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: '86%',
                    height: '86%',
                    left: '3%',
                    top: '2%',
                    border: '2px solid #956A47',
                  }}
                />
                {/* Inner circle */}
                <div
                  className="absolute flex flex-col items-center justify-center rounded-full bg-[#956A47]"
                  style={{
                    width: '63%',
                    height: '63%',
                    left: '14%',
                    top: '14.5%',
                  }}
                >
                  <span className="font-heading text-[36px] sm:text-[48px] md:text-[60px] font-bold leading-[1] text-[#1C1F21]">
                    IG
                  </span>
                  <span className="text-center font-just-sans text-[13px] sm:text-[15px] md:text-[17px] leading-tight text-[#1C1F21]">
                    Indicação
                    <br />
                    Geográfica
                  </span>
                </div>
                {/* Badge: 53 produtos */}
                <div
                  className="absolute flex items-center justify-center rounded-full border border-[#956A47] bg-[#1C1F21] px-3 py-2 sm:px-4 sm:py-3"
                  style={{ left: '0%', top: '0%' }}
                >
                  <span className="font-heading text-sm sm:text-lg md:text-xl text-[#FFF5EC]">
                    53 produtos
                  </span>
                </div>
                {/* Badge: Único */}
                <div
                  className="absolute flex items-center justify-center rounded-full border border-[#956A47] bg-[#1C1F21] px-3 py-2 sm:px-4 sm:py-3"
                  style={{ right: '0%', top: '43%' }}
                >
                  <span className="font-heading text-sm sm:text-lg md:text-xl text-[#FFF5EC]">
                    Único
                  </span>
                </div>
                {/* Badge: Brasil */}
                <div
                  className="absolute flex items-center justify-center rounded-full border border-[#956A47] bg-[#1C1F21] px-3 py-2 sm:px-4 sm:py-3"
                  style={{ left: '2%', bottom: '0%' }}
                >
                  <span className="font-heading text-sm sm:text-lg md:text-xl text-[#FFF5EC]">
                    Brasil
                  </span>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div ref={textRef} className="flex max-w-[650px] flex-col gap-5 opacity-0">
              <p className="font-just-sans text-xl font-light leading-snug text-[#FFF5EC] md:text-[28px] md:leading-snug">
                A Indicação Geográfica (IG) é um{' '}
                <strong className="font-bold text-[#956A47]">
                  selo de qualidade
                </strong>{' '}
                que identifica produtos únicos, vinculados a uma região
                específica do Brasil.
              </p>
              <p className="font-just-sans text-base leading-relaxed text-[#FFF5EC]">
                É a <strong className="font-bold">garantia</strong> de que
                aquele produto carrega a história, o clima, o solo e o
                saber-fazer de um território.
              </p>
              <p className="font-just-sans text-sm leading-relaxed text-[#FFF5EC]">
                Vinhos da Serra Gaúcha, cacau de Rondônia, café do Cerrado
                Mineiro — cada produto com IG conta uma história de{' '}
                <strong className="font-bold text-[#956A47]">
                  tradição, qualidade e identidade cultural
                </strong>{' '}
                que não pode ser replicada em nenhum outro lugar do mundo.
              </p>
              <Link
                href="/conhecer#ig"
                className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-[#956A47] px-6 py-[15px] font-just-sans text-base font-semibold text-[#131415] transition-colors hover:bg-[#956A47]/90"
              >
                Saiba mais
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
