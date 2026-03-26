import { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Programação | Connection Experience',
  description: 'Confira a programação completa do Connection Experience 2026.',
};

const typeColors = {
  palestra: 'gold',
  workshop: 'green',
  networking: 'blue',
  break: 'default',
  special: 'orange',
} as const;

const typeLabels: Record<string, string> = {
  palestra: 'Palestra',
  workshop: 'Workshop',
  networking: 'Networking',
  break: 'Intervalo',
  special: 'Especial',
};

const dayNames: Record<number, string> = {
  0: 'Domingo', 1: 'Segunda-feira', 2: 'Terça-feira',
  3: 'Quarta-feira', 4: 'Quinta-feira', 5: 'Sexta-feira', 6: 'Sábado',
};

export default async function ProgramacaoPage() {
  const payload = await getPayload({ config });

  const pageData = await payload.findGlobal({ slug: 'page-programacao' });

  const { docs: events } = await payload.find({
    collection: 'schedule-events',
    sort: 'date',
    limit: 200,
    depth: 1,
  });

  // Group events by date
  const grouped = new Map<string, typeof events>();
  for (const evt of events) {
    const dateKey = evt.date as string;
    if (!grouped.has(dateKey)) grouped.set(dateKey, []);
    grouped.get(dateKey)!.push(evt);
  }

  // Sort events within each day by startTime
  for (const dayEvents of grouped.values()) {
    dayEvents.sort((a, b) => (a.startTime as string).localeCompare(b.startTime as string));
  }

  const days = Array.from(grouped.entries()).map(([dateStr, dayEvents]) => {
    const d = new Date(dateStr);
    return {
      dayName: dayNames[d.getUTCDay()] || '',
      dateLabel: d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', timeZone: 'UTC' }),
      events: dayEvents,
    };
  });

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-bg-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title={pageData.hero?.title || "Programação"}
            subtitle={pageData.hero?.subtitle || "Quatro dias intensos de conhecimento, experiências e oportunidades de negócio"}
            align="center"
          />
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {Object.entries(typeLabels).filter(([k]) => k !== 'break').map(([type, label]) => (
              <div key={type} className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${
                  type === 'palestra' ? 'bg-gold' :
                  type === 'workshop' ? 'bg-accent-green' :
                  type === 'networking' ? 'bg-accent-blue' : 'bg-accent-orange'
                }`}></span>
                <span className="text-text-muted text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16 bg-bg-darker">
        <div className="container mx-auto px-4 lg:px-8">
          {days.length === 0 ? (
            <p className="text-center text-text-muted">Programação em breve.</p>
          ) : (
            <div className="space-y-16">
              {days.map((day, dayIndex) => (
                <div key={dayIndex}>
                  <div className="sticky top-20 z-10 bg-bg-darker py-4 mb-8 border-b border-gold/20">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center">
                        <span className="font-heading text-xl text-bg-darker">{dayIndex + 1}</span>
                      </div>
                      <div>
                        <h2 className="font-heading text-2xl text-text-light">{day.dayName}</h2>
                        <p className="text-gold">{day.dateLabel}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {day.events.map((event) => {
                      const evtType = (event.type as string) || 'special';
                      const speaker = typeof event.speaker === 'object' && event.speaker !== null
                        ? (event.speaker as any).name
                        : null;

                      return (
                        <div
                          key={event.id}
                          className="flex gap-4 p-4 rounded-xl bg-bg-dark border border-gold/10 hover:border-gold/30 transition-colors"
                        >
                          <div className="w-16 shrink-0 text-center">
                            <span className="font-heading text-lg text-gold">{event.startTime}</span>
                          </div>
                          <div className="w-px bg-gold/20 relative">
                            <div className={`absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 rounded-full ${
                              evtType === 'palestra' ? 'bg-gold' :
                              evtType === 'workshop' ? 'bg-accent-green' :
                              evtType === 'networking' ? 'bg-accent-blue' :
                              evtType === 'special' ? 'bg-accent-orange' : 'bg-text-muted'
                            }`}></div>
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                              <h3 className="font-heading text-lg text-text-light">{event.title}</h3>
                              <Tag variant={typeColors[evtType as keyof typeof typeColors] || 'default'} size="sm">
                                {typeLabels[evtType] || evtType}
                              </Tag>
                            </div>
                            {speaker && <p className="text-gold text-sm mb-1">com {speaker}</p>}
                            {event.location && (
                              <p className="text-text-muted text-sm flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {event.location}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Note */}
      <section className="py-12 bg-bg-brown">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-text-cream text-sm">
            {pageData.disclaimer?.text || '* Programação sujeita a alterações'}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gold">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading text-4xl text-bg-darker mb-6">
            Não perca nenhum momento
          </h2>
          <Button href="/ingressos" variant="secondary" size="lg" className="bg-bg-darker text-gold">
            Garantir meu ingresso
          </Button>
        </div>
      </section>
    </div>
  );
}
