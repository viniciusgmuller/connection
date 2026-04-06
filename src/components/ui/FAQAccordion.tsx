'use client';

import { useState } from 'react';
import { RichText } from './RichText';

interface FAQItem {
  id: string;
  question: string;
  answer: any;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {items.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div
            key={faq.id}
            className="rounded-xl bg-bg-darker border border-gold/10 overflow-hidden"
          >
            <button
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              className="flex items-center justify-between w-full p-6 text-left gap-4"
            >
              <h3 className="font-heading text-lg text-text-light">
                {faq.question}
              </h3>
              <svg
                className={`w-5 h-5 shrink-0 text-gold transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-6 pb-6">
                <RichText
                  content={faq.answer}
                  className="text-text-cream text-sm leading-relaxed"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
