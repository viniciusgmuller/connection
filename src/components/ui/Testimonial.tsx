import { cn } from '@/lib/utils';
import Image from 'next/image';
import { getInitials } from '@/lib/utils';

interface TestimonialProps {
  name: string;
  role: string;
  company?: string;
  quote: string;
  image?: string;
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
}

export function Testimonial({
  name,
  role,
  company,
  quote,
  image,
  className,
  variant = 'default'
}: TestimonialProps) {
  if (variant === 'compact') {
    return (
      <div className={cn('p-4 rounded-xl bg-bg-dark/50 border border-gold/10', className)}>
        <p className="text-text-cream text-sm italic mb-3">&ldquo;{quote}&rdquo;</p>
        <div className="flex items-center gap-2">
          {image ? (
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image src={image} alt={name} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-bg-darker text-xs font-bold">
              {getInitials(name)}
            </div>
          )}
          <div>
            <p className="text-text-light text-sm font-medium">{name}</p>
            <p className="text-text-muted text-xs">{role}</p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div className={cn('p-8 rounded-2xl bg-bg-brown border border-gold/20', className)}>
        <svg
          className="w-10 h-10 text-gold/30 mb-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="text-text-cream text-xl md:text-2xl italic mb-6 font-accent leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
        <div className="flex items-center gap-4">
          {image ? (
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold">
              <Image src={image} alt={name} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-gold flex items-center justify-center text-bg-darker text-lg font-bold">
              {getInitials(name)}
            </div>
          )}
          <div>
            <p className="text-text-light font-medium text-lg">{name}</p>
            <p className="text-gold text-sm">{role}</p>
            {company && <p className="text-text-muted text-sm">{company}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('p-6 rounded-xl bg-bg-dark border border-gold/10', className)}>
      <svg
        className="w-8 h-8 text-gold/20 mb-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="text-text-cream italic mb-4">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        {image ? (
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-bg-darker text-sm font-bold">
            {getInitials(name)}
          </div>
        )}
        <div>
          <p className="text-text-light font-medium">{name}</p>
          <p className="text-text-muted text-sm">
            {role}
            {company && ` · ${company}`}
          </p>
        </div>
      </div>
    </div>
  );
}
