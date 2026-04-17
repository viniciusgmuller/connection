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
    { name: "hiddenTypes", type: "select", hasMany: true, label: "Tipos ocultos no filtro", admin: {
      description: "Selecione tipos de evento que não devem aparecer como botão de filtro na programação.",
    }, options: [
      { label: "Palestra", value: "palestra" },
      { label: "Workshop", value: "workshop" },
      { label: "Networking", value: "networking" },
      { label: "Intervalo", value: "break" },
      { label: "Especial", value: "special" },
    ]},
  ],
};
