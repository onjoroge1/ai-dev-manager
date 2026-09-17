import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "ai-dev-manager",
    timestamp: new Date().toISOString(),
  });
}
