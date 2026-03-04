import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  tag?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  light?: boolean;
}

export function SectionTitle({
  title,
  subtitle,
  tag,
  align = 'left',
  className,
  light = true
}: SectionTitleProps) {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div className={cn('mb-12', alignments[align], className)}>
      {tag && (
        <span className="inline-block px-3 py-1 mb-4 text-sm font-medium tracking-wider uppercase rounded-full bg-accent-orange text-white">
          {tag}
        </span>
      )}
      <h2
        className={cn(
          'font-heading text-4xl md:text-5xl lg:text-6xl mb-4',
          light ? 'text-text-light' : 'text-text-dark'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-lg md:text-xl max-w-2xl',
            align === 'center' && 'mx-auto',
            light ? 'text-text-cream' : 'text-text-muted'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
