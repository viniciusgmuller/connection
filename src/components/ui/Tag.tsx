import { cn } from '@/lib/utils';

interface TagProps {
  children: React.ReactNode;
  variant?: 'orange' | 'gold' | 'green' | 'blue' | 'default';
  size?: 'sm' | 'md';
  className?: string;
}

export function Tag({ children, variant = 'default', size = 'md', className }: TagProps) {
  const variants = {
    orange: 'bg-accent-orange text-white',
    gold: 'bg-gold text-bg-darker',
    green: 'bg-accent-green text-white',
    blue: 'bg-accent-blue text-white',
    default: 'bg-bg-brown text-text-cream'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  return (
    <span
      className={cn(
        'inline-block font-medium rounded-full uppercase tracking-wider',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
