import Image from 'next/image';
import { getInitials } from '@/lib/utils';

interface ProductCardProps {
  name: string;
  origin: string;
  state: string;
  description: string;
  image?: string;
  category?: string;
  className?: string;
}

export function ProductCard({
  name,
  origin,
  state,
  description,
  image,
  category,
  className = '',
}: ProductCardProps) {
  return (
    <div
      className={`border border-brand-white/20 rounded-tl-[120px] rounded-tr-[120px] md:rounded-tl-[162px] md:rounded-tr-[162px] rounded-bl-[9px] rounded-br-[9px] p-4 md:p-5 flex flex-col items-center gap-2 h-full ${className}`}
    >
      {/* Circular Product Image */}
      <div className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] lg:w-[250px] lg:h-[250px] xl:w-[280px] xl:h-[280px] relative rounded-full overflow-hidden shrink-0">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 140px, (max-width: 768px) 180px, (max-width: 1024px) 220px, 280px"
          />
        ) : (
          <div className="w-full h-full bg-brand-cow flex flex-col items-center justify-center gap-1">
            <span className="font-heading text-2xl md:text-4xl text-brand-white/60">
              {getInitials(name)}
            </span>
            {category && (
              <span className="font-just-sans text-[10px] md:text-xs text-brand-white/40 uppercase tracking-wider">
                {category}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-2 items-center py-2 md:py-3 text-center w-full flex-1">
        <h4 className="font-heading font-bold text-lg md:text-2xl lg:text-[27px] lg:leading-[27px] text-brand-white">
          {name}
        </h4>
        <p className="font-just-sans text-sm md:text-lg text-brand-white/50">
          {origin}, {state}
        </p>
        <p className="font-just-sans text-sm md:text-lg text-brand-white">
          {description}
        </p>
      </div>
    </div>
  );
}
