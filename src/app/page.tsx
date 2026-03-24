import { Hero } from '@/components/sections/Hero';
import { SeloIG } from '@/components/sections/SeloIG';
import { CredencialCTA } from '@/components/sections/CredencialCTA';
import { Experimentar } from '@/components/sections/Experimentar';
import { Negociar } from '@/components/sections/Negociar';
import { OQueEIG } from '@/components/sections/OQueEIG';
import { CTA } from '@/components/sections/CTA';
import { InfoPraticas } from '@/components/sections/InfoPraticas';
import { Parceiros } from '@/components/sections/Parceiros';

export default function Home() {
  return (
    <>
      <Hero />
      <SeloIG />
      <CredencialCTA />
      <Experimentar />
      <Negociar />
      <OQueEIG />
      <CTA />
      <InfoPraticas />
      <Parceiros />
    </>
  );
}
