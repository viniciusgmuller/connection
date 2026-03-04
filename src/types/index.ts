// Event Phase Types
export type EventPhase = 'pre-event' | 'during-event' | 'post-event';

export interface PhaseConfig {
  showTickets: boolean;
  showCountdown: boolean;
  showSchedule: boolean;
  showMap: boolean;
  showGallery: boolean;
  showNextEdition: boolean;
}

export interface EventPhasesConfig {
  currentPhase: EventPhase;
  eventDate: string;
  eventEndDate: string;
  phases: Record<EventPhase, Partial<PhaseConfig>>;
}

// Content Types
export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  eventDate: string;
  eventLocation: string;
  eventVenue: string;
  socialLinks: {
    instagram: string;
    linkedin: string;
    facebook: string;
    youtube?: string;
  };
  contact: {
    email: string;
    phone?: string;
    whatsapp?: string;
  };
}

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface Statistic {
  value: string;
  label: string;
  suffix?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  image?: string;
  axis?: 'conhecer' | 'experimentar' | 'negociar';
}

export interface Speaker {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  credentials: string[];
  socialLinks?: {
    linkedin?: string;
    instagram?: string;
  };
}

export interface AxisContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: {
    title: string;
    description: string;
    icon?: string;
  }[];
  cta: {
    text: string;
    href: string;
  };
  testimonial?: Testimonial;
  color: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description?: string;
  speaker?: string;
  location?: string;
  type: 'palestra' | 'workshop' | 'networking' | 'break' | 'special';
}

export interface ScheduleDay {
  date: string;
  dayLabel: string;
  items: ScheduleItem[];
}

export interface Product {
  id: string;
  name: string;
  origin: string;
  state: string;
  description: string;
  category: string;
  image?: string;
  ig?: string; // Indicação Geográfica
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  category: 'realizacao' | 'patrocinio' | 'apoio' | 'midia';
  url?: string;
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  available: boolean;
  soldOut?: boolean;
}
