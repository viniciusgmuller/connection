import { describe, it, expect } from "vitest";

const API_URL =
  process.env.PAYLOAD_API_URL || "https://www.connectionexperience.com.br";

async function api(path: string) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
  });
  return { status: res.status, data: await res.json() };
}

describe("Site Settings global", () => {
  it("endpoint exists and returns all groups", async () => {
    const { status, data } = await api("/api/globals/site-settings");
    expect(status).toBe(200);
    expect(data).toHaveProperty("event");
    expect(data).toHaveProperty("contact");
    expect(data).toHaveProperty("hospitality");
  });

  it("returns Event group with correct fields", async () => {
    const { data } = await api("/api/globals/site-settings");
    const { event } = data;
    expect(event.eventName).toBe("Connection Experience");
    expect(event.location).toBe("Gramado, Rio Grande do Sul");
    expect(event.venue).toBe("Serra Gaúcha");
    expect(event.edition).toBe("2026");
    expect(event.phase).toBe("pre-event");
  });

  it("returns Contact group with correct fields", async () => {
    const { data } = await api("/api/globals/site-settings");
    const { contact } = data;
    expect(contact.mainEmail).toBe("contato@connectionexperience.com.br");
    expect(contact.businessEmail).toBe("negocios@connectionexperience.com.br");
    expect(contact.groupSalesEmail).toBe("grupos@connectionexperience.com.br");
    expect(contact.whatsapp).toBe("5554999999999");
  });

  it("returns Hospitality group with correct fields", async () => {
    const { data } = await api("/api/globals/site-settings");
    expect(data.hospitality.officialHotel).toBe("Laghetto");
  });
});
