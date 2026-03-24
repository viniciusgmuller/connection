import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST() {
  try {
    const payload = await getPayload({ config });

    // payload.db.push syncs the schema (creates missing tables/columns)
    // This is the same as push: true but callable in production
    if (typeof (payload.db as any).push === "function") {
      await (payload.db as any).push({ forceAcceptWarning: true });
      return NextResponse.json({ status: "ok", message: "Schema push completed" });
    }

    return NextResponse.json({ status: "ok", message: "Push not available" });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }
}
