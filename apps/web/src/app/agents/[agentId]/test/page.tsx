import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth";
import { getAgentBySlugOrIdForUser } from "@/lib/agent-data";
import AgentTestClient from "./test-client";

export default async function AgentTestPage({ params }: { params: Promise<{ agentId: string }> }) {
  const session = await requireSession();
  const { agentId } = await params;
  const agent = await getAgentBySlugOrIdForUser(session.email, agentId);

  if (!agent) notFound();

  return (
    <AgentTestClient
      agent={{
        id: agent.id,
        name: agent.name,
        slug: agent.slug,
        description: agent.description,
        systemPrompt: agent.systemPrompt,
        firstMessage: agent.firstMessage,
        voiceModel: agent.voiceModel,
        status: agent.status,
      }}
    />
  );
}
