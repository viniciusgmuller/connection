import { Metadata } from 'next';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card, ProductCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Testimonial } from '@/components/ui/Testimonial';
import { getExperimentarContent, getTestimonialsByAxis } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Experimentar | Connection Experience',
  description: 'Viva experiências sensoriais únicas com oficinas práticas, degustações exclusivas e contato direto com produtores de todo o Brasil.',
};

export default function ExperimentarPage() {
  const content = getExperimentarContent();
  const testimonials = getTestimonialsByAxis('experimentar');

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-bg-green relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, #C9A962 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            tag="EIXO 2"
            title={content.title}
            subtitle={content.description}
            align="center"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-bg-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {content.features.map((feature, index) => (
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

      {/* Products Grid */}
      <section className="py-20 bg-bg-darker">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Produtos com Indicação Geográfica"
            subtitle="Conheça alguns dos produtos únicos que você poderá experimentar"
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.products.map((product) => (
              <div
                key={product.id}
                className="p-6 rounded-xl bg-bg-dark border border-gold/10 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                  <span className="text-4xl">🍃</span>
                </div>
                <div className="text-center">
                  <h3 className="font-heading text-xl text-text-light mb-1">{product.name}</h3>
                  <p className="text-gold text-sm mb-2">{product.origin}, {product.state}</p>
                  <p className="text-text-cream text-sm">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Preview */}
      <section className="py-20 bg-bg-brown">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Experiências Exclusivas"
            subtitle="Momentos únicos que você só encontra no Connection Experience"
            align="center"
          />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-bg-dark/30 border border-gold/10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold flex items-center justify-center">
                <svg className="w-8 h-8 text-bg-darker" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 8v1" />
                </svg>
              </div>
              <h3 className="font-heading text-xl text-text-light mb-2">Aulas Show</h3>
              <p className="text-text-cream text-sm">Chefs renomados preparam pratos utilizando ingredientes IG ao vivo</p>
            </div>
            <div className="text-center p-8 rounded-xl bg-bg-dark/30 border border-gold/10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold flex items-center justify-center">
                <svg className="w-8 h-8 text-bg-darker" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19v-7m0 0c-2.5 0-4.5-2-4.5-4.5 0-1 .167-2 .5-3h8c.333 1 .5 2 .5 3 0 2.5-2 4.5-4.5 4.5zm-3 7h6" />
                </svg>
              </div>
              <h3 className="font-heading text-xl text-text-light mb-2">Degustações</h3>
              <p className="text-text-cream text-sm">Prove vinhos, cafés, queijos e cacau diretamente dos produtores</p>
            </div>
            <div className="text-center p-8 rounded-xl bg-bg-dark/30 border border-gold/10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold flex items-center justify-center">
                <svg className="w-8 h-8 text-bg-darker" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl text-text-light mb-2">Encontros</h3>
              <p className="text-text-cream text-sm">Conheça as histórias por trás dos produtos e seus produtores</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-bg-dark">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionTitle
              title="Experiências reais"
              align="center"
            />
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((t) => (
                <Testimonial
                  key={t.id}
                  name={t.name}
                  role={t.role}
                  company={t.company}
                  quote={t.quote}
                  image={t.image}
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
            Pronto para viver experiências únicas?
          </h2>
          <Button href="/ingressos" variant="secondary" size="lg" className="bg-bg-darker text-gold">
            Garantir meu ingresso
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
