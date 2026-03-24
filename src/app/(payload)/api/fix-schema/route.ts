import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { sql } from "drizzle-orm";

export async function POST() {
  try {
    const payload = await getPayload({ config });
    const db = payload.db.drizzle;
    const schema = payload.db.schema;

    const results: string[] = [];

    // Get existing tables
    const existingTables = await db.execute(sql`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public'
    `);
    const tableNames = new Set(
      existingTables.rows.map((r: any) => r.table_name)
    );

    // Check which schema tables are missing
    for (const [key, table] of Object.entries(schema)) {
      if (!table || typeof table !== "object") continue;
      const tableName = (table as any)[Symbol.for("drizzle:Name")] || key;
      if (typeof tableName !== "string") continue;

      if (!tableNames.has(tableName)) {
        results.push(`Missing table: ${tableName}`);
      }
    }

    if (results.length === 0) {
      return NextResponse.json({ status: "ok", message: "All tables exist" });
    }

    // Run Payload migrate to create tables
    try {
      await payload.db.migrate();
      results.push("Migration completed");
    } catch (e: any) {
      results.push(`Migration error: ${e.message}`);

      // Fallback: try createMigration + migrate
      try {
        await payload.db.createMigration({
          forceAcceptWarning: true,
          file: "auto_" + Date.now(),
          payload,
        });
        await payload.db.migrate();
        results.push("Fallback migration completed");
      } catch (e2: any) {
        results.push(`Fallback error: ${e2.message}`);
      }
    }

    return NextResponse.json({ status: "ok", results });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
