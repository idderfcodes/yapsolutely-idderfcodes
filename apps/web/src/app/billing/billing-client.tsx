"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { CreditCard, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addPaymentMethodAction, deletePaymentMethodAction } from "@/app/_actions/billing";

type PaymentMethodItem = {
  id: string;
  cardLast4: string;
  cardBrand: string;
  expiryMonth: number;
  expiryYear: number;
  billingName: string;
  isDefault: boolean;
};

const metrics = [
  { label: "Plan", value: "Beta", sub: "Full access" },
  { label: "Call Minutes", value: "0", sub: "Unlimited" },
  { label: "Agent Slots", value: "0", sub: "Unlimited" },
  { label: "Next Invoice", value: "—", sub: "No billing" },
];

const drivers = [
  { label: "Telephony (Twilio)", value: "—", detail: "Per-minute call charges" },
  { label: "Transcription (Deepgram)", value: "—", detail: "Per-minute STT charges" },
  { label: "AI (Anthropic)", value: "—", detail: "Token-based LLM charges" },
];

function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)} / ${digits.slice(2)}`;
  return digits;
}

export default function BillingClient({ paymentMethods }: { paymentMethods: PaymentMethodItem[] }) {
  const [showForm, setShowForm] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [billingName, setBillingName] = useState("");

  return (
    <DashboardLayout>
      <div className="p-5 sm:p-6 lg:p-8 max-w-7xl">
        {/* ── Header ── */}
        <div className="mb-5">
          <h1 className="font-display text-[1.38rem] font-semibold tracking-[-0.02em] text-text-strong">Billing</h1>
          <p className="font-body text-[0.89rem] text-text-subtle mt-0.5">Plan details, usage tracking, and cost drivers.</p>
        </div>

        {/* ── Metrics strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {metrics.map((m, i) => (
            <div key={m.label} className="bg-surface-panel rounded-lg border border-border-soft/60 px-4 py-3 stagger-item" style={{ animationDelay: `${i * 0.06}s` }}>
              <div className="font-body text-[0.67rem] text-text-subtle/70 uppercase tracking-[0.1em] mb-0.5">{m.label}</div>
              <div className="font-mono text-[1rem] font-semibold text-text-strong">{m.value}</div>
              <div className="font-body text-[0.67rem] text-text-subtle/50 mt-0.5">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Cost drivers ── */}
        <div className="bg-surface-panel rounded-card border border-border-soft overflow-hidden mb-5">
          <div className="px-4 py-3 border-b border-border-soft/60">
            <h3 className="font-display text-[0.89rem] font-medium text-text-strong">Cost Drivers</h3>
          </div>
          <div className="divide-y divide-border-soft/30">
            {drivers.map((d) => (
              <div key={d.label} className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="font-body text-[0.87rem] text-text-body">{d.label}</div>
                  <div className="font-body text-[0.79rem] text-text-subtle/60">{d.detail}</div>
                </div>
                <span className="font-mono text-[0.87rem] text-text-strong">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Payment methods ── */}
        <div className="bg-surface-panel rounded-card border border-border-soft overflow-hidden">
          <div className="px-4 py-3 border-b border-border-soft/60 flex items-center justify-between">
            <h3 className="font-display text-[0.89rem] font-medium text-text-strong">Payment Methods</h3>
            {paymentMethods.length > 0 && !showForm && (
              <Button onClick={() => setShowForm(true)} variant="ghost" size="sm" className="gap-1 text-[0.84rem] h-7">
                <Plus className="w-3 h-3" /> Add
              </Button>
            )}
          </div>

          {paymentMethods.length === 0 && !showForm ? (
            <div className="px-6 py-10 text-center">
              <CreditCard className="w-5 h-5 text-text-subtle/30 mx-auto mb-2" />
              <h4 className="font-display text-[1.02rem] font-medium text-text-strong mb-0.5">No payment method</h4>
              <p className="font-body text-[0.89rem] text-text-subtle max-w-xs mx-auto mb-4">
                Add a payment method to keep your account active after the trial.
              </p>
              <Button onClick={() => setShowForm(true)} variant="hero" size="sm" className="gap-1.5 rounded-lg text-[0.87rem] h-8">
                <Plus className="w-3.5 h-3.5" /> Add payment method
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-border-soft/30">
              {paymentMethods.map((pm) => (
                <div key={pm.id} className="flex items-center justify-between px-4 py-3 group">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-6 rounded bg-foreground/[0.06] flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-text-subtle" />
                    </div>
                    <div>
                      <div className="font-body text-[0.87rem] text-text-strong">
                        {pm.cardBrand} •••• {pm.cardLast4}
                        {pm.isDefault && (
                          <span className="ml-2 text-[0.72rem] font-medium text-emerald-600 bg-emerald-400/10 px-1.5 py-px rounded">Default</span>
                        )}
                      </div>
                      <div className="font-body text-[0.77rem] text-text-subtle">
                        {pm.billingName} · Expires {String(pm.expiryMonth).padStart(2, "0")}/{pm.expiryYear}
                      </div>
                    </div>
                  </div>
                  <form action={deletePaymentMethodAction}>
                    <input type="hidden" name="methodId" value={pm.id} />
                    <button
                      type="submit"
                      className="p-1.5 rounded-md text-text-subtle/0 group-hover:text-text-subtle hover:!text-red-500 hover:bg-red-50 transition-all"
                      aria-label="Remove payment method"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}

          {/* ── Add form ── */}
          {showForm && (
            <div className="border-t border-border-soft/60 px-4 py-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-display text-[0.84rem] font-medium text-text-strong">Add payment method</span>
                <button onClick={() => setShowForm(false)} className="p-1 rounded hover:bg-surface-subtle transition-colors">
                  <X className="w-3.5 h-3.5 text-text-subtle" />
                </button>
              </div>
              <form action={addPaymentMethodAction} className="space-y-3">
                <div>
                  <label className="font-body text-[0.79rem] text-text-subtle block mb-1">Card number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    placeholder="4242 4242 4242 4242"
                    required
                    autoComplete="cc-number"
                    className="w-full h-8 px-3 rounded-md border border-border-soft bg-canvas font-mono text-[0.87rem] text-text-strong placeholder:text-text-subtle/40 focus:outline-none focus:ring-1 focus:ring-text-strong/10"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-body text-[0.79rem] text-text-subtle block mb-1">Expiry</label>
                    <input
                      type="text"
                      name="expiry"
                      value={expiry}
                      onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                      placeholder="MM / YY"
                      required
                      autoComplete="cc-exp"
                      className="w-full h-8 px-3 rounded-md border border-border-soft bg-canvas font-mono text-[0.87rem] text-text-strong placeholder:text-text-subtle/40 focus:outline-none focus:ring-1 focus:ring-text-strong/10"
                    />
                  </div>
                  <div>
                    <label className="font-body text-[0.79rem] text-text-subtle block mb-1">CVC</label>
                    <input
                      type="text"
                      name="cvc"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      placeholder="123"
                      required
                      autoComplete="cc-csc"
                      className="w-full h-8 px-3 rounded-md border border-border-soft bg-canvas font-mono text-[0.87rem] text-text-strong placeholder:text-text-subtle/40 focus:outline-none focus:ring-1 focus:ring-text-strong/10"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-body text-[0.79rem] text-text-subtle block mb-1">Name on card</label>
                  <input
                    type="text"
                    name="billingName"
                    value={billingName}
                    onChange={(e) => setBillingName(e.target.value)}
                    placeholder="Jane Doe"
                    required
                    autoComplete="cc-name"
                    className="w-full h-8 px-3 rounded-md border border-border-soft bg-canvas font-body text-[0.87rem] text-text-strong placeholder:text-text-subtle/40 focus:outline-none focus:ring-1 focus:ring-text-strong/10"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <Button type="button" variant="ghost" size="sm" className="text-[0.84rem] h-7" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="hero" size="sm" className="rounded-lg text-[0.84rem] h-7 px-3">
                    Save card
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
