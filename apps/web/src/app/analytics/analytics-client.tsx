"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { BarChart3, TrendingUp, Clock, PhoneIncoming } from "lucide-react";

const metrics = [
  { icon: PhoneIncoming, label: "Total Calls", value: "—", sub: "All time" },
  { icon: Clock, label: "Avg Duration", value: "—", sub: "Completed calls" },
  { icon: TrendingUp, label: "Success Rate", value: "—", sub: "Completed / total" },
];

export default function AnalyticsClient() {
  return (
    <DashboardLayout>
      <div className="p-6 sm:p-8 max-w-content-wide mx-auto">
        <PageHeader
          title="Analytics"
          description="Usage metrics and performance trends across your agents."
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="bg-surface-panel rounded-2xl p-5 shadow-surface-xs border border-border-soft/30"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-canvas flex items-center justify-center">
                  <m.icon className="w-4 h-4 text-text-subtle" />
                </div>
                <span className="font-display text-[1.1rem] font-semibold text-text-strong">{m.value}</span>
              </div>
              <div className="font-body text-[0.78rem] font-medium text-text-strong">{m.label}</div>
              <div className="font-body text-[0.7rem] text-text-subtle">{m.sub}</div>
            </div>
          ))}
        </div>

        <div className="bg-surface-panel rounded-2xl p-8 shadow-surface-xs border border-border-soft/30 text-center">
          <BarChart3 className="w-8 h-8 text-text-subtle/40 mx-auto mb-3" />
          <h3 className="font-display text-[0.92rem] font-semibold text-text-strong mb-1">Analytics will appear here</h3>
          <p className="font-body text-[0.78rem] text-text-subtle max-w-sm mx-auto">
            Once calls start flowing, you'll see volume trends, duration distributions, and agent performance summaries.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
