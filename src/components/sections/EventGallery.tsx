'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalleryImage {
  image: { url?: string; filename?: string; alt?: string } | null;
  caption?: string | null;
}

interface EventGalleryProps {
  title?: string;
  subtitle?: string;
  images?: GalleryImage[];
}

export function EventGallery({
  title = 'Connection em Imagens',
  subtitle = 'Reviva os melhores momentos das edições anteriores',
  images = [],
}: EventGalleryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const validImages = images.filter(
    (item) => item.image && (item.image.url || item.image.filename)
  );

  if (validImages.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[#0D0D0D] py-[100px]">
      <div className="mx-auto max-w-[1221px] px-6 lg:px-[50px]">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-[36px] font-normal leading-[1.1] text-[#FFF5EC] md:text-[48px]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 font-just-sans text-lg text-[#FFF5EC]/60">
              {subtitle}
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {validImages.map((item, index) => {
            const src =
              item.image!.url ||
              `/media/${item.image!.filename}`;

            return (
              <button
                key={index}
                onClick={() => setSelected(index)}
                className="group relative aspect-square overflow-hidden rounded-xl bg-[#1a1a1a]"
              >
                <Image
                  src={src}
                  alt={item.image!.alt || item.caption || ''}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-[#0D0D0D]/0 transition-colors group-hover:bg-[#0D0D0D]/30" />
                {item.caption && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D0D0D]/80 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="font-just-sans text-sm text-[#FFF5EC]">
                      {item.caption}
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0D0D]/95 p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a1a] text-[#FFF5EC] hover:text-[#C9A962] transition-colors"
            onClick={() => setSelected(null)}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev / Next */}
          {selected > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a1a] text-[#FFF5EC] hover:text-[#C9A962] transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelected(selected - 1); }}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {selected < validImages.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a1a] text-[#FFF5EC] hover:text-[#C9A962] transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelected(selected + 1); }}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <div
            className="relative max-h-[80vh] max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <Image
                src={
                  validImages[selected].image!.url ||
                  `/media/${validImages[selected].image!.filename}`
                }
                alt={validImages[selected].image!.alt || validImages[selected].caption || ''}
                fill
                className="object-contain"
              />
            </div>
            {validImages[selected].caption && (
              <p className="mt-4 text-center font-just-sans text-[#FFF5EC]/80">
                {validImages[selected].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
