import { getPayload } from 'payload';
import config from '@payload-config';
import { Hero } from '@/components/sections/Hero';
import { SeloIG } from '@/components/sections/SeloIG';
import { CredencialCTA } from '@/components/sections/CredencialCTA';
import { Experimentar } from '@/components/sections/Experimentar';
import { OQueEIG } from '@/components/sections/OQueEIG';
import { CTA } from '@/components/sections/CTA';
import { InfoPraticas } from '@/components/sections/InfoPraticas';
import { Parceiros } from '@/components/sections/Parceiros';
import { HeroVideo } from '@/components/sections/HeroVideo';
import { EventGallery } from '@/components/sections/EventGallery';
import { SpeakersGrid } from '@/components/sections/SpeakersGrid';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const payload = await getPayload({ config });

  const [siteSettings, pageHome, partners, scheduleEvents, speakers, pageProgramacao] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.findGlobal({ slug: 'page-home' }),
    payload.find({ collection: 'partners', sort: 'order', limit: 50, depth: 2 }),
    payload.find({ collection: 'schedule-events', sort: 'date', limit: 200, depth: 1 }),
    payload.find({ collection: 'speakers', sort: 'order', limit: 50, depth: 1 }),
    payload.findGlobal({ slug: 'page-programacao' }),
  ]);

  // Attach schedule and event phase to pageHome for SeloIG > ConhecaBlock
  const pageHomeWithSchedule: any = {
    ...pageHome,
    schedulePreview: scheduleEvents.docs,
    eventPhase: siteSettings.event?.phase || 'pre-event',
    scheduleHiddenTypes: (pageProgramacao as any).hiddenTypes || [],
  };

  const speakersTag = pageHomeWithSchedule?.speakers?.tag || 'Confirmados';
  const speakersTitle = pageHomeWithSchedule?.speakers?.title || 'Palestrantes';

  return (
    <>
      <Hero siteSettings={siteSettings} pageHome={pageHomeWithSchedule} />
      <HeroVideo videoUrl={pageHomeWithSchedule?.hero?.videoUrl} />
      <Experimentar />
      {speakers.docs.length > 0 && (
        <section className="bg-[#131415] px-4 md:px-5 py-16 md:py-24">
          <div className="mx-auto max-w-[1450px] rounded-[15px] overflow-hidden bg-[#131415] p-8 md:p-12 lg:p-16">
            <SpeakersGrid speakers={speakers.docs as any} tag={speakersTag} title={speakersTitle} />
          </div>
        </section>
      )}
      <OQueEIG pageHome={pageHomeWithSchedule} />
      <CredencialCTA pageHome={pageHomeWithSchedule} />
      <CTA pageHome={pageHomeWithSchedule} />
      <InfoPraticas siteSettings={siteSettings} pageHome={pageHomeWithSchedule} />
      <SeloIG pageHome={pageHomeWithSchedule} />
      <EventGallery
        title={pageHomeWithSchedule?.eventGallery?.title}
        subtitle={pageHomeWithSchedule?.eventGallery?.subtitle}
        images={(pageHomeWithSchedule?.eventGallery?.images as any[])?.map((item: any) => ({
          image: typeof item.image === 'object' ? item.image : null,
          caption: item.caption,
        })) || []}
      />
      <Parceiros partners={partners.docs} />
    </>
  );
}
