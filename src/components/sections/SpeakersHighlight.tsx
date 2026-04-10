import Image from 'next/image';

interface Speaker {
  id: string;
  name: string;
  title?: string | null;
  photo?: { url?: string; filename?: string; alt?: string } | string | null;
}

interface SpeakersHighlightProps {
  speakers: Speaker[];
}

export function SpeakersHighlight({ speakers }: SpeakersHighlightProps) {
  if (speakers.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#131415] py-[120px]">
      {/* Subtle gold accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-[200px] bg-gradient-to-r from-transparent via-[#C9A962]/40 to-transparent" />

      <div className="mx-auto max-w-[1221px] px-6 lg:px-[50px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block font-just-sans text-sm uppercase tracking-[0.2em] text-[#C9A962]">
            Confirmados
          </span>
          <h2 className="font-heading text-[36px] font-normal leading-[1.1] text-[#FFF5EC] md:text-[48px] lg:text-[60px]">
            Palestrantes
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
          {speakers.map((speaker) => {
            const photo =
              typeof speaker.photo === 'object' && speaker.photo !== null
                ? speaker.photo
                : null;
            const photoUrl = photo?.url || (photo?.filename ? `/media/${photo.filename}` : null);
            const initials = speaker.name
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 2);

            return (
              <div key={speaker.id} className="group flex flex-col items-center">
                {/* Photo */}
                <div className="relative mb-6 aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#1a1a1a]">
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt={photo?.alt || speaker.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="font-heading text-4xl text-[#C9A962]/30">
                        {initials}
                      </span>
                    </div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131415]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Info */}
                <h3 className="text-center font-heading text-xl leading-tight text-[#FFF5EC] md:text-2xl">
                  {speaker.name}
                </h3>
                {speaker.title && (
                  <p className="mt-2 text-center font-just-sans text-sm leading-relaxed text-[#FFF5EC]/60 md:text-base">
                    {speaker.title}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
