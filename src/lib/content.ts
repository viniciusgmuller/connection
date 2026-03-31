import siteData from '@/content/site.json';
import eventPhasesData from '@/content/event-phases.json';
import conhecerData from '@/content/conhecer.json';
import experimentarData from '@/content/experimentar.json';
import negociarData from '@/content/negociar.json';
import testimonialsData from '@/content/testimonials.json';
import type { EventPhasesConfig, EventPhase, Testimonial } from '@/types';

export function getSiteConfig() {
  return siteData;
}

export function getNavigation() {
  return siteData.navigation;
}

export function getStatistics() {
  return siteData.statistics;
}

export function getEventPhases(): EventPhasesConfig {
  return eventPhasesData as EventPhasesConfig;
}

export function getCurrentPhase(): EventPhase {
  // Check if CMS phase is available via data attribute (set by layout)
  if (typeof document !== 'undefined') {
    const body = document.body;
    const cmsPhase = body.getAttribute('data-event-phase');
    if (cmsPhase === 'pre-event' || cmsPhase === 'during' || cmsPhase === 'post-event') {
      // Map CMS values to internal values
      if (cmsPhase === 'during') return 'during-event';
      return cmsPhase;
    }
  }
  return eventPhasesData.currentPhase as EventPhase;
}

export function getPhaseConfig(phase?: EventPhase) {
  const currentPhase = phase || getCurrentPhase();
  return eventPhasesData.phases[currentPhase];
}

export function isPreEvent(): boolean {
  return getCurrentPhase() === 'pre-event';
}

export function isDuringEvent(): boolean {
  return getCurrentPhase() === 'during-event';
}

export function isPostEvent(): boolean {
  return getCurrentPhase() === 'post-event';
}

export function getConhecerContent() {
  return conhecerData;
}

export function getExperimentarContent() {
  return experimentarData;
}

export function getNegociarContent() {
  return negociarData;
}

export function getAllTestimonials(): Testimonial[] {
  return testimonialsData.testimonials as Testimonial[];
}

export function getTestimonialsByAxis(axis: 'conhecer' | 'experimentar' | 'negociar'): Testimonial[] {
  return testimonialsData.testimonials.filter(t => t.axis === axis) as Testimonial[];
}

export function getRandomTestimonial(axis?: 'conhecer' | 'experimentar' | 'negociar'): Testimonial | undefined {
  const testimonials = axis ? getTestimonialsByAxis(axis) : getAllTestimonials();
  if (testimonials.length === 0) return undefined;
  return testimonials[Math.floor(Math.random() * testimonials.length)];
}

export function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function getCountdown(targetDate: string): { days: number; hours: number; minutes: number; seconds: number } {
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000)
  };
}
