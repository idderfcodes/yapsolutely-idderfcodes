import { requireSession } from "@/lib/auth";
import { listRecentCallsForUser } from "@/lib/call-data";
import CallsClient from "./calls-client";

export default async function CallsPage() {
  const session = await requireSession();
  const calls = await listRecentCallsForUser(session.email);

  const serialized = calls.map((c) => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
  }));

  return <CallsClient calls={serialized} />;
}
