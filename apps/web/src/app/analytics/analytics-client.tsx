"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { BarChart3, TrendingUp, Clock, CheckCircle2, Phone } from "lucide-react";
import type { AnalyticsSummary } from "@/lib/analytics-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

export default function AnalyticsClient({ data }: { data: AnalyticsSummary }) {
  const metrics = [
    {
      label: "Total Calls",
      value: data.totalCalls.toLocaleString(),
      sub: "All time",
      icon: Phone,
    },
    {
      label: "Completed",
      value: data.completedCalls.toLocaleString(),
      sub: "Successful calls",
      icon: CheckCircle2,
    },
    {
      label: "Avg Duration",
      value: data.avgDurationSeconds > 0 ? formatDuration(data.avgDurationSeconds) : "-",
      sub: "All completed",
      icon: Clock,
    },
    {
      label: "Success Rate",
      value: data.totalCalls > 0 ? `${data.successRate}%` : "-",
      sub: "Completed / total",
      icon: TrendingUp,
    },
  ];

  const chartData = data.callsByDay.map((d) => ({
    date: d.date.slice(5), // MM-DD
    calls: d.count,
  }));

  return (
    <DashboardLayout>
      <div className="p-5 sm:p-6 lg:p-8 max-w-7xl">
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="font-display text-[1.38rem] font-semibold tracking-[-0.02em] text-text-strong">
              Analytics
            </h1>
            <p className="font-body text-[0.89rem] text-text-subtle mt-0.5">
              Usage metrics and performance trends.
            </p>
          </div>
        </div>

        {/* ── Metrics strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="bg-surface-panel rounded-lg border border-border-soft/60 px-4 py-3 stagger-item"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <m.icon className="w-3 h-3 text-text-subtle/50" />
                <div className="font-body text-[0.67rem] text-text-subtle/70 uppercase tracking-[0.1em]">
                  {m.label}
                </div>
              </div>
              <div className="font-mono text-[1.15rem] font-semibold text-text-strong">
                {m.value}
              </div>
              <div className="font-body text-[0.67rem] text-text-subtle/50 mt-0.5">
                {m.sub}
              </div>
            </div>
          ))}
        </div>

        {/* ── Call Volume Chart ── */}
        <div className="bg-surface-panel rounded-card border border-border-soft overflow-hidden mb-5">
          <div className="px-4 py-3 border-b border-border-soft/60">
            <h3 className="font-display text-[0.89rem] font-medium text-text-strong">
              Call Volume (Last 30 days)
            </h3>
          </div>
          {chartData.length > 0 ? (
            <div className="px-4 py-4" style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.04)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "rgba(255,255,255,0.35)" }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#1a1a1e",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    labelStyle={{ color: "rgba(255,255,255,0.5)" }}
                  />
                  <Bar
                    dataKey="calls"
                    fill="rgba(255,255,255,0.7)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="px-4 py-12 flex flex-col items-center justify-center">
              <BarChart3 className="w-5 h-5 text-text-subtle/30 mb-2" />
              <p className="font-body text-[0.89rem] text-text-subtle/60">
                Chart data appears after calls
              </p>
            </div>
          )}
        </div>

        {/* ── Agent performance table ── */}
        <div className="bg-surface-panel rounded-card border border-border-soft overflow-hidden">
          <div className="px-4 py-3 border-b border-border-soft/60">
            <h3 className="font-display text-[0.89rem] font-medium text-text-strong">
              Agent Performance
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-soft/40">
                  {["Agent", "Calls", "Avg Duration", "Success"].map((h) => (
                    <th
                      key={h}
                      className="text-left font-body text-[0.79rem] text-text-subtle/60 uppercase tracking-[0.08em] pl-4 pr-3 py-2"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.agentPerformance.length > 0 ? (
                  data.agentPerformance.map((agent) => (
                    <tr
                      key={agent.agentName}
                      className="border-b border-border-soft/30 last:border-0"
                    >
                      <td className="pl-4 pr-3 py-2.5 font-body text-[0.87rem] text-text-strong">
                        {agent.agentName}
                      </td>
                      <td className="pl-4 pr-3 py-2.5 font-mono text-[0.89rem] text-text-body">
                        {agent.totalCalls}
                      </td>
                      <td className="pl-4 pr-3 py-2.5 font-mono text-[0.89rem] text-text-body">
                        {agent.avgDuration > 0
                          ? formatDuration(agent.avgDuration)
                          : "-"}
                      </td>
                      <td className="pl-4 pr-3 py-2.5 font-mono text-[0.89rem] text-text-body">
                        {agent.successRate}%
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="pl-4 py-8 text-center font-body text-[0.89rem] text-text-subtle/50"
                    >
                      No agent data yet. Calls will populate performance metrics.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
