"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PageHeader from "@/components/dashboard/PageHeader";
import { CreditCard, Zap, Phone } from "lucide-react";

const usage = [
  { icon: Phone, label: "Call minutes", value: "0", limit: "Unlimited (beta)" },
  { icon: Zap, label: "Agent slots", value: "0", limit: "Unlimited (beta)" },
];

export default function BillingClient() {
  return (
    <DashboardLayout>
      <div className="p-6 sm:p-8 max-w-content-wide mx-auto">
        <PageHeader
          title="Billing"
          description="Plan details, usage tracking, and payment settings."
        />

        <div className="bg-surface-panel rounded-2xl p-6 shadow-surface-xs border border-border-soft/30 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-surface-dark flex items-center justify-center">
              <CreditCard className="w-4.5 h-4.5 text-surface-dark-foreground" />
            </div>
            <div>
              <div className="font-display text-[0.92rem] font-semibold text-text-strong">Beta Plan</div>
              <div className="font-body text-[0.75rem] text-text-subtle">Full access during early access period</div>
            </div>
          </div>
          <div className="h-px bg-border-soft/40 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {usage.map((u) => (
              <div key={u.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-canvas flex items-center justify-center">
                  <u.icon className="w-3.5 h-3.5 text-text-subtle" />
                </div>
                <div>
                  <div className="font-body text-[0.78rem] font-medium text-text-strong">
                    {u.value} <span className="text-text-subtle font-normal">/ {u.limit}</span>
                  </div>
                  <div className="font-body text-[0.68rem] text-text-subtle">{u.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-panel rounded-2xl p-8 shadow-surface-xs border border-border-soft/30 text-center">
          <CreditCard className="w-8 h-8 text-text-subtle/40 mx-auto mb-3" />
          <h3 className="font-display text-[0.92rem] font-semibold text-text-strong mb-1">No payment method</h3>
          <p className="font-body text-[0.78rem] text-text-subtle max-w-sm mx-auto">
            A payment method will be required when the beta program transitions to paid plans.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
