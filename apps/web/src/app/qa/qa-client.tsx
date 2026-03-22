"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { ShieldCheck, CheckCircle2, AlertTriangle } from "lucide-react";

const scores = [
  { icon: CheckCircle2, label: "Passed", value: "—", color: "text-emerald-500" },
  { icon: AlertTriangle, label: "Flagged", value: "—", color: "text-amber-500" },
];

export default function QAClient() {
  return (
    <DashboardLayout>
      <div className="p-6 sm:p-8 max-w-content-wide mx-auto">
        <PageHeader
          title="Quality Assurance"
          description="Review AI agent performance and flag issues for improvement."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {scores.map((s) => (
            <div
              key={s.label}
              className="bg-surface-panel rounded-2xl p-5 shadow-surface-xs border border-border-soft/30"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-canvas flex items-center justify-center">
                  <s.icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <span className="font-display text-[1.1rem] font-semibold text-text-strong">{s.value}</span>
              </div>
              <div className="font-body text-[0.78rem] font-medium text-text-strong">{s.label}</div>
              <div className="font-body text-[0.7rem] text-text-subtle">Across all agents</div>
            </div>
          ))}
        </div>

        <div className="bg-surface-panel rounded-2xl p-8 shadow-surface-xs border border-border-soft/30 text-center">
          <ShieldCheck className="w-8 h-8 text-text-subtle/40 mx-auto mb-3" />
          <h3 className="font-display text-[0.92rem] font-semibold text-text-strong mb-1">No reviews yet</h3>
          <p className="font-body text-[0.78rem] text-text-subtle max-w-sm mx-auto">
            QA reviews evaluate completed calls against quality criteria. Results will appear after calls are processed.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
