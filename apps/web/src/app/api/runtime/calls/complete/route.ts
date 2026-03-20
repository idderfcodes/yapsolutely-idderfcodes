import { CallStatus, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type CompleteCallPayload = {
  externalCallId?: string;
  status?: keyof typeof CallStatus;
  durationSeconds?: number | null;
  summary?: string | null;
  transcriptText?: string | null;
  endedAt?: string;
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
    return CallStatus.COMPLETED;
  }

  return CallStatus[status] ?? CallStatus.COMPLETED;
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

  const payload = (await request.json()) as CompleteCallPayload;

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
      ...(payload.status !== undefined ? { status } : {}),
      ...(payload.durationSeconds !== undefined ? { durationSeconds: payload.durationSeconds ?? null } : {}),
      ...(payload.summary !== undefined ? { summary: payload.summary ?? null } : {}),
      ...(payload.transcriptText !== undefined ? { transcriptText: payload.transcriptText ?? null } : {}),
      ...(payload.endedAt ? { endedAt: new Date(payload.endedAt) } : {}),
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
            status,
            durationSeconds: payload.durationSeconds ?? null,
            summary: payload.summary ?? null,
            transcriptText: payload.transcriptText ?? null,
            endedAt: payload.endedAt ? new Date(payload.endedAt) : new Date(),
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
    return NextResponse.json({ error: "Failed to persist call completion" }, { status: 500 });
  }
}