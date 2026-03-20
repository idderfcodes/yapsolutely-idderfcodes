import { prisma } from "@/lib/db";

export type CallListFilters = {
  query?: string;
  status?: string;
};

export type RecentCallListItem = {
  id: string;
  externalCallId: string | null;
  callerNumber: string | null;
  toNumber: string | null;
  status: string;
  durationSeconds: number | null;
  createdAt: Date;
  agentName: string | null;
  transcriptPreview: string | null;
};

export async function listRecentCallsForUser(
  email: string,
  filters: CallListFilters = {},
): Promise<RecentCallListItem[]> {
  const query = filters.query?.trim() || "";
  const normalizedStatus = filters.status?.trim().toUpperCase() || "";

  try {
    return await prisma.call.findMany({
      where: {
        user: {
          email,
        },
        ...(normalizedStatus ? { status: normalizedStatus as never } : {}),
        ...(query
          ? {
              OR: [
                {
                  callerNumber: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  toNumber: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  externalCallId: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  transcriptText: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  summary: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  agent: {
                    name: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                },
              ],
            }
          : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 25,
      select: {
        id: true,
        externalCallId: true,
        callerNumber: true,
        toNumber: true,
        status: true,
        durationSeconds: true,
        createdAt: true,
        transcriptText: true,
        agent: {
          select: {
            name: true,
          },
        },
      },
    }).then((calls) =>
      calls.map((call) => ({
        id: call.id,
        externalCallId: call.externalCallId,
        callerNumber: call.callerNumber,
        toNumber: call.toNumber,
        status: call.status,
        durationSeconds: call.durationSeconds,
        createdAt: call.createdAt,
        agentName: call.agent?.name ?? null,
        transcriptPreview: call.transcriptText?.slice(0, 120) ?? null,
      })),
    );
  } catch {
    return [];
  }
}

export async function getCallByIdForUser(email: string, callId: string) {
  try {
    return await prisma.call.findFirst({
      where: {
        id: callId,
        user: {
          email,
        },
      },
      include: {
        agent: {
          select: {
            id: true,
            name: true,
          },
        },
        phoneNumber: {
          select: {
            id: true,
            phoneNumber: true,
            friendlyName: true,
          },
        },
        events: {
          orderBy: [
            {
              sequence: "asc",
            },
            {
              createdAt: "asc",
            },
          ],
        },
      },
    });
  } catch {
    return null;
  }
}