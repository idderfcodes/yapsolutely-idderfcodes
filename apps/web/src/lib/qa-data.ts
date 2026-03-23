import { prisma } from "@/lib/db";

export type QACallScore = {
  callId: string;
  agentName: string;
  callerNumber: string | null;
  score: number;
  status: "passed" | "flagged";
  durationSeconds: number;
  transcriptLength: number;
  eventCount: number;
  createdAt: string;
};

export type QASummary = {
  totalReviewed: number;
  passed: number;
  flagged: number;
  avgScore: number;
  calls: QACallScore[];
};

/**
 * Compute a simple QA score (0-100) for a completed call based on:
 * - Call was completed (base 30 pts)
 * - Duration >= 30s (20 pts)
 * - Has transcript text (20 pts)
 * - Transcript has agent turns (15 pts)
 * - Has summary (15 pts)
 */
function computeQAScore(call: {
  status: string;
  durationSeconds: number | null;
  transcriptText: string | null;
  summary: string | null;
  _count: { events: number };
}): number {
  let score = 0;
  if (call.status === "COMPLETED") score += 30;
  if (call.durationSeconds && call.durationSeconds >= 30) score += 20;
  else if (call.durationSeconds && call.durationSeconds >= 10) score += 10;
  if (call.transcriptText && call.transcriptText.length > 50) score += 20;
  else if (call.transcriptText && call.transcriptText.length > 0) score += 10;
  if (call._count.events >= 4) score += 15;
  else if (call._count.events >= 2) score += 8;
  if (call.summary && call.summary.length > 20) score += 15;
  else if (call.summary) score += 8;
  return Math.min(score, 100);
}

export async function getQAForUser(email: string): Promise<QASummary> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) return emptySummary();

    const calls = await prisma.call.findMany({
      where: {
        userId: user.id,
        status: { in: ["COMPLETED", "FAILED", "NO_ANSWER"] },
      },
      select: {
        id: true,
        status: true,
        durationSeconds: true,
        callerNumber: true,
        transcriptText: true,
        summary: true,
        createdAt: true,
        agent: { select: { name: true } },
        _count: { select: { events: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const scored: QACallScore[] = calls.map((call) => {
      const score = computeQAScore(call);
      return {
        callId: call.id,
        agentName: call.agent?.name || "Unassigned",
        callerNumber: call.callerNumber,
        score,
        status: score >= 60 ? "passed" : "flagged",
        durationSeconds: call.durationSeconds || 0,
        transcriptLength: call.transcriptText?.length || 0,
        eventCount: call._count.events,
        createdAt: call.createdAt.toISOString(),
      };
    });

    const totalReviewed = scored.length;
    const passed = scored.filter((c) => c.status === "passed").length;
    const flagged = totalReviewed - passed;
    const avgScore =
      totalReviewed > 0
        ? Math.round(
            scored.reduce((a, b) => a + b.score, 0) / totalReviewed,
          )
        : 0;

    return { totalReviewed, passed, flagged, avgScore, calls: scored };
  } catch {
    return emptySummary();
  }
}

function emptySummary(): QASummary {
  return { totalReviewed: 0, passed: 0, flagged: 0, avgScore: 0, calls: [] };
}
