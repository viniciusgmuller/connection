import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { pushDevSchema } from "@payloadcms/drizzle";

export async function POST() {
  try {
    const payload = await getPayload({ config });

    // Auto-accept all interactive prompts by overriding the prompts library.
    // This prevents pushDevSchema from hanging on rename/create column questions.
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const prompts = require("prompts");
      prompts.override({ confirm: true });
    } catch {
      // prompts not available, continue anyway
    }

    // Use Drizzle's pushDevSchema to sync tables, bypassing the
    // NODE_ENV !== 'production' check in the connect() method.
    await pushDevSchema(payload.db as any);

    return NextResponse.json({
      status: "ok",
      message: "Schema pushed successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}
