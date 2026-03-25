import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "group",
      name: "event",
      fields: [
        { name: "eventName", type: "text", defaultValue: "Connection Experience" },
        { name: "startDate", type: "date" },
        { name: "endDate", type: "date" },
        { name: "location", type: "text", defaultValue: "Gramado, Rio Grande do Sul" },
        { name: "venue", type: "text", defaultValue: "Serra Gaúcha" },
        { name: "edition", type: "text", defaultValue: "2026" },
        {
          name: "phase",
          type: "select",
          defaultValue: "pre-event",
          options: [
            { label: "Pré-evento", value: "pre-event" },
            { label: "Durante o evento", value: "during" },
            { label: "Pós-evento", value: "post-event" },
          ],
        },
        { name: "mapsUrl", type: "text" },
      ],
    },
    {
      type: "group",
      name: "contact",
      fields: [
        { name: "mainEmail", type: "text", defaultValue: "contato@connectionexperience.com.br" },
        { name: "businessEmail", type: "text", defaultValue: "negocios@connectionexperience.com.br" },
        { name: "groupSalesEmail", type: "text", defaultValue: "grupos@connectionexperience.com.br" },
        { name: "whatsapp", type: "text", defaultValue: "5554999999999" },
      ],
    },
    {
      type: "group",
      name: "hospitality",
      fields: [
        { name: "officialHotel", type: "text", defaultValue: "Laghetto" },
      ],
    },
  ],
};
