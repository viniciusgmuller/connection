import { Metadata } from 'next';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Testimonial } from '@/components/ui/Testimonial';
import { getNegociarContent, getTestimonialsByAxis } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Negociar | Connection Experience',
  description: 'Conecte-se com oportunidades de negócio, participe de rodadas de negociação e estabeleça parcerias estratégicas com produtores e compradores.',
};

export default function NegociarPage() {
  const content = getNegociarContent();
  const testimonials = getTestimonialsByAxis('negociar');

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <SectionTitle
            tag="EIXO 3"
            title={content.title}
            subtitle={content.description}
            align="center"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-bg-darker">
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

      {/* Benefits Section */}
      <section className="py-20 bg-bg-brown">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Benefícios para você"
            align="center"
          />
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {content.benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-bg-dark/50 border border-gold/10"
              >
                <h3 className="font-heading text-2xl text-gold mb-6">{benefit.title}</h3>
                <ul className="space-y-4">
                  {benefit.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-text-cream">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-bg-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Como funcionam as Rodadas de Negócio"
            align="center"
          />
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold flex items-center justify-center">
                <span className="font-heading text-2xl text-bg-darker">1</span>
              </div>
              <h4 className="font-heading text-lg text-text-light mb-2">Inscrição</h4>
              <p className="text-text-muted text-sm">Cadastre-se como produtor ou comprador</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold flex items-center justify-center">
                <span className="font-heading text-2xl text-bg-darker">2</span>
              </div>
              <h4 className="font-heading text-lg text-text-light mb-2">Matchmaking</h4>
              <p className="text-text-muted text-sm">Nossa equipe cruza interesses e perfis</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold flex items-center justify-center">
                <span className="font-heading text-2xl text-bg-darker">3</span>
              </div>
              <h4 className="font-heading text-lg text-text-light mb-2">Agenda</h4>
              <p className="text-text-muted text-sm">Receba sua agenda de reuniões personalizada</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold flex items-center justify-center">
                <span className="font-heading text-2xl text-bg-darker">4</span>
              </div>
              <h4 className="font-heading text-lg text-text-light mb-2">Negociação</h4>
              <p className="text-text-muted text-sm">Encontre parceiros e feche negócios</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-bg-darker">
          <div className="container mx-auto px-4 lg:px-8">
            <SectionTitle
              title="Resultados reais"
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
          <h2 className="font-heading text-4xl text-bg-darker mb-4">
            Pronto para expandir seus negócios?
          </h2>
          <p className="text-bg-dark/80 text-lg mb-8 max-w-xl mx-auto">
            Seja você produtor ou comprador, o Connection Experience é o lugar para fazer bons negócios.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/ingressos" variant="secondary" size="lg" className="bg-bg-darker text-gold">
              Quero participar
            </Button>
            <Button href="mailto:negocios@connectionexperience.com.br" variant="ghost" size="lg" className="text-bg-darker border-2 border-bg-darker/20">
              Falar com nossa equipe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureIcon({ name }: { name?: string }) {
  const iconClass = "w-7 h-7 text-gold";
  switch (name) {
    case 'handshake':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>;
    case 'store':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
    case 'network':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>;
    case 'partnership':
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
    default:
      return <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
  }
}
