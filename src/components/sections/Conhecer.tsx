import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { Testimonial } from '@/components/ui/Testimonial';
import { getConhecerContent, getTestimonialsByAxis } from '@/lib/content';

export function Conhecer() {
  const content = getConhecerContent();
  const testimonials = getTestimonialsByAxis('conhecer');
  const testimonial = testimonials[0];

  return (
    <section id="conhecer" className="py-24 bg-bg-brown relative overflow-hidden">
      {/* Decorative curved lines */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute right-0 top-0 h-full w-1/2" viewBox="0 0 400 800" fill="none">
          <path
            d="M100 0C200 200 300 400 200 600C100 800 0 800 0 800"
            stroke="#C9A962"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M150 0C250 200 350 400 250 600C150 800 50 800 50 800"
            stroke="#C9A962"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M200 0C300 200 400 400 300 600C200 800 100 800 100 800"
            stroke="#C9A962"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Title */}
          <div>
            <Tag variant="orange" className="mb-4">{content.subtitle}</Tag>
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-text-light mb-6">
              {content.title}
            </h2>
            <p className="text-text-cream text-lg mb-8 max-w-md">
              {content.description}
            </p>
            <Button href={content.cta.href} variant="primary">
              {content.cta.text}
            </Button>
          </div>

          {/* Right Column - Features */}
          <div className="space-y-6">
            {content.features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-bg-dark/30 border border-gold/10 hover:border-gold/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <FeatureIcon name={feature.icon} />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-text-light mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-text-cream text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Testimonial */}
            {testimonial && (
              <div className="mt-8">
                <Testimonial
                  name={testimonial.name}
                  role={testimonial.role}
                  company={testimonial.company}
                  quote={testimonial.quote}
                  image={testimonial.image}
                  variant="compact"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureIcon({ name }: { name?: string }) {
  const iconClass = "w-6 h-6 text-gold";

  switch (name) {
    case 'map':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      );
    case 'microphone':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      );
    case 'podcast':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.828-2.828" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth={1.5} />
        </svg>
      );
    case 'book':
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
  }
}
