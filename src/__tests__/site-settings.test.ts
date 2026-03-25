import { describe, it, expect } from "vitest";

const API_URL =
  process.env.PAYLOAD_API_URL || "https://connection.duckstudio.design";

async function api(path: string) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
  });
  return { status: res.status, data: await res.json() };
}

describe("Site Settings global", () => {
  it("endpoint exists and returns data", async () => {
    const { status, data } = await api("/api/globals/site-settings");
    expect(status).toBe(200);
    expect(data).toBeDefined();
    expect(data.globalType).toBe("site-settings");
  });
});
