import { getPayload } from 'payload';
import config from '@payload-config';
import { Hero } from '@/components/sections/Hero';
import { SeloIG } from '@/components/sections/SeloIG';
import { CredencialCTA } from '@/components/sections/CredencialCTA';
import { Experimentar } from '@/components/sections/Experimentar';
import { Negociar } from '@/components/sections/Negociar';
import { OQueEIG } from '@/components/sections/OQueEIG';
import { CTA } from '@/components/sections/CTA';
import { InfoPraticas } from '@/components/sections/InfoPraticas';
import { Parceiros } from '@/components/sections/Parceiros';
import { HeroVideo } from '@/components/sections/HeroVideo';
import { EventGallery } from '@/components/sections/EventGallery';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const payload = await getPayload({ config });

  const [siteSettings, pageHome, partners, scheduleEvents, speakers] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.findGlobal({ slug: 'page-home' }),
    payload.find({ collection: 'partners', sort: 'order', limit: 50, depth: 2 }),
    payload.find({ collection: 'schedule-events', sort: 'date', limit: 200, depth: 1 }),
    payload.find({ collection: 'speakers', sort: 'order', limit: 50, depth: 1 }),
  ]);

  // Attach schedule and event phase to pageHome for SeloIG > ConhecaBlock
  const pageHomeWithSchedule = {
    ...pageHome,
    schedulePreview: scheduleEvents.docs,
    eventPhase: siteSettings.event?.phase || 'pre-event',
  };

  return (
    <>
      <Hero siteSettings={siteSettings} pageHome={pageHomeWithSchedule} speakers={speakers.docs as any} />
      <HeroVideo videoUrl={pageHomeWithSchedule?.hero?.videoUrl} />
      <SeloIG pageHome={pageHomeWithSchedule} />
      <CredencialCTA pageHome={pageHomeWithSchedule} />
      <Experimentar />
      <Negociar />
      <OQueEIG pageHome={pageHomeWithSchedule} />
      <CTA pageHome={pageHomeWithSchedule} />
      <InfoPraticas siteSettings={siteSettings} pageHome={pageHomeWithSchedule} />
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
