import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth";
import { getAgentBySlugOrIdForUser } from "@/lib/agent-data";
import { prisma } from "@/lib/db";
import AgentDetailClient from "./agent-detail-client";

export default async function AgentDetailPage({ params }: { params: Promise<{ agentId: string }> }) {
  const session = await requireSession();
  const { agentId } = await params;
  const agent = await getAgentBySlugOrIdForUser(session.email, agentId);

  if (!agent) notFound();

  const [totalCalls, completedCalls] = await Promise.all([
    prisma.call.count({ where: { agentId: agent.id } }).catch(() => 0),
    prisma.call.count({ where: { agentId: agent.id, status: "COMPLETED" } }).catch(() => 0),
  ]);

  return (
    <AgentDetailClient
      agent={{
        id: agent.id,
        name: agent.name,
        slug: agent.slug,
        description: agent.description,
        systemPrompt: agent.systemPrompt,
        firstMessage: agent.firstMessage,
        voiceModel: agent.voiceModel,
        status: agent.status,
        isActive: agent.isActive,
        transferNumber: agent.transferNumber,
        createdAt: agent.createdAt.toISOString(),
        updatedAt: agent.updatedAt.toISOString(),
        phoneNumbers: agent.phoneNumbers.map((p) => ({
          id: p.id,
          phoneNumber: p.phoneNumber,
          friendlyName: p.friendlyName,
        })),
        calls: agent.calls.map((c) => ({
          id: c.id,
          callerNumber: c.callerNumber,
          status: c.status,
          durationSeconds: c.durationSeconds,
          createdAt: c.createdAt.toISOString(),
        })),
        totalCalls,
        completedCalls,
      }}
    />
  );
}
