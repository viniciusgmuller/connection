import { Metadata } from 'next';
import Image from 'next/image';
import { getPayload } from 'payload';
import config from '@payload-config';
import { SectionTitle } from '@/components/ui/SectionTitle';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Experiências | Connection Experience',
  description:
    'Conheça os parques, parceiros e experiências que fazem parte do Connection Experience.',
};

export default async function ExperienciasPage() {
  const payload = await getPayload({ config });

  const { docs: experiences } = await payload.find({
    collection: 'experiences',
    sort: 'order',
    limit: 50,
    depth: 1,
  });

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-bg-brown relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg
            className="absolute right-0 top-0 h-full w-1/2"
            viewBox="0 0 400 800"
            fill="none"
          >
            <path
              d="M100 0C200 200 300 400 200 600C100 800 0 800 0 800"
              stroke="#C9A962"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M150 0C250 200 350 400 250 600C150 800 50 800 50 800"
              stroke="#C9A962"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            title="Parques, Parceiros e Experiências"
            subtitle="Conheça os espaços e empresas que tornam o Connection Experience uma vivência inesquecível"
            align="center"
          />
        </div>
      </section>

      {/* Grid de Experiências */}
      <section className="py-20 bg-bg-dark">
        <div className="container mx-auto px-4 lg:px-8">
          {experiences.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {experiences.map((exp: any) => {
                const logo =
                  typeof exp.logo === 'object' && exp.logo !== null
                    ? exp.logo
                    : null;
                const logoSrc = logo?.filename
                  ? `/media/${encodeURIComponent(logo.filename)}`
                  : '';

                return (
                  <a
                    key={exp.id}
                    href={exp.website || undefined}
                    target={exp.website ? '_blank' : undefined}
                    rel={exp.website ? 'noopener noreferrer' : undefined}
                    className="group flex flex-col rounded-2xl border border-[#FFF5EC]/10 bg-[#1C1F21] overflow-hidden hover:border-[#C9A962]/40 transition-colors"
                  >
                    {/* Logo */}
                    <div className="flex items-center justify-center bg-white p-8 h-[200px]">
                      {logoSrc ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={logoSrc}
                            alt={exp.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <span className="text-[#131415] font-just-sans text-lg font-semibold">
                          {exp.name}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-heading text-xl text-text-light mb-2">
                        {exp.name}
                      </h3>
                      {exp.description && (
                        <p className="text-text-cream text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                      {exp.website && (
                        <span className="mt-auto pt-4 text-[#C9A962] text-sm font-medium group-hover:underline">
                          Visitar site &rarr;
                        </span>
                      )}
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-cream text-lg">
                Em breve, novos parques e experiências serão anunciados.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
