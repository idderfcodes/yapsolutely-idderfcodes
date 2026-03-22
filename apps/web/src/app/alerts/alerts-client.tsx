"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { Bell, CheckCircle2 } from "lucide-react";

export default function AlertsClient() {
  return (
    <DashboardLayout>
      <div className="p-6 sm:p-8 max-w-content-wide mx-auto">
        <PageHeader
          title="Alerts"
          description="Warnings, failures, and operational notices across your agents."
        />

        <div className="bg-surface-panel rounded-2xl p-8 shadow-surface-xs border border-border-soft/30 text-center">
          <div className="w-12 h-12 rounded-2xl bg-canvas flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="font-display text-[0.92rem] font-semibold text-text-strong mb-1">All clear</h3>
          <p className="font-body text-[0.78rem] text-text-subtle max-w-sm mx-auto">
            No active alerts. Issues like failed calls, runtime errors, or agent misconfigurations will appear here.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
