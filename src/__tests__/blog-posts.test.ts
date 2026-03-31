import { describe, it, expect } from "vitest";

const API_URL =
  process.env.PAYLOAD_API_URL || "https://www.connectionexperience.com.br";

async function api(path: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  return { status: res.status, data: await res.json() };
}

describe("Payload CMS - BlogPosts collection", () => {
  it("REST API /api/blog-posts endpoint exists and responds", async () => {
    const { status, data } = await api("/api/blog-posts?limit=1");
    expect(status).toBe(200);
    expect(data).toHaveProperty("docs");
    expect(data).toHaveProperty("totalDocs");
    expect(Array.isArray(data.docs)).toBe(true);
  });

  it("returns correct pagination structure", async () => {
    const { data } = await api("/api/blog-posts?limit=1&page=1");
    expect(data).toHaveProperty("page");
    expect(data).toHaveProperty("totalPages");
    expect(data).toHaveProperty("hasNextPage");
    expect(data).toHaveProperty("hasPrevPage");
    expect(data).toHaveProperty("limit");
  });

  it("supports filtering by status field", async () => {
    const { status, data } = await api(
      "/api/blog-posts?where[status][equals]=published"
    );
    expect(status).toBe(200);
    expect(data).toHaveProperty("docs");
  });

  it("supports filtering by slug field", async () => {
    const { status, data } = await api(
      "/api/blog-posts?where[slug][equals]=non-existent-slug-xyz"
    );
    expect(status).toBe(200);
    expect(data.docs).toHaveLength(0);
  });

  it("supports sorting by publishedAt", async () => {
    const { status } = await api("/api/blog-posts?sort=-publishedAt");
    expect(status).toBe(200);
  });

  it("supports selecting specific fields (depth=0)", async () => {
    const { status, data } = await api(
      "/api/blog-posts?limit=1&depth=0&select[title]=true&select[slug]=true"
    );
    expect(status).toBe(200);
    expect(data).toHaveProperty("docs");
  });
});

describe("Payload CMS - BlogPosts data integrity", () => {
  it("has imported blog posts from Webflow (148 expected)", async () => {
    const { data } = await api("/api/blog-posts?limit=0");
    expect(data.totalDocs).toBeGreaterThanOrEqual(148);
  });

  it("blog posts have required fields populated", async () => {
    const { data } = await api("/api/blog-posts?limit=5");
    for (const doc of data.docs) {
      expect(doc.title).toBeTruthy();
      expect(doc.slug).toBeTruthy();
      expect(doc.status).toBe("published");
    }
  });

  it("blog posts have SEO metadata", async () => {
    const { data } = await api("/api/blog-posts?limit=5");
    for (const doc of data.docs) {
      expect(doc.seo).toBeDefined();
      expect(doc.seo.metaTitle).toBeTruthy();
    }
  });

  it("blog posts have legacyHtml from Webflow", async () => {
    const { data } = await api("/api/blog-posts?limit=3");
    const withHtml = data.docs.filter(
      (d: any) => d.legacyHtml && d.legacyHtml.length > 0
    );
    expect(withHtml.length).toBeGreaterThan(0);
  });

  it("slugs are unique (no duplicates in first page)", async () => {
    const { data } = await api("/api/blog-posts?limit=50");
    const slugs = data.docs.map((d: any) => d.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });
});

describe("Payload CMS - Media collection", () => {
  it("REST API /api/media endpoint exists and responds", async () => {
    const { status, data } = await api("/api/media?limit=1");
    expect(status).toBe(200);
    expect(data).toHaveProperty("docs");
    expect(Array.isArray(data.docs)).toBe(true);
  });
});

describe("Payload CMS - Users collection (auth)", () => {
  it("REST API /api/users endpoint requires auth", async () => {
    const { status } = await api("/api/users");
    // Should return 401 or 403 without auth token
    expect([401, 403]).toContain(status);
  });
});

describe("Payload CMS - Admin panel", () => {
  it("/admin responds (login or create-first-user)", async () => {
    const res = await fetch(`${API_URL}/admin`, { redirect: "manual" });
    // Should redirect to login or create-first-user
    expect([200, 301, 302, 307, 308]).toContain(res.status);
  });
});

describe("Payload CMS - Health & Schema", () => {
  it("/api/health returns ok", async () => {
    const { status, data } = await api("/api/health");
    expect(status).toBe(200);
    expect(data.status).toBe("ok");
  });
});
