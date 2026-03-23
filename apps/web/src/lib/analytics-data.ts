import { prisma } from "@/lib/db";

export type AnalyticsSummary = {
  totalCalls: number;
  completedCalls: number;
  avgDurationSeconds: number;
  successRate: number;
  callsByDay: { date: string; count: number }[];
  agentPerformance: {
    agentName: string;
    totalCalls: number;
    avgDuration: number;
    successRate: number;
  }[];
};

export async function getAnalyticsForUser(
  email: string,
  days: number = 30,
): Promise<AnalyticsSummary> {
  const since = new Date();
  since.setDate(since.getDate() - days);

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) {
      return emptyAnalytics();
    }

    const calls = await prisma.call.findMany({
      where: {
        userId: user.id,
        createdAt: { gte: since },
      },
      select: {
        id: true,
        status: true,
        durationSeconds: true,
        createdAt: true,
        agent: { select: { name: true } },
      },
      orderBy: { createdAt: "asc" },
    });

    const totalCalls = calls.length;
    const completedCalls = calls.filter((c) => c.status === "COMPLETED").length;
    const durations = calls
      .filter((c) => c.durationSeconds != null && c.durationSeconds > 0)
      .map((c) => c.durationSeconds!);
    const avgDurationSeconds =
      durations.length > 0
        ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
        : 0;
    const successRate =
      totalCalls > 0 ? Math.round((completedCalls / totalCalls) * 100) : 0;

    // Group by day
    const dayMap = new Map<string, number>();
    for (const call of calls) {
      const day = call.createdAt.toISOString().slice(0, 10);
      dayMap.set(day, (dayMap.get(day) || 0) + 1);
    }
    const callsByDay = Array.from(dayMap.entries()).map(([date, count]) => ({
      date,
      count,
    }));

    // Agent performance
    const agentMap = new Map<
      string,
      { total: number; completed: number; durations: number[] }
    >();
    for (const call of calls) {
      const name = call.agent?.name || "Unassigned";
      const entry = agentMap.get(name) || {
        total: 0,
        completed: 0,
        durations: [],
      };
      entry.total++;
      if (call.status === "COMPLETED") entry.completed++;
      if (call.durationSeconds != null && call.durationSeconds > 0)
        entry.durations.push(call.durationSeconds);
      agentMap.set(name, entry);
    }

    const agentPerformance = Array.from(agentMap.entries())
      .map(([agentName, data]) => ({
        agentName,
        totalCalls: data.total,
        avgDuration:
          data.durations.length > 0
            ? Math.round(
                data.durations.reduce((a, b) => a + b, 0) /
                  data.durations.length,
              )
            : 0,
        successRate:
          data.total > 0
            ? Math.round((data.completed / data.total) * 100)
            : 0,
      }))
      .sort((a, b) => b.totalCalls - a.totalCalls);

    return {
      totalCalls,
      completedCalls,
      avgDurationSeconds,
      successRate,
      callsByDay,
      agentPerformance,
    };
  } catch {
    return emptyAnalytics();
  }
}

function emptyAnalytics(): AnalyticsSummary {
  return {
    totalCalls: 0,
    completedCalls: 0,
    avgDurationSeconds: 0,
    successRate: 0,
    callsByDay: [],
    agentPerformance: [],
  };
}
