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

export const dynamic = 'force-dynamic';

export default async function Home() {
  const payload = await getPayload({ config });

  const [siteSettings, pageHome, partners] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.findGlobal({ slug: 'page-home' }),
    payload.find({ collection: 'partners', sort: 'order', limit: 50, depth: 2 }),
  ]);

  return (
    <>
      <Hero siteSettings={siteSettings} pageHome={pageHome} />
      <SeloIG pageHome={pageHome} />
      <CredencialCTA pageHome={pageHome} />
      <Experimentar />
      <Negociar />
      <OQueEIG pageHome={pageHome} />
      <CTA pageHome={pageHome} />
      <InfoPraticas siteSettings={siteSettings} pageHome={pageHome} />
      <Parceiros partners={partners.docs} />
    </>
  );
}
