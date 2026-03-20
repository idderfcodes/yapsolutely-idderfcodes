import { NextResponse } from "next/server";
import { getWebHealthSummary } from "@/lib/settings-data";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getWebHealthSummary(), {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}