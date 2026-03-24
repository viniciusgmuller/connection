'use client';

import { useState } from 'react';
import Image from 'next/image';

/* ── Toggle: flip to true during the event to show the schedule ── */
const EVENT_MODE = true;

/* ── Data: cards (pre-event) ── */
const categories = ['Palestras', 'Conteúdos', 'Podcasts'] as const;
type Category = (typeof categories)[number];

const categoryColors: Record<Category, string> = {
  Palestras: '#956A47',
  Conteúdos: '#C9A962',
  Podcasts: '#3B4D7A',
};

const cards = [
  {
    title: 'Palestras Exclusivas',
    category: 'Palestras' as Category,
    description:
      'Conteúdo transformador com especialistas renomados em turismo, gastronomia e empreendedorismo.',
  },
  {
    title: 'Podcast Connection',
    category: 'Podcasts' as Category,
    description:
      'Conteúdo transformador com especialistas renomados em turismo, gastronomia e empreendedorismo.',
  },
  {
    title: 'Blog & Artigos',
    category: 'Conteúdos' as Category,
    description:
      'Conteúdo transformador com especialistas renomados em turismo, gastronomia e empreendedorismo.',
  },
];

/* ── Data: schedule (during event) ── */
const days = [
  { key: '10', day: '10', weekday: 'Qua' },
  { key: '11', day: '11', weekday: 'Qui' },
  { key: '12', day: '12', weekday: 'Sex' },
  { key: '13', day: '13', weekday: 'Sáb' },
];

interface ScheduleItem {
  time: string;
  endTime: string;
  title: string;
  speaker: string;
  speakerImages?: string[];
  category: Category;
  day: string;
  location?: string;
}

const schedule: ScheduleItem[] = [
  // Dia 10 - Terça
  { day: '10', time: '09:00', endTime: '10:00', title: 'Abertura oficial', speaker: 'Organização Connection', category: 'Palestras', location: 'Palco Principal' },
  { day: '10', time: '10:00', endTime: '12:00', title: 'Terroirs brasileiros: panorama atual', speaker: 'Dr. Eduardo Lima', speakerImages: ['/images/conheca-card-placeholder.jpg'], category: 'Palestras', location: 'Palco Principal' },
  { day: '10', time: '14:00', endTime: '15:30', title: 'O papel da IG na valorização regional', speaker: 'Conteúdo Connection', category: 'Conteúdos', location: 'Sala de Conteúdo' },
  { day: '10', time: '16:00', endTime: '17:30', title: 'Podcast ao vivo: Vozes do Terroir', speaker: 'Equipe Connection', speakerImages: ['/images/conheca-card-placeholder.jpg', '/images/conheca-card-placeholder.jpg'], category: 'Podcasts', location: 'Estúdio Podcast' },
  // Dia 11 - Quarta
  { day: '11', time: '09:00', endTime: '10:30', title: 'Café do Cerrado: história e futuro', speaker: 'Maria Souza', speakerImages: ['/images/conheca-card-placeholder.jpg'], category: 'Palestras', location: 'Palco Principal' },
  { day: '11', time: '11:00', endTime: '12:30', title: 'Mesa redonda: sustentabilidade e terroir', speaker: 'Painel com convidados', speakerImages: ['/images/conheca-card-placeholder.jpg', '/images/conheca-card-placeholder.jpg', '/images/conheca-card-placeholder.jpg'], category: 'Conteúdos', location: 'Sala de Conteúdo' },
  { day: '11', time: '14:00', endTime: '15:30', title: 'Indicações Geográficas e turismo', speaker: 'Carlos Mendes', speakerImages: ['/images/conheca-card-placeholder.jpg'], category: 'Palestras', location: 'Palco Principal' },
  { day: '11', time: '16:00', endTime: '17:30', title: 'Podcast ao vivo: Sabores do Brasil', speaker: 'Equipe Connection', speakerImages: ['/images/conheca-card-placeholder.jpg'], category: 'Podcasts', location: 'Estúdio Podcast' },
  // Dia 12 - Quinta
  { day: '12', time: '09:00', endTime: '10:30', title: 'Vinhos da Serra Gaúcha', speaker: 'Ana Vitória', speakerImages: ['/images/conheca-card-placeholder.jpg'], category: 'Palestras', location: 'Palco Principal' },
  { day: '12', time: '11:00', endTime: '12:30', title: 'Cacau de Rondônia: do produtor ao mundo', speaker: 'Roberto Alves', speakerImages: ['/images/conheca-card-placeholder.jpg'], category: 'Conteúdos', location: 'Sala de Conteúdo' },
  { day: '12', time: '14:00', endTime: '16:00', title: 'Painel: empreendedorismo e gastronomia', speaker: 'Painel com convidados', speakerImages: ['/images/conheca-card-placeholder.jpg', '/images/conheca-card-placeholder.jpg'], category: 'Palestras', location: 'Palco Principal' },
  { day: '12', time: '16:00', endTime: '17:30', title: 'Podcast ao vivo: Histórias de Origem', speaker: 'Equipe Connection', category: 'Podcasts', location: 'Estúdio Podcast' },
  // Dia 13 - Sexta
  { day: '13', time: '09:00', endTime: '10:30', title: 'Queijos artesanais com selo IG', speaker: 'Fernanda Costa', speakerImages: ['/images/conheca-card-placeholder.jpg'], category: 'Palestras', location: 'Palco Principal' },
  { day: '13', time: '11:00', endTime: '12:30', title: 'Conteúdo especial: tradição e inovação', speaker: 'Conteúdo Connection', category: 'Conteúdos', location: 'Sala de Conteúdo' },
  { day: '13', time: '14:00', endTime: '15:30', title: 'Palestra de encerramento', speaker: 'A confirmar', category: 'Palestras', location: 'Palco Principal' },
  { day: '13', time: '16:00', endTime: '17:30', title: 'Podcast ao vivo: episódio especial de encerramento', speaker: 'Equipe Connection', speakerImages: ['/images/conheca-card-placeholder.jpg', '/images/conheca-card-placeholder.jpg'], category: 'Podcasts', location: 'Estúdio Podcast' },
];

const locations = [...new Set(schedule.map((s) => s.location).filter(Boolean))] as string[];

/* ── Component ── */
export function ConhecaBlock() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activeDay, setActiveDay] = useState('10');
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [locationOpen, setLocationOpen] = useState(false);
  const [search, setSearch] = useState('');

  const searchLower = search.toLowerCase().trim();

  const filteredSchedule = schedule.filter((item) => {
    if (item.day !== activeDay) return false;
    if (activeCategory && item.category !== activeCategory) return false;
    if (activeLocation && item.location !== activeLocation) return false;
    if (
      searchLower &&
      !item.title.toLowerCase().includes(searchLower) &&
      !item.speaker.toLowerCase().includes(searchLower)
    )
      return false;
    return true;
  });

  return (
    <div className="mt-[100px] flex flex-col gap-[48px]">
      {/* Header */}
      <div className="flex flex-col gap-[30px]">
        <h2 className="font-heading text-[56px] font-normal leading-[1] text-[#FFF5EC] md:text-[80px] lg:text-[109px]">
          Conheça
        </h2>
        <p className="max-w-[657px] font-just-sans text-lg leading-normal text-[#FFF5EC]/60 lg:text-xl">
          Descubra o universo das Indicações Geográficas brasileiras através de
          conteúdo exclusivo, palestras transformadoras e conhecimento que
          valoriza nossa cultura.
        </p>

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-[10px]">
          {/* Category pills */}
          {EVENT_MODE && (
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-full border border-[#FFF5EC]/20 px-[25px] py-[10px] font-just-sans text-sm text-[#FFF5EC] transition-colors ${
                activeCategory === null
                  ? 'bg-[#946947]'
                  : 'bg-transparent hover:bg-[#FFF5EC]/5'
              }`}
            >
              Todos
            </button>
          )}
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                EVENT_MODE
                  ? setActiveCategory(activeCategory === cat ? null : cat)
                  : setActiveCategory(null)
              }
              className={`rounded-full border border-[#FFF5EC]/20 px-[25px] py-[10px] font-just-sans text-sm text-[#FFF5EC] transition-colors ${
                EVENT_MODE
                  ? activeCategory === cat
                    ? 'bg-[#946947]'
                    : 'bg-transparent hover:bg-[#FFF5EC]/5'
                  : cat === 'Palestras'
                    ? 'bg-[#946947]'
                    : 'bg-transparent hover:bg-[#FFF5EC]/5'
              }`}
            >
              {cat}
            </button>
          ))}

          {/* Separator + Location pills + Search (event mode) */}
          {EVENT_MODE && (
            <>
              <div className="mx-2 h-5 w-px bg-[#FFF5EC]/10" />

              {/* Location dropdown */}
              <div className="relative">
                <button
                  onClick={() => setLocationOpen(!locationOpen)}
                  className={`flex items-center gap-2 rounded-full border border-[#FFF5EC]/20 px-[25px] py-[10px] font-just-sans text-sm text-[#FFF5EC] transition-colors ${
                    activeLocation !== null
                      ? 'bg-[#946947]'
                      : 'bg-transparent hover:bg-[#FFF5EC]/5'
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {activeLocation ?? 'Todos os palcos'}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 opacity-50 transition-transform ${locationOpen ? 'rotate-180' : ''}`}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {locationOpen && (
                  <div className="absolute left-0 top-full z-20 mt-2 min-w-[200px] rounded-[12px] border border-[#FFF5EC]/10 bg-[#1C1F21] p-1.5 shadow-xl">
                    <button
                      onClick={() => { setActiveLocation(null); setLocationOpen(false); }}
                      className={`flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left font-just-sans text-sm transition-colors ${
                        activeLocation === null
                          ? 'bg-[#956A47]/15 text-[#FFF5EC]'
                          : 'text-[#FFF5EC]/60 hover:bg-[#FFF5EC]/5 hover:text-[#FFF5EC]'
                      }`}
                    >
                      Todos os palcos
                    </button>
                    {locations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => { setActiveLocation(loc); setLocationOpen(false); }}
                        className={`flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left font-just-sans text-sm transition-colors ${
                          activeLocation === loc
                            ? 'bg-[#956A47]/15 text-[#FFF5EC]'
                            : 'text-[#FFF5EC]/60 hover:bg-[#FFF5EC]/5 hover:text-[#FFF5EC]'
                        }`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-50">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {loc}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search */}
              <div className="relative ml-auto">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#FFF5EC]/30">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar palestrante ou tema..."
                  className="w-full rounded-full border border-[#FFF5EC]/10 bg-[#31241e] pb-[13px] pl-[37px] pr-[17px] pt-[12.5px] font-just-sans text-[13px] text-[#FFF5EC] placeholder-[#FFF5EC]/25 outline-none transition-colors focus:border-[#956A47]/50 sm:w-[260px]"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Pre-event: cards ── */}
      {!EVENT_MODE && (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[45px]">
          {cards.map((card) => (
            <div key={card.title} className="flex flex-col gap-5">
              <div className="relative aspect-[377/498] w-full overflow-hidden rounded-[25px]">
                <Image
                  src="/images/conheca-card-placeholder.jpg"
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-[10px] text-[#FFF5EC]">
                <h3 className="font-heading text-[24px] font-bold leading-[30px] lg:text-[30px]">
                  {card.title}
                </h3>
                <p className="font-just-sans text-xs opacity-80">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── During event: Apple-style schedule ── */}
      {EVENT_MODE && (
        <div>
          {/* Day selector */}
          <div className="flex w-full items-end gap-[40px]">
            {days.map((day) => (
              <button
                key={day.key}
                onClick={() => setActiveDay(day.key)}
                className={`flex flex-1 flex-col items-center gap-[6px] rounded-[14px] py-3 font-just-sans transition-all ${
                  activeDay === day.key
                    ? 'bg-[#956A47] text-[#FFF5EC]'
                    : 'border border-[#31241e] text-[#956A47] hover:bg-[#956A47]/10'
                }`}
              >
                <span className="text-[13px] tracking-[0.325px]">
                  {day.weekday}
                </span>
                <span className="text-[22px] font-semibold leading-[22px]">
                  {day.day}
                </span>
              </button>
            ))}
          </div>

          {/* Schedule list */}
          <div className="mt-[32px] flex flex-col gap-[12px]">
            {filteredSchedule.length === 0 && (
              <p className="py-16 text-center font-just-sans text-base text-[#FFF5EC]/40">
                Nenhuma atividade encontrada para este filtro.
              </p>
            )}
            {filteredSchedule.map((item, i) => {
              const color = categoryColors[item.category];
              return (
                <div
                  key={`${item.day}-${item.time}-${i}`}
                  className="group flex h-[137.5px] items-stretch gap-0 rounded-[16px] bg-[#FFF5EC]/[0.04] transition-colors hover:bg-[#FFF5EC]/[0.07]"
                >
                  {/* Time column */}
                  <div className="flex w-[100px] shrink-0 flex-col justify-center px-5 lg:w-[120px]">
                    <span className="font-heading text-[26px] leading-[30px] text-[#FFF5EC] lg:text-[30px]">
                      {item.time}
                    </span>
                    <span className="mt-0.5 font-just-sans text-[13px] leading-[20.8px] text-[#FFF5EC]/30">
                      {item.endTime}
                    </span>
                  </div>

                  {/* Accent bar */}
                  <div className="flex shrink-0 flex-col items-start justify-center py-4">
                    <div
                      className="h-full w-[3px] rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex min-w-0 flex-1 items-center gap-4 px-5">
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <span
                        className="font-just-sans text-[12px] font-semibold uppercase tracking-[0.6px] leading-[19.2px]"
                        style={{ color }}
                      >
                        {item.category}
                      </span>
                      <h4 className="font-just-sans text-[15px] font-semibold leading-[22px] text-[#FFF5EC] lg:text-base">
                        {item.title}
                      </h4>
                      <p className="font-just-sans text-[13px] leading-[20.8px] text-[#FFF5EC]/40">
                        {item.speaker}
                      </p>
                      {item.location && (
                        <span className="mt-[3px] inline-flex items-center gap-1.5 font-just-sans text-[12px] leading-[19.2px] text-[#FFF5EC]/25">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {item.location}
                        </span>
                      )}
                    </div>

                    {/* Speaker avatars */}
                    {item.speakerImages && item.speakerImages.length > 0 && (
                      <div className="flex shrink-0 -space-x-3.5">
                        {item.speakerImages.map((img, j) => (
                          <div
                            key={j}
                            className="relative h-[61px] w-[61px] overflow-hidden rounded-full shadow-[0_0_0_3.4px_#281b15]"
                          >
                            <Image
                              src={img}
                              alt=""
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
