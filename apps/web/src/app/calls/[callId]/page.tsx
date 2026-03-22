import { notFound } from "next/navigation";
import { requireSession } from "@/lib/auth";
import { getCallByIdForUser } from "@/lib/call-data";
import CallDetailClient from "./call-detail-client";

export default async function CallDetailPage({
  params,
}: {
  params: Promise<{ callId: string }>;
}) {
  const session = await requireSession();
  const { callId } = await params;
  const call = await getCallByIdForUser(session.email, callId);

  if (!call) notFound();

  return (
    <CallDetailClient
      call={{
        id: call.id,
        callerNumber: call.callerNumber,
        toNumber: call.toNumber,
        status: call.status,
        durationSeconds: call.durationSeconds,
        summary: call.summary,
        transcriptText: call.transcriptText,
        createdAt: call.createdAt.toISOString(),
        startedAt: call.startedAt?.toISOString() ?? null,
        endedAt: call.endedAt?.toISOString() ?? null,
        agentName: call.agent?.name ?? null,
        phoneNumber: call.phoneNumber?.phoneNumber ?? null,
        events: call.events.map((e) => ({
          id: e.id,
          role: e.role,
          sequence: e.sequence,
          text: e.text,
          createdAt: e.createdAt.toISOString(),
        })),
      }}
    />
  );
}
