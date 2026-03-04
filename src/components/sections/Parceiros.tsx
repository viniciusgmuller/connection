'use client';

import Image from 'next/image';
import { useGSAPScroll } from '@/hooks/useGSAP';

type Tier = 1 | 2 | 3;

interface Partner {
  label: string;
  logos: { src: string; alt: string }[];
  tier: Tier;
}

const partners: Partner[] = [
  {
    label: 'Correalização',
    logos: [{ src: '/images/parceiros/sebrae.png', alt: 'SEBRAE' }],
    tier: 1,
  },
  {
    label: 'Correalização',
    logos: [
      {
        src: '/images/parceiros/gramado.png',
        alt: 'Prefeitura de Gramado - Secretaria de Turismo',
      },
    ],
    tier: 1,
  },
  {
    label: 'Realização',
    logos: [
      {
        src: '/images/parceiros/rossi-zorzanello.png',
        alt: 'Rossi & Zorzanello Eventos e Empreendimentos',
      },
    ],
    tier: 1,
  },
  {
    label: 'Estado Anfitrião',
    logos: [
      {
        src: '/images/parceiros/rio-grande-do-sul.png',
        alt: 'Governo do Estado do Rio Grande do Sul',
      },
    ],
    tier: 2,
  },
  {
    label: 'Apoio',
    logos: [{ src: '/images/parceiros/sicredi.png', alt: 'Sicredi Pioneira' }],
    tier: 2,
  },
  {
    label: 'Hotel Oficial',
    logos: [
      {
        src: '/images/parceiros/laghetto.png',
        alt: 'Laghetto Hotéis, Resorts & Experiências',
      },
    ],
    tier: 3,
  },
  {
    label: 'Chocolate Oficial',
    logos: [
      {
        src: '/images/parceiros/chocolataria-gramado.png',
        alt: 'Chocolataria Gramado',
      },
    ],
    tier: 3,
  },
  {
    label: 'Transporte Terrestre Oficial',
    logos: [{ src: '/images/parceiros/turistur.png', alt: 'Turistur Turismo' }],
    tier: 3,
  },
  {
    label: 'Parceria',
    logos: [
      { src: '/images/parceiros/skyteam.png', alt: 'SKYTEAM' },
      {
        src: '/images/parceiros/multiservicos.png',
        alt: 'MultiServiços Operadora',
      },
    ],
    tier: 3,
  },
];

/* Size classes per tier */
const tierStyles: Record<Tier, { card: string; inner: string; label: string }> = {
  1: {
    card: 'w-full sm:w-[320px] md:w-[440px]',
    inner: 'h-[140px] w-[80%] sm:h-[170px] sm:w-[280px] md:h-[240px] md:w-[400px]',
    label: 'text-[20px] sm:text-[22px] md:text-[32px]',
  },
  2: {
    card: 'w-full sm:w-[280px] md:w-[379px]',
    inner: 'h-[120px] w-[80%] sm:h-[140px] sm:w-[240px] md:h-[204px] md:w-[339px]',
    label: 'text-[18px] sm:text-[20px] md:text-[28px]',
  },
  3: {
    card: 'w-full sm:w-[220px] md:w-[290px]',
    inner: 'h-[100px] w-[70%] sm:h-[110px] sm:w-[180px] md:h-[150px] md:w-[250px]',
    label: 'text-[16px] sm:text-[18px] md:text-[24px]',
  },
};

export function Parceiros() {
  const listRef = useGSAPScroll<HTMLDivElement>({
    animation: 'fadeUp',
    children: true,
    stagger: 0.1,
    distance: 40,
  });

  return (
    <section className="bg-[#131415] px-6 py-[103px] lg:px-0">
      <div ref={listRef} className="mx-auto flex max-w-[1113px] flex-col gap-[37px]">
        {partners.map((partner, i) => {
          const styles = tierStyles[partner.tier];
          return (
            <div
              key={`${partner.label}-${i}`}
              className="flex flex-col items-start border-b border-[#4D564D] pb-5"
            >
              <div className="flex w-full flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                {/* Label */}
                <p
                  className={`font-just-sans font-light text-[#FFF5EC] ${styles.label}`}
                >
                  {partner.label}
                </p>

                {/* Logo cards */}
                <div className="flex flex-wrap gap-6 sm:gap-[50px]">
                  {partner.logos.map((logo) => (
                    <div
                      key={logo.alt}
                      className={`flex items-center justify-center rounded-[15px] bg-white ${styles.card}`}
                    >
                      <div className={`relative ${styles.inner}`}>
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
