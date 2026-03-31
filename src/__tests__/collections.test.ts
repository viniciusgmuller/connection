import { describe, it, expect } from "vitest";

const API_URL =
  process.env.PAYLOAD_API_URL || "https://www.connectionexperience.com.br";

async function api(path: string) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
  });
  return { status: res.status, data: await res.json() };
}

// --- Collections ---

describe("Speakers collection", () => {
  it("endpoint exists and returns docs array", async () => {
    const { status, data } = await api("/api/speakers?limit=1");
    expect(status).toBe(200);
    expect(data).toHaveProperty("docs");
    expect(Array.isArray(data.docs)).toBe(true);
  });
});

describe("ScheduleEvents collection", () => {
  it("endpoint exists and returns docs array", async () => {
    const { status, data } = await api("/api/schedule-events?limit=1");
    expect(status).toBe(200);
    expect(data).toHaveProperty("docs");
    expect(Array.isArray(data.docs)).toBe(true);
  });
});

describe("Tickets collection", () => {
  it("endpoint exists and returns docs array", async () => {
    const { status, data } = await api("/api/tickets?limit=1");
    expect(status).toBe(200);
    expect(data).toHaveProperty("docs");
    expect(Array.isArray(data.docs)).toBe(true);
  });
});

describe("PartnerTiers collection", () => {
  it("endpoint exists and returns docs array", async () => {
    const { status, data } = await api("/api/partner-tiers?limit=1");
    expect(status).toBe(200);
    expect(data).toHaveProperty("docs");
    expect(Array.isArray(data.docs)).toBe(true);
  });
});

describe("Partners collection", () => {
  it("endpoint exists and returns docs array", async () => {
    const { status, data } = await api("/api/partners?limit=1");
    expect(status).toBe(200);
    expect(data).toHaveProperty("docs");
    expect(Array.isArray(data.docs)).toBe(true);
  });
});

describe("ProductCategories collection", () => {
  it("endpoint exists and returns docs array", async () => {
    const { status, data } = await api("/api/product-categories?limit=1");
    expect(status).toBe(200);
    expect(data).toHaveProperty("docs");
    expect(Array.isArray(data.docs)).toBe(true);
  });
});

describe("Products collection", () => {
  it("endpoint exists and returns docs array", async () => {
    const { status, data } = await api("/api/products?limit=1");
    expect(status).toBe(200);
    expect(data).toHaveProperty("docs");
    expect(Array.isArray(data.docs)).toBe(true);
  });
});

describe("Testimonials collection", () => {
  it("endpoint exists and returns docs array", async () => {
    const { status, data } = await api("/api/testimonials?limit=1");
    expect(status).toBe(200);
    expect(data).toHaveProperty("docs");
    expect(Array.isArray(data.docs)).toBe(true);
  });

  it("supports filtering by axis", async () => {
    const { status } = await api(
      "/api/testimonials?where[axis][equals]=conhecer"
    );
    expect(status).toBe(200);
  });
});

describe("FAQ collection", () => {
  it("endpoint exists and returns docs array", async () => {
    const { status, data } = await api("/api/faq?limit=1");
    expect(status).toBe(200);
    expect(data).toHaveProperty("docs");
    expect(Array.isArray(data.docs)).toBe(true);
  });
});

describe("Authors collection", () => {
  it("endpoint exists and returns docs array", async () => {
    const { status, data } = await api("/api/authors?limit=1");
    expect(status).toBe(200);
    expect(data).toHaveProperty("docs");
    expect(Array.isArray(data.docs)).toBe(true);
  });
});

// --- Globals ---

describe("Page Home global", () => {
  it("endpoint exists and returns hero group", async () => {
    const { status, data } = await api("/api/globals/page-home");
    expect(status).toBe(200);
    expect(data).toHaveProperty("hero");
    expect(data.hero).toHaveProperty("headline");
    expect(data.hero).toHaveProperty("preEventCta");
    expect(data.hero).toHaveProperty("duringEventCta");
    expect(data.hero).toHaveProperty("postEventCta");
  });

  it("returns SeloIG and CredencialCTA groups", async () => {
    const { data } = await api("/api/globals/page-home");
    expect(data).toHaveProperty("seloIG");
    expect(data).toHaveProperty("credencialCta");
    expect(data).toHaveProperty("oQueEIG");
    expect(data).toHaveProperty("ctaFinal");
    expect(data).toHaveProperty("infoPraticas");
  });
});

describe("Page Conhecer global", () => {
  it("endpoint exists with all groups", async () => {
    const { status, data } = await api("/api/globals/page-conhecer");
    expect(status).toBe(200);
    expect(data).toHaveProperty("hero");
    expect(data).toHaveProperty("features");
    expect(data).toHaveProperty("speakersSection");
    expect(data).toHaveProperty("testimonialsSection");
    expect(data).toHaveProperty("cta");
  });
});

describe("Page Experimentar global", () => {
  it("endpoint exists with all groups", async () => {
    const { status, data } = await api("/api/globals/page-experimentar");
    expect(status).toBe(200);
    expect(data).toHaveProperty("hero");
    expect(data).toHaveProperty("features");
    expect(data).toHaveProperty("experiences");
    expect(data).toHaveProperty("productsSection");
    expect(data).toHaveProperty("cta");
  });
});

describe("Page Negociar global", () => {
  it("endpoint exists with all groups", async () => {
    const { status, data } = await api("/api/globals/page-negociar");
    expect(status).toBe(200);
    expect(data).toHaveProperty("hero");
    expect(data).toHaveProperty("features");
    expect(data).toHaveProperty("benefits");
    expect(data).toHaveProperty("process");
    expect(data).toHaveProperty("cta");
  });
});

describe("Page Ingressos global", () => {
  it("endpoint exists with all groups", async () => {
    const { status, data } = await api("/api/globals/page-ingressos");
    expect(status).toBe(200);
    expect(data).toHaveProperty("hero");
    expect(data).toHaveProperty("groupSales");
    expect(data).toHaveProperty("cta");
  });
});

describe("Page Programação global", () => {
  it("endpoint exists with all groups", async () => {
    const { status, data } = await api("/api/globals/page-programacao");
    expect(status).toBe(200);
    expect(data).toHaveProperty("hero");
    expect(data).toHaveProperty("disclaimer");
  });
});

describe("Navigation & Footer global", () => {
  it("endpoint exists with navigation and footer groups", async () => {
    const { status, data } = await api("/api/globals/navigation-footer");
    expect(status).toBe(200);
    expect(data).toHaveProperty("navigation");
    expect(data).toHaveProperty("footer");
    expect(data.footer).toHaveProperty("tagline");
  });
});
