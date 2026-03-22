"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { PhoneOutgoing, Users, ListChecks } from "lucide-react";

export default function BatchCallsClient() {
  return (
    <DashboardLayout>
      <div className="p-6 sm:p-8 max-w-content-wide mx-auto">
        <PageHeader
          title="Batch Calls"
          description="Plan and launch outbound call campaigns."
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { icon: PhoneOutgoing, label: "Campaigns", value: "0", sub: "No active campaigns" },
            { icon: Users, label: "Audience", value: "—", sub: "No contacts uploaded" },
            { icon: ListChecks, label: "Completion", value: "—", sub: "No calls placed" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-surface-panel rounded-2xl p-5 shadow-surface-xs border border-border-soft/30"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-canvas flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-text-subtle" />
                </div>
                <span className="font-display text-[1.1rem] font-semibold text-text-strong">{stat.value}</span>
              </div>
              <div className="font-body text-[0.78rem] font-medium text-text-strong">{stat.label}</div>
              <div className="font-body text-[0.7rem] text-text-subtle">{stat.sub}</div>
            </div>
          ))}
        </div>

        <div className="bg-surface-panel rounded-2xl p-8 shadow-surface-xs border border-border-soft/30 text-center">
          <PhoneOutgoing className="w-8 h-8 text-text-subtle/40 mx-auto mb-3" />
          <h3 className="font-display text-[0.92rem] font-semibold text-text-strong mb-1">No campaigns yet</h3>
          <p className="font-body text-[0.78rem] text-text-subtle max-w-sm mx-auto">
            Create your first outbound campaign to reach contacts at scale with AI voice agents.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
