'use client';

import { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answerText?: string;
  answer?: any;
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
        // Support new textarea field or fallback to old richText
        const answerContent = faq.answerText || (() => {
          const root = faq.answer?.root;
          if (!root?.children) return '';
          return root.children
            .map((p: any) => p.children?.map((t: any) => t.text).join('') || '')
            .join('\n');
        })();

        if (!answerContent) return null;

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
                <p className="text-text-cream text-sm leading-relaxed whitespace-pre-line">
                  {answerContent}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
