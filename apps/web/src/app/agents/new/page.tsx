import { requireSession } from "@/lib/auth";
import NewAgentRouter from "./new-agent-router";

export default async function NewAgentPage() {
  await requireSession();

  return <NewAgentRouter />;
}
