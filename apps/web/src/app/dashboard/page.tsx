import { requireSession } from "@/lib/auth";
import { getDashboardMetrics } from "@/lib/dashboard-data";
import DashboardHome from "./dashboard-client";

export default async function DashboardPage() {
  const session = await requireSession();
  const metrics = await getDashboardMetrics(session.email);

  return (
    <DashboardHome
      metrics={{
        activeAgents: metrics.activeAgents,
        assignedNumbers: metrics.assignedNumbers,
        callsToday: metrics.callsToday,
        completedCalls: metrics.completedCalls,
        failedCalls: metrics.failedCalls,
        toolActionsToday: metrics.toolActionsToday,
        runtimeStatus: metrics.runtimeStatus,
        callVolume: metrics.callVolume,
        recentCalls: metrics.recentCalls.map((c) => ({
          ...c,
          createdAt: c.createdAt.toISOString(),
        })),
      }}
    />
  );
}
