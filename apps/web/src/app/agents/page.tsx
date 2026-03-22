import { requireSession } from "@/lib/auth";
import { listAgentsForUser } from "@/lib/agent-data";
import AgentsClient from "./agents-client";

export default async function AgentsPage() {
  const session = await requireSession();
  const agents = await listAgentsForUser(session.email);

  return <AgentsClient agents={agents} />;
}
