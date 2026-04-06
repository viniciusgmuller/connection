import type { CollectionConfig } from "payload";

export const FAQ: CollectionConfig = {
  slug: "faq",
  labels: { singular: "Pergunta Frequente", plural: "Perguntas Frequentes" },
  admin: { useAsTitle: "question" },
  access: { read: () => true },
  fields: [
    { name: "question", type: "text", required: true, label: "Pergunta" },
    { name: "answerText", type: "textarea", required: true, label: "Resposta" },
    { name: "order", type: "number", defaultValue: 0, label: "Ordem" },
  ],
};
