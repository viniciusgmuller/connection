import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'brown' | 'bordered';
  hover?: boolean;
}

export function Card({ children, className, variant = 'default', hover = true }: CardProps) {
  const variants = {
    default: 'bg-bg-dark',
    dark: 'bg-bg-darker',
    brown: 'bg-bg-brown',
    bordered: 'bg-transparent border border-gold/20'
  };

  return (
    <div
      className={cn(
        'rounded-2xl p-6',
        variants[variant],
        hover && 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold/5',
        className
      )}
    >
      {children}
    </div>
  );
}

interface ProductCardProps {
  name: string;
  origin: string;
  state: string;
  description: string;
  image?: string;
}

export function ProductCard({ name, origin, state, description, image }: ProductCardProps) {
  return (
    <Card className="overflow-hidden" variant="dark">
      {image && (
        <div className="relative h-48 -mx-6 -mt-6 mb-4">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-xl text-text-light">{name}</h3>
          <span className="text-sm text-gold">{state}</span>
        </div>
        <p className="text-sm text-text-muted">{origin}</p>
        <p className="text-text-cream text-sm">{description}</p>
      </div>
    </Card>
  );
}

interface SpeakerCardProps {
  name: string;
  title: string;
  bio: string;
  image: string;
  credentials: string[];
}

export function SpeakerCard({ name, title, bio, image, credentials }: SpeakerCardProps) {
  return (
    <Card className="text-center" variant="dark">
      <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-gold">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="font-heading text-xl text-text-light mb-1">{name}</h3>
      <p className="text-gold text-sm mb-3">{title}</p>
      <p className="text-text-cream text-sm mb-4">{bio}</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {credentials.map((credential, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 rounded-full bg-bg-brown text-text-muted"
          >
            {credential}
          </span>
        ))}
      </div>
    </Card>
  );
}
