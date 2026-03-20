import { prisma } from "@/lib/db";

export type DashboardRecentCall = {
  id: string;
  callerNumber: string | null;
  status: string;
  createdAt: Date;
  durationSeconds: number | null;
  agentName: string | null;
  toolEvents: number;
};

export type DashboardRecentToolEvent = {
  id: string;
  callId: string;
  createdAt: Date;
  text: string | null;
  agentName: string | null;
  callerNumber: string | null;
};

export type DashboardMetrics = {
  activeAgents: number;
  assignedNumbers: number;
  callsToday: number;
  completedCalls: number;
  failedCalls: number;
  toolActionsToday: number;
  runtimeStatus: string;
  runtimeNote: string;
  recentCalls: DashboardRecentCall[];
  recentToolEvents: DashboardRecentToolEvent[];
};

export async function getDashboardMetrics(email: string): Promise<DashboardMetrics> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const [activeAgents, assignedNumbers, callsToday, completedCalls, failedCalls, toolActionsToday, recentCalls, recentToolEvents] =
      await prisma.$transaction([
        prisma.agent.count({
          where: {
            isActive: true,
            user: {
              email,
            },
          },
        }),
        prisma.phoneNumber.count({
          where: {
            agentId: { not: null },
            user: {
              email,
            },
          },
        }),
        prisma.call.count({
          where: {
            createdAt: { gte: today },
            user: {
              email,
            },
          },
        }),
        prisma.call.count({
          where: {
            status: "COMPLETED",
            user: {
              email,
            },
          },
        }),
        prisma.call.count({
          where: {
            status: {
              in: ["FAILED", "NO_ANSWER", "BUSY", "CANCELED"],
            },
            user: {
              email,
            },
          },
        }),
        prisma.callEvent.count({
          where: {
            role: "TOOL",
            createdAt: { gte: today },
            call: {
              user: {
                email,
              },
            },
          },
        }),
        prisma.call.findMany({
          where: {
            user: {
              email,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
          select: {
            id: true,
            callerNumber: true,
            status: true,
            createdAt: true,
            durationSeconds: true,
            agent: {
              select: {
                name: true,
              },
            },
            _count: {
              select: {
                events: {
                  where: {
                    role: "TOOL",
                  },
                },
              },
            },
          },
        }),
        prisma.callEvent.findMany({
          where: {
            role: "TOOL",
            call: {
              user: {
                email,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
          select: {
            id: true,
            callId: true,
            createdAt: true,
            text: true,
            call: {
              select: {
                callerNumber: true,
                agent: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        }),
    ]);

    return {
      activeAgents,
      assignedNumbers,
      callsToday,
      completedCalls,
      failedCalls,
      toolActionsToday,
      runtimeStatus: "Online",
      runtimeNote: "Dashboard metrics, recent calls, and runtime tool actions are all Prisma-backed when a database is configured.",
      recentCalls: recentCalls.map((call) => ({
        id: call.id,
        callerNumber: call.callerNumber,
        status: call.status,
        createdAt: call.createdAt,
        durationSeconds: call.durationSeconds,
        agentName: call.agent?.name ?? null,
        toolEvents: call._count.events,
      })),
      recentToolEvents: recentToolEvents.map((event) => ({
        id: event.id,
        callId: event.callId,
        createdAt: event.createdAt,
        text: event.text,
        agentName: event.call.agent?.name ?? null,
        callerNumber: event.call.callerNumber,
      })),
    };
  } catch {
    return {
      activeAgents: 0,
      assignedNumbers: 0,
      callsToday: 0,
      completedCalls: 0,
      failedCalls: 0,
      toolActionsToday: 0,
      runtimeStatus: "Scaffolded",
      runtimeNote:
        "Database credentials are placeholders for now, so metrics and proof surfaces fall back gracefully until Supabase is wired.",
      recentCalls: [],
      recentToolEvents: [],
    };
  }
}