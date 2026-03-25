import { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Testimonial } from '@/components/ui/Testimonial';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Experimentar | Connection Experience',
  description: 'Viva experiências sensoriais únicas com oficinas práticas, degustações exclusivas e contato direto com produtores de todo o Brasil.',
};

export default async function ExperimentarPage() {
  const payload = await getPayload({ config });

  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 100,
    depth: 1,
  });

  const { docs: testimonials } = await payload.find({
    collection: 'testimonials',
    where: { axis: { equals: 'experimentar' } },
    limit: 10,
  });

  const { docs: categories } = await payload.find({
    collection: 'product-categories',
    limit: 20,
  });

  const pageData = await payload.findGlobal({ slug: 'page-experimentar' });
  const features = (pageData.features as any)?.items || [];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-bg-green relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #C9A962 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            tag={pageData.hero?.subtitle || "EIXO 2"}
            title={pageData.hero?.title || "Experimentar"}
            subtitle={pageData.hero?.description || "Viva experiências sensoriais únicas"}
            align="center"
          />
        </div>
      </section>

      {/* Features Section */}
      {features.length > 0 && (
        <section className="py-20 bg-bg-dark">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature: any, index: number) => (
                <Card key={index} variant="bordered">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <FeatureIcon name={feature.icon} />
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl text-text-light mb-2">{feature.title}</h3>
                      <p className="text-text-cream">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      {products.length > 0 && (
        <section className="py-20 bg-bg-darker">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionTitle
              title={pageData.productsSection?.title || "Produtos com Indicação Geográfica"}
              subtitle={pageData.productsSection?.subtitle || "Conheça alguns dos produtos únicos que você poderá experimentar"}
              align="center"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => {
                const catName = typeof product.category === 'object' && product.category !== null
                  ? (product.category as any).name : '';
                return (
                  <div
                    key={product.id}
                    className="p-6 rounded-xl bg-bg-dark border border-gold/10 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="text-center">
                      <h3 className="font-heading text-xl text-text-light mb-1">{product.name}</h3>
                      <p className="text-gold text-sm mb-1">{product.origin}, {product.state}</p>
                      {catName && <p className="text-text-muted text-xs mb-2">{catName}</p>}
                      <p className="text-text-cream text-sm">{product.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-bg-dark">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionTitle
              title={pageData.testimonialsSection?.title || "Experiências reais"}
              align="center"
            />
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((t) => (
                <Testimonial
                  key={t.id}
                  name={t.name}
                  role={t.role || ''}
                  company={t.company || ''}
                  quote={t.quote}
                  image=""
                  variant="featured"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gold">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading text-4xl text-bg-darker mb-6">
            {pageData.cta?.headline || "Pronto para viver experiências únicas?"}
          </h2>
          <Button href={pageData.cta?.buttonLink || "/ingressos"} variant="secondary" size="lg" className="bg-bg-darker text-gold">
            {pageData.cta?.buttonText || "Garantir meu ingresso"}
          </Button>
        </div>
      </section>
    </div>
  );
}

function FeatureIcon({ name }: { name?: string }) {
  const iconClass = "w-7 h-7 text-gold";
  switch (name) {
    case 'chef':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
    case 'wine':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19v-7m0 0c-2.5 0-4.5-2-4.5-4.5 0-1 .167-2 .5-3h8c.333 1 .5 2 .5 3 0 2.5-2 4.5-4.5 4.5zm-3 7h6" /></svg>;
    case 'coffee':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2a4 4 0 004 4h6a4 4 0 004-4zm0 0h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2" /></svg>;
    case 'people':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    default:
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
  }
}
