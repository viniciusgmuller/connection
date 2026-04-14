import { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import { Button } from '@/components/ui/Button';
import { ScheduleView, type ScheduleEvent } from '@/components/sections/ScheduleView';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Programação | Connection Experience',
  description: 'Confira a programação completa do Connection Experience 2026.',
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

  const scheduleEvents: ScheduleEvent[] = events.map((evt: any) => ({
    id: String(evt.id),
    date: evt.date,
    startTime: evt.startTime || '',
    endTime: evt.endTime || undefined,
    title: evt.title || '',
    type: evt.type || 'special',
    speaker: evt.speaker || null,
    location: evt.location || undefined,
    description: evt.description || undefined,
  }));

  return (
    <div className="pt-24 bg-[#131415] min-h-screen">
      {/* Hero */}
      <section className="py-16 bg-[#131415]">
        <div className="mx-auto max-w-[1221px] px-6 lg:px-[50px] text-center">
          <h1 className="font-heading text-[56px] font-normal leading-[1] text-[#FFF5EC] md:text-[80px] lg:text-[96px]">
            {(pageData as any).hero?.title || 'Programação'}
          </h1>
          <p className="mx-auto mt-6 max-w-[640px] font-just-sans text-lg leading-normal text-[#FFF5EC]/60 lg:text-xl">
            {(pageData as any).hero?.subtitle || 'Quatro dias intensos de conhecimento, experiências e oportunidades de negócio'}
          </p>
        </div>
      </section>

      {/* Schedule */}
      <section className="pb-16 bg-[#131415]">
        <div className="mx-auto max-w-[1221px] px-6 lg:px-[50px]">
          <ScheduleView events={scheduleEvents} />
        </div>
      </section>

      {/* Note */}
      <section className="py-10 bg-[#131415]">
        <div className="mx-auto max-w-[1221px] px-6 lg:px-[50px] text-center">
          <p className="font-just-sans text-sm text-[#FFF5EC]/40">
            {(pageData as any).disclaimer?.text || '* Programação sujeita a alterações'}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gold">
        <div className="mx-auto max-w-[1221px] px-6 lg:px-[50px] text-center">
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
