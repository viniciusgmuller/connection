import { Metadata } from 'next';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';

export const metadata: Metadata = {
  title: 'Programação | Connection Experience',
  description: 'Confira a programação completa do Connection Experience 2026 - palestras, workshops, degustações e muito mais.',
};

const schedule = [
  {
    day: 'Quinta-feira',
    date: '15 de Maio',
    events: [
      { time: '08:00', title: 'Credenciamento', type: 'special' as const, location: 'Entrada Principal' },
      { time: '09:00', title: 'Cerimônia de Abertura', type: 'special' as const, location: 'Auditório Principal' },
      { time: '10:00', title: 'Palestra: O Futuro das IGs no Brasil', speaker: 'José Luiz Tejon', type: 'palestra' as const, location: 'Auditório Principal' },
      { time: '12:00', title: 'Almoço de Networking', type: 'networking' as const, location: 'Restaurante Parceiro' },
      { time: '14:00', title: 'Workshop: Introdução às Indicações Geográficas', type: 'workshop' as const, location: 'Sala 1' },
      { time: '14:00', title: 'Degustação de Vinhos da Serra Gaúcha', type: 'workshop' as const, location: 'Arena IG' },
      { time: '16:00', title: 'Painel: Terroirs Brasileiros', type: 'palestra' as const, location: 'Auditório Principal' },
      { time: '18:00', title: 'Coquetel de Boas-Vindas', type: 'networking' as const, location: 'Área Externa' },
    ]
  },
  {
    day: 'Sexta-feira',
    date: '16 de Maio',
    events: [
      { time: '08:30', title: 'Rodadas de Negócio - Bloco 1', type: 'networking' as const, location: 'Área de Negócios' },
      { time: '09:30', title: 'Palestra: Comunicação e Branding', speaker: 'Dado Schneider', type: 'palestra' as const, location: 'Auditório Principal' },
      { time: '11:00', title: 'Aula Show: Cacau de Rondônia', type: 'workshop' as const, location: 'Arena Gastronômica' },
      { time: '12:30', title: 'Almoço', type: 'break' as const, location: 'Livre' },
      { time: '14:00', title: 'Rodadas de Negócio - Bloco 2', type: 'networking' as const, location: 'Área de Negócios' },
      { time: '15:00', title: 'Workshop: Café Especial Brasileiro', type: 'workshop' as const, location: 'Arena Café' },
      { time: '17:00', title: 'Palestra: Turismo e Experiências', speaker: 'Guilherme Paulus', type: 'palestra' as const, location: 'Auditório Principal' },
      { time: '19:00', title: 'Jantar de Gala', type: 'special' as const, location: 'Restaurante Parceiro' },
    ]
  },
  {
    day: 'Sábado',
    date: '17 de Maio',
    events: [
      { time: '09:00', title: 'Rodadas de Negócio - Bloco 3', type: 'networking' as const, location: 'Área de Negócios' },
      { time: '10:00', title: 'Painel: Cases de Sucesso', type: 'palestra' as const, location: 'Auditório Principal' },
      { time: '11:30', title: 'Degustação: Queijos Artesanais', type: 'workshop' as const, location: 'Arena IG' },
      { time: '12:30', title: 'Almoço de Encerramento', type: 'networking' as const, location: 'Área Central' },
      { time: '14:30', title: 'Cerimônia de Premiação', type: 'special' as const, location: 'Auditório Principal' },
      { time: '16:00', title: 'Encerramento Oficial', type: 'special' as const, location: 'Auditório Principal' },
    ]
  }
];

const typeColors = {
  palestra: 'gold',
  workshop: 'green',
  networking: 'blue',
  break: 'default',
  special: 'orange'
} as const;

const typeLabels = {
  palestra: 'Palestra',
  workshop: 'Workshop',
  networking: 'Networking',
  break: 'Intervalo',
  special: 'Especial'
};

export default function ProgramacaoPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 bg-bg-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Programação"
            subtitle="Três dias intensos de conhecimento, experiências e oportunidades de negócio"
            align="center"
          />
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gold"></span>
              <span className="text-text-muted text-sm">Palestra</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent-green"></span>
              <span className="text-text-muted text-sm">Workshop</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent-blue"></span>
              <span className="text-text-muted text-sm">Networking</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent-orange"></span>
              <span className="text-text-muted text-sm">Especial</span>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16 bg-bg-darker">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-16">
            {schedule.map((day, dayIndex) => (
              <div key={dayIndex}>
                {/* Day Header */}
                <div className="sticky top-20 z-10 bg-bg-darker py-4 mb-8 border-b border-gold/20">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center">
                      <span className="font-heading text-xl text-bg-darker">{dayIndex + 1}</span>
                    </div>
                    <div>
                      <h2 className="font-heading text-2xl text-text-light">{day.day}</h2>
                      <p className="text-gold">{day.date}</p>
                    </div>
                  </div>
                </div>

                {/* Events */}
                <div className="space-y-4">
                  {day.events.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      className="flex gap-4 p-4 rounded-xl bg-bg-dark border border-gold/10 hover:border-gold/30 transition-colors"
                    >
                      {/* Time */}
                      <div className="w-16 shrink-0 text-center">
                        <span className="font-heading text-lg text-gold">{event.time}</span>
                      </div>

                      {/* Divider */}
                      <div className="w-px bg-gold/20 relative">
                        <div className={`absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 rounded-full ${
                          event.type === 'palestra' ? 'bg-gold' :
                          event.type === 'workshop' ? 'bg-accent-green' :
                          event.type === 'networking' ? 'bg-accent-blue' :
                          event.type === 'special' ? 'bg-accent-orange' : 'bg-text-muted'
                        }`}></div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <h3 className="font-heading text-lg text-text-light">{event.title}</h3>
                          <Tag variant={typeColors[event.type]} size="sm">
                            {typeLabels[event.type]}
                          </Tag>
                        </div>
                        {event.speaker && (
                          <p className="text-gold text-sm mb-1">com {event.speaker}</p>
                        )}
                        <p className="text-text-muted text-sm flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note */}
      <section className="py-12 bg-bg-brown">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <p className="text-text-cream text-sm">
            * Programação sujeita a alterações. Última atualização: Janeiro/2026
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
