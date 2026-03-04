'use client';

import { useEffect, useState } from 'react';
import { getEventPhases, getCountdown } from '@/lib/content';

interface CountdownProps {
  variant?: 'default' | 'compact' | 'large';
  showLabels?: boolean;
}

export function Countdown({ variant = 'default', showLabels = true }: CountdownProps) {
  const phases = getEventPhases();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateCountdown = () => {
      setCountdown(getCountdown(phases.eventDate));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [phases.eventDate]);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-2 text-gold">
        <span className="font-heading">{countdown.days}d</span>
        <span>:</span>
        <span className="font-heading">{countdown.hours}h</span>
        <span>:</span>
        <span className="font-heading">{countdown.minutes}m</span>
      </div>
    );
  }

  if (variant === 'large') {
    return (
      <div className="flex items-center justify-center gap-6 md:gap-10">
        <CountdownUnit value={countdown.days} label="Dias" size="large" showLabel={showLabels} />
        <Separator />
        <CountdownUnit value={countdown.hours} label="Horas" size="large" showLabel={showLabels} />
        <Separator />
        <CountdownUnit value={countdown.minutes} label="Minutos" size="large" showLabel={showLabels} />
        <Separator />
        <CountdownUnit value={countdown.seconds} label="Segundos" size="large" showLabel={showLabels} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4 md:gap-8">
      <CountdownUnit value={countdown.days} label="Dias" showLabel={showLabels} />
      <Separator />
      <CountdownUnit value={countdown.hours} label="Horas" showLabel={showLabels} />
      <Separator />
      <CountdownUnit value={countdown.minutes} label="Min" showLabel={showLabels} />
      <Separator />
      <CountdownUnit value={countdown.seconds} label="Seg" showLabel={showLabels} />
    </div>
  );
}

function CountdownUnit({
  value,
  label,
  size = 'default',
  showLabel = true
}: {
  value: number;
  label: string;
  size?: 'default' | 'large';
  showLabel?: boolean;
}) {
  const valueClass = size === 'large'
    ? 'text-5xl md:text-7xl'
    : 'text-3xl md:text-5xl';

  const labelClass = size === 'large'
    ? 'text-sm md:text-base'
    : 'text-xs md:text-sm';

  return (
    <div className="text-center">
      <div className={`${valueClass} font-heading text-gold`}>
        {value.toString().padStart(2, '0')}
      </div>
      {showLabel && (
        <div className={`${labelClass} text-text-muted uppercase tracking-wider`}>
          {label}
        </div>
      )}
    </div>
  );
}

function Separator() {
  return <span className="text-gold text-2xl">:</span>;
}
