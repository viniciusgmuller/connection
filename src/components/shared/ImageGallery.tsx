'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ImageGallery({
  images,
  columns = 3,
  gap = 'md',
  className
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const columnClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4'
  };

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  };

  return (
    <>
      <div className={cn('grid', columnClasses[columns], gapClasses[gap], className)}>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className="relative aspect-square rounded-xl overflow-hidden bg-bg-dark group"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-bg-darker/0 group-hover:bg-bg-darker/30 transition-colors" />
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-bg-darker/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-text-light text-sm">{image.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bg-darker/95 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-bg-dark flex items-center justify-center text-text-light hover:text-gold transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative max-w-4xl max-h-[80vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
              />
            </div>
            {selectedImage.caption && (
              <p className="mt-4 text-text-cream text-center">{selectedImage.caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Placeholder component for when images aren't available
export function GalleryPlaceholder({
  count = 6,
  columns = 3
}: {
  count?: number;
  columns?: 2 | 3 | 4;
}) {
  const columnClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4'
  };

  return (
    <div className={cn('grid gap-4', columnClasses[columns])}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative aspect-square rounded-xl overflow-hidden bg-bg-dark flex items-center justify-center"
        >
          <svg className="w-12 h-12 text-gold/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      ))}
    </div>
  );
}
