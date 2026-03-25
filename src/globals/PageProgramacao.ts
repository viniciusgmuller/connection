import type { GlobalConfig } from "payload";

export const PageProgramacao: GlobalConfig = {
  slug: "page-programacao",
  access: { read: () => true },
  fields: [
    {
      type: "group",
      name: "hero",
      fields: [
        { name: "title", type: "text", defaultValue: "Programação" },
        { name: "subtitle", type: "textarea" },
      ],
    },
    {
      type: "group",
      name: "disclaimer",
      fields: [
        { name: "text", type: "text", defaultValue: "* Programação sujeita a alterações. Última atualização: Março/2026" },
      ],
    },
  ],
};
