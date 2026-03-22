import { requireSession } from "@/lib/auth";
import BatchCallsClient from "./batch-calls-client";

export default async function BatchCallsPage() {
  await requireSession();
  return <BatchCallsClient />;
}
