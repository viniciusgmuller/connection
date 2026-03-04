'use client';

import { ReactNode } from 'react';
import { getCurrentPhase, getPhaseConfig } from '@/lib/content';
import type { EventPhase } from '@/types';

interface EventPhaseWrapperProps {
  children: ReactNode;
  showIn?: EventPhase[];
  hideIn?: EventPhase[];
}

export function EventPhaseWrapper({ children, showIn, hideIn }: EventPhaseWrapperProps) {
  const currentPhase = getCurrentPhase();

  // If showIn is specified, only show if current phase is in the list
  if (showIn && !showIn.includes(currentPhase)) {
    return null;
  }

  // If hideIn is specified, hide if current phase is in the list
  if (hideIn && hideIn.includes(currentPhase)) {
    return null;
  }

  return <>{children}</>;
}

interface PhaseConditionalProps {
  preEvent?: ReactNode;
  duringEvent?: ReactNode;
  postEvent?: ReactNode;
  fallback?: ReactNode;
}

export function PhaseConditional({ preEvent, duringEvent, postEvent, fallback }: PhaseConditionalProps) {
  const currentPhase = getCurrentPhase();

  switch (currentPhase) {
    case 'pre-event':
      return preEvent ? <>{preEvent}</> : fallback ? <>{fallback}</> : null;
    case 'during-event':
      return duringEvent ? <>{duringEvent}</> : fallback ? <>{fallback}</> : null;
    case 'post-event':
      return postEvent ? <>{postEvent}</> : fallback ? <>{fallback}</> : null;
    default:
      return fallback ? <>{fallback}</> : null;
  }
}

export function useEventPhase() {
  const currentPhase = getCurrentPhase();
  const config = getPhaseConfig();

  return {
    phase: currentPhase,
    config,
    isPreEvent: currentPhase === 'pre-event',
    isDuringEvent: currentPhase === 'during-event',
    isPostEvent: currentPhase === 'post-event',
  };
}
