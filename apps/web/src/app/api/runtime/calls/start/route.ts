import { CallDirection, CallStatus, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type StartCallPayload = {
  externalCallId?: string;
  callerNumber?: string;
  toNumber?: string;
  userId?: string | null;
  agentId?: string | null;
  phoneNumberId?: string | null;
  status?: keyof typeof CallStatus;
  startedAt?: string;
  answeredAt?: string;
  metadata?: Record<string, unknown>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeMetadata(
  existingMetadata: Prisma.JsonValue | null | undefined,
  incomingMetadata: Record<string, unknown> | undefined,
) {
  if (incomingMetadata === undefined) {
    return undefined;
  }

  const base = isRecord(existingMetadata) ? existingMetadata : {};
  return {
    ...base,
    ...incomingMetadata,
  } as Prisma.InputJsonValue;
}

function toJsonValue(value: Record<string, unknown> | undefined) {
  return value ? (value as Prisma.InputJsonValue) : undefined;
}

function normalizeStatus(status?: keyof typeof CallStatus) {
  if (!status) {
    return CallStatus.RINGING;
  }

  return CallStatus[status] ?? CallStatus.RINGING;
}

function isAuthorized(request: NextRequest) {
  const runtimeSecret = process.env.RUNTIME_SHARED_SECRET;
  const providedSecret = request.headers.get("x-yapsolutely-runtime-secret");
  return Boolean(runtimeSecret && providedSecret === runtimeSecret);
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json()) as StartCallPayload;

  if (!payload.externalCallId) {
    return NextResponse.json({ error: "Missing externalCallId" }, { status: 400 });
  }

  try {
    const status = normalizeStatus(payload.status);
    const existingCall = await prisma.call.findUnique({
      where: {
        externalCallId: payload.externalCallId,
      },
      select: {
        id: true,
        metadata: true,
      },
    });
    const mergedMetadata = mergeMetadata(existingCall?.metadata, payload.metadata);
    const updateData: Prisma.CallUpdateInput = {
      ...(payload.callerNumber !== undefined ? { callerNumber: payload.callerNumber ?? null } : {}),
      ...(payload.toNumber !== undefined ? { toNumber: payload.toNumber ?? null } : {}),
      ...(payload.userId !== undefined ? { userId: payload.userId ?? null } : {}),
      ...(payload.agentId !== undefined ? { agentId: payload.agentId ?? null } : {}),
      ...(payload.phoneNumberId !== undefined ? { phoneNumberId: payload.phoneNumberId ?? null } : {}),
      ...(payload.status !== undefined ? { status } : {}),
      ...(payload.startedAt ? { startedAt: new Date(payload.startedAt) } : {}),
      ...(payload.answeredAt ? { answeredAt: new Date(payload.answeredAt) } : {}),
      ...(mergedMetadata !== undefined ? { metadata: mergedMetadata } : {}),
    };

    const call = existingCall
      ? await prisma.call.update({
          where: {
            externalCallId: payload.externalCallId,
          },
          data: updateData,
          select: {
            id: true,
            externalCallId: true,
            status: true,
          },
        })
      : await prisma.call.create({
          data: {
            externalCallId: payload.externalCallId,
            callerNumber: payload.callerNumber ?? null,
            toNumber: payload.toNumber ?? null,
            userId: payload.userId ?? null,
            agentId: payload.agentId ?? null,
            phoneNumberId: payload.phoneNumberId ?? null,
            direction: CallDirection.INBOUND,
            status,
            startedAt: payload.startedAt ? new Date(payload.startedAt) : new Date(),
            answeredAt: payload.answeredAt ? new Date(payload.answeredAt) : undefined,
            metadata: payload.metadata !== undefined ? toJsonValue(payload.metadata) : undefined,
          },
          select: {
            id: true,
            externalCallId: true,
            status: true,
          },
        });

    return NextResponse.json({ call });
  } catch {
    return NextResponse.json({ error: "Failed to persist call start" }, { status: 500 });
  }
}