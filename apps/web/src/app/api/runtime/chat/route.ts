import { NextRequest, NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

const voiceRuntimeUrl = process.env.VOICE_RUNTIME_URL || process.env.NEXT_PUBLIC_VOICE_RUNTIME_URL || "http://localhost:3001";
const runtimeSharedSecret = process.env.RUNTIME_SHARED_SECRET || "";

export async function POST(req: NextRequest) {
  const session = await requireSession();

  let body: { agentId?: string; messages?: { role: string; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { agentId, messages } = body;

  if (!agentId || !Array.isArray(messages)) {
    return NextResponse.json({ error: "Missing agentId or messages" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 403 });
  }

  const agent = await prisma.agent.findFirst({
    where: { id: agentId, userId: user.id },
  });

  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  const sanitizedMessages = messages.slice(-20).map((m) => ({
    role: m.role === "user" ? "user" : "assistant",
    content: String(m.content || "").slice(0, 2000),
  }));

  try {
    const response = await fetch(`${voiceRuntimeUrl.replace(/\/$/, "")}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-yapsolutely-runtime-secret": runtimeSharedSecret,
      },
      body: JSON.stringify({
        agent: {
          id: agent.id,
          name: agent.name,
          description: agent.description,
          systemPrompt: agent.systemPrompt,
          firstMessage: agent.firstMessage,
          voiceModel: agent.voiceModel,
          transferNumber: agent.transferNumber,
          language: "en-US",
        },
        messages: sanitizedMessages,
      }),
      signal: AbortSignal.timeout(35000),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error || "Voice runtime error", detail: data?.detail },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Could not reach voice runtime" },
      { status: 502 },
    );
  }
}
