import { Metadata } from 'next';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Ingressos | Connection Experience',
  description: 'Garanta seu ingresso para o Connection Experience 2026 - A maior vitrine de produtos com Indicação Geográfica do Brasil.',
};

const tickets = [
  {
    id: 'day-pass',
    name: 'Day Pass',
    price: 290,
    description: 'Acesso a um dia do evento',
    features: [
      'Acesso às palestras do dia',
      'Acesso à feira de expositores',
      'Acesso às degustações',
      'Material do evento',
      'Coffee break incluso',
    ],
    available: true,
    highlighted: false,
  },
  {
    id: 'full-pass',
    name: 'Full Pass',
    price: 690,
    originalPrice: 890,
    description: 'Acesso completo aos 3 dias',
    features: [
      'Acesso total aos 3 dias',
      'Todas as palestras e painéis',
      'Workshops exclusivos',
      'Rodadas de negócio (mediante inscrição)',
      'Degustações guiadas',
      'Kit participante completo',
      'Acesso à área VIP',
      'Almoços inclusos',
    ],
    available: true,
    highlighted: true,
  },
  {
    id: 'vip',
    name: 'VIP Experience',
    price: 1490,
    description: 'Experiência premium exclusiva',
    features: [
      'Todos os benefícios do Full Pass',
      'Acesso prioritário às atividades',
      'Jantar de gala incluso',
      'Meet & greet com palestrantes',
      'Lounge VIP com open bar',
      'Transfer hotel-evento',
      'Concierge dedicado',
      'Brindes exclusivos',
    ],
    available: true,
    highlighted: false,
  },
];

export default function IngressosPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-bg-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Ingressos"
            subtitle="Escolha a experiência ideal para você e garanta sua presença no maior evento de Indicações Geográficas do Brasil"
            align="center"
          />
        </div>
      </section>

      {/* Tickets */}
      <section className="py-16 bg-bg-darker">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  ticket.highlighted
                    ? 'bg-gold text-bg-darker scale-105 shadow-2xl shadow-gold/20'
                    : 'bg-bg-dark border border-gold/20 hover:border-gold/40'
                }`}
              >
                {ticket.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-bg-darker text-gold text-sm font-medium">
                      Mais Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className={`font-heading text-2xl mb-2 ${ticket.highlighted ? 'text-bg-darker' : 'text-text-light'}`}>
                    {ticket.name}
                  </h3>
                  <p className={`text-sm ${ticket.highlighted ? 'text-bg-dark/70' : 'text-text-muted'}`}>
                    {ticket.description}
                  </p>
                </div>

                <div className="text-center mb-6">
                  {ticket.originalPrice && (
                    <span className={`text-lg line-through ${ticket.highlighted ? 'text-bg-dark/50' : 'text-text-muted'}`}>
                      R$ {ticket.originalPrice}
                    </span>
                  )}
                  <div className="flex items-baseline justify-center gap-1">
                    <span className={`text-sm ${ticket.highlighted ? 'text-bg-dark/70' : 'text-text-muted'}`}>R$</span>
                    <span className={`font-heading text-5xl ${ticket.highlighted ? 'text-bg-darker' : 'text-gold'}`}>
                      {ticket.price}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {ticket.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className={`w-5 h-5 shrink-0 mt-0.5 ${ticket.highlighted ? 'text-bg-darker' : 'text-gold'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-sm ${ticket.highlighted ? 'text-bg-dark/80' : 'text-text-cream'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="#comprar"
                  variant={ticket.highlighted ? 'secondary' : 'primary'}
                  className={`w-full ${ticket.highlighted ? 'bg-bg-darker text-gold hover:bg-bg-dark' : ''}`}
                >
                  {ticket.available ? 'Comprar agora' : 'Esgotado'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Group Sales */}
      <section className="py-16 bg-bg-brown">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl text-text-light mb-4">Vendas para Grupos</h2>
            <p className="text-text-cream mb-8">
              Levando sua equipe para o Connection Experience? Oferecemos condições especiais para grupos a partir de 5 pessoas.
            </p>
            <Button href="mailto:grupos@connectionexperience.com.br" variant="outline">
              Solicitar orçamento para grupos
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-bg-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle title="Perguntas Frequentes" align="center" />
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 rounded-xl bg-bg-darker border border-gold/10">
              <h3 className="font-heading text-lg text-text-light mb-2">
                Posso transferir meu ingresso?
              </h3>
              <p className="text-text-cream text-sm">
                Sim, você pode transferir seu ingresso para outra pessoa até 7 dias antes do evento, mediante solicitação por email.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-bg-darker border border-gold/10">
              <h3 className="font-heading text-lg text-text-light mb-2">
                Qual a política de cancelamento?
              </h3>
              <p className="text-text-cream text-sm">
                Cancelamentos com mais de 30 dias: reembolso integral. Entre 15-30 dias: 50% do valor. Menos de 15 dias: sem reembolso, mas com possibilidade de transferência.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-bg-darker border border-gold/10">
              <h3 className="font-heading text-lg text-text-light mb-2">
                O que está incluso no ingresso?
              </h3>
              <p className="text-text-cream text-sm">
                Cada categoria de ingresso tem benefícios específicos listados acima. Hospedagem e transporte aéreo não estão inclusos em nenhuma categoria.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-bg-darker border border-gold/10">
              <h3 className="font-heading text-lg text-text-light mb-2">
                Como funcionam as Rodadas de Negócio?
              </h3>
              <p className="text-text-cream text-sm">
                Portadores do Full Pass e VIP podem se inscrever gratuitamente. A participação é confirmada após análise do perfil e cruzamento de interesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gold">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-heading text-4xl text-bg-darker mb-4">
            Ainda tem dúvidas?
          </h2>
          <p className="text-bg-dark/80 mb-8">
            Nossa equipe está pronta para ajudar você.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="https://wa.me/5554999999999"
              external
              variant="secondary"
              size="lg"
              className="bg-bg-darker text-gold"
            >
              Falar pelo WhatsApp
            </Button>
            <Button
              href="mailto:contato@connectionexperience.com.br"
              variant="ghost"
              size="lg"
              className="text-bg-darker border-2 border-bg-darker/20"
            >
              Enviar email
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
