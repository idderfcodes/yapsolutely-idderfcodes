import { CallEventRole, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type CallEventPayload = {
  externalCallId?: string;
  role?: keyof typeof CallEventRole;
  sequence?: number;
  text?: string | null;
  startedAt?: string;
  endedAt?: string;
  payload?: Record<string, unknown>;
};

function isAuthorized(request: NextRequest) {
  const runtimeSecret = process.env.RUNTIME_SHARED_SECRET;
  const providedSecret = request.headers.get("x-yapsolutely-runtime-secret");
  return Boolean(runtimeSecret && providedSecret === runtimeSecret);
}

function toJsonValue(value: Record<string, unknown> | undefined) {
  return value ? (value as Prisma.InputJsonValue) : undefined;
}

function normalizeRole(role?: keyof typeof CallEventRole) {
  if (!role) {
    return CallEventRole.SYSTEM;
  }

  return CallEventRole[role] ?? CallEventRole.SYSTEM;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json()) as CallEventPayload;

  if (!payload.externalCallId) {
    return NextResponse.json({ error: "Missing externalCallId" }, { status: 400 });
  }

  try {
    const call = await prisma.call.findUnique({
      where: {
        externalCallId: payload.externalCallId,
      },
      select: {
        id: true,
        transcriptText: true,
      },
    });

    if (!call) {
      return NextResponse.json({ error: "Call not found" }, { status: 404 });
    }

    const existingCount = await prisma.callEvent.count({
      where: {
        callId: call.id,
      },
    });

    const sequence = typeof payload.sequence === "number" ? payload.sequence : existingCount + 1;
    const role = normalizeRole(payload.role);
    const text = payload.text?.trim() || null;

    const event = await prisma.callEvent.upsert({
      where: {
        callId_sequence: {
          callId: call.id,
          sequence,
        },
      },
      update: {
        role,
        text,
        payload: toJsonValue(payload.payload),
        startedAt: payload.startedAt ? new Date(payload.startedAt) : undefined,
        endedAt: payload.endedAt ? new Date(payload.endedAt) : undefined,
      },
      create: {
        callId: call.id,
        sequence,
        role,
        text,
        payload: toJsonValue(payload.payload),
        startedAt: payload.startedAt ? new Date(payload.startedAt) : undefined,
        endedAt: payload.endedAt ? new Date(payload.endedAt) : undefined,
      },
      select: {
        id: true,
        sequence: true,
        role: true,
        text: true,
      },
    });

    if (text) {
      const roleLabel = role.toLowerCase();
      const line = `${roleLabel}: ${text}`;
      const transcriptText = call.transcriptText ? `${call.transcriptText}\n${line}` : line;

      await prisma.call.update({
        where: {
          id: call.id,
        },
        data: {
          transcriptText,
        },
      });
    }

    return NextResponse.json({ event });
  } catch {
    return NextResponse.json({ error: "Failed to persist call event" }, { status: 500 });
  }
}