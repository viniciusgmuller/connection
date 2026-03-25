import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Configurações do Site",
  access: { read: () => true },
  fields: [
    {
      type: "group", name: "event", label: "Evento",
      fields: [
        { name: "eventName", type: "text", label: "Nome do Evento", defaultValue: "Connection Experience" },
        { name: "startDate", type: "date", label: "Data de Início" },
        { name: "endDate", type: "date", label: "Data de Término" },
        { name: "location", type: "text", label: "Localização", defaultValue: "Gramado, Rio Grande do Sul" },
        { name: "venue", type: "text", label: "Venue", defaultValue: "Serra Gaúcha" },
        { name: "edition", type: "text", label: "Edição", defaultValue: "2026" },
        {
          name: "phase", type: "select", label: "Fase do Evento", defaultValue: "pre-event",
          options: [
            { label: "Pré-evento", value: "pre-event" },
            { label: "Durante o evento", value: "during" },
            { label: "Pós-evento", value: "post-event" },
          ],
        },
        { name: "mapsUrl", type: "text", label: "URL do Google Maps" },
      ],
    },
    {
      type: "group", name: "contact", label: "Contato",
      fields: [
        { name: "mainEmail", type: "text", label: "Email Principal", defaultValue: "contato@connectionexperience.com.br" },
        { name: "businessEmail", type: "text", label: "Email de Negócios", defaultValue: "negocios@connectionexperience.com.br" },
        { name: "groupSalesEmail", type: "text", label: "Email Vendas para Grupos", defaultValue: "grupos@connectionexperience.com.br" },
        { name: "whatsapp", type: "text", label: "WhatsApp", defaultValue: "5554999999999" },
      ],
    },
    {
      type: "group", name: "hospitality", label: "Hospitalidade",
      fields: [
        { name: "officialHotel", type: "text", label: "Hotel Oficial", defaultValue: "Laghetto" },
      ],
    },
  ],
};
