import { cn } from '@/lib/utils';

interface IGBadgeProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCount?: boolean;
  count?: number;
  variant?: 'default' | 'outline' | 'dark';
  className?: string;
}

export function IGBadge({
  size = 'md',
  showCount = false,
  count = 53,
  variant = 'default',
  className
}: IGBadgeProps) {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-28 h-28',
    xl: 'w-36 h-36'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-5xl'
  };

  const subTextSizes = {
    sm: 'text-[6px]',
    md: 'text-[8px]',
    lg: 'text-[10px]',
    xl: 'text-xs'
  };

  const variants = {
    default: 'bg-gradient-to-br from-gold via-gold-light to-gold-dark shadow-lg shadow-gold/20',
    outline: 'bg-transparent border-2 border-gold',
    dark: 'bg-bg-dark border-2 border-gold'
  };

  const textColors = {
    default: 'text-bg-darker',
    outline: 'text-gold',
    dark: 'text-gold'
  };

  return (
    <div className={cn('relative inline-block', className)}>
      <div
        className={cn(
          'rounded-full flex flex-col items-center justify-center',
          sizes[size],
          variants[variant]
        )}
      >
        <span className={cn('font-heading font-bold', textSizes[size], textColors[variant])}>
          IG
        </span>
        <span className={cn('uppercase tracking-wider', subTextSizes[size], variant === 'default' ? 'text-bg-darker/70' : 'text-gold/70')}>
          Indicação
        </span>
        <span className={cn('uppercase tracking-wider -mt-0.5', subTextSizes[size], variant === 'default' ? 'text-bg-darker/70' : 'text-gold/70')}>
          Geográfica
        </span>
      </div>

      {showCount && (
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent-orange flex items-center justify-center shadow-md">
          <span className="text-white text-xs font-bold">{count}+</span>
        </div>
      )}
    </div>
  );
}

export function IGSeal({ className }: { className?: string }) {
  return (
    <div className={cn('inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30', className)}>
      <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
        <span className="text-bg-darker font-heading text-sm font-bold">IG</span>
      </div>
      <div className="text-left">
        <span className="block text-gold text-xs font-medium">Produto com</span>
        <span className="block text-text-light text-sm font-heading">Indicação Geográfica</span>
      </div>
    </div>
  );
}

export function IGStamp({ className }: { className?: string }) {
  return (
    <div className={cn('relative', className)}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Outer circle */}
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold" />

        {/* Inner circle */}
        <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" className="text-gold/50" />

        {/* Text path for curved text */}
        <defs>
          <path id="topArc" d="M 15,50 A 35,35 0 0,1 85,50" fill="none" />
          <path id="bottomArc" d="M 85,50 A 35,35 0 0,1 15,50" fill="none" />
        </defs>

        {/* Top text */}
        <text className="text-gold fill-current" fontSize="8" fontWeight="500">
          <textPath href="#topArc" startOffset="50%" textAnchor="middle">
            INDICAÇÃO GEOGRÁFICA
          </textPath>
        </text>

        {/* Bottom text */}
        <text className="text-gold fill-current" fontSize="8" fontWeight="500">
          <textPath href="#bottomArc" startOffset="50%" textAnchor="middle">
            BRASIL • CERTIFICADO
          </textPath>
        </text>

        {/* Center IG */}
        <text x="50" y="48" textAnchor="middle" className="text-gold fill-current font-heading" fontSize="24" fontWeight="bold">
          IG
        </text>
        <text x="50" y="62" textAnchor="middle" className="text-gold/70 fill-current" fontSize="6">
          SELO DE ORIGEM
        </text>
      </svg>
    </div>
  );
}
