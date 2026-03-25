import type { GlobalConfig } from "payload";

export const PageProgramacao: GlobalConfig = {
  slug: "page-programacao",
  label: "Página Programação",
  access: { read: () => true },
  fields: [
    { type: "group", name: "hero", label: "Hero", fields: [
      { name: "title", type: "text", label: "Título", defaultValue: "Programação" },
      { name: "subtitle", type: "textarea", label: "Subtítulo" },
    ]},
    { type: "group", name: "disclaimer", label: "Aviso", fields: [
      { name: "text", type: "text", label: "Texto", defaultValue: "* Programação sujeita a alterações. Última atualização: Março/2026" },
    ]},
  ],
};
