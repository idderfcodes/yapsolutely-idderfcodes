"use client";

import { useState, Suspense } from "react";
import { Search, SlidersHorizontal, Plus, Link2, Hash, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EmptyState from "@/components/dashboard/EmptyState";
import { registerPhoneNumberAction } from "@/app/_actions/phone-numbers";

type AgentOption = {
  id: string;
  name: string;
};

type NumberItem = {
  id: string;
  phoneNumber: string;
  friendlyName: string | null;
  twilioSid: string | null;
  assignedAgentId: string | null;
  assignedAgentName: string | null;
  createdAt: string;
};

function getStatus(n: NumberItem): string {
  if (n.assignedAgentId) return "Assigned";
  if (n.friendlyName) return "Unassigned";
  return "Needs setup";
}

const statusStyle = (status: string) => {
  switch (status) {
    case "Assigned":
      return "text-emerald-600 bg-emerald-400/10";
    case "Unassigned":
      return "text-text-subtle bg-surface-subtle";
    case "Needs setup":
      return "text-accent-warm-dim bg-accent-warm/10";
    default:
      return "text-text-subtle bg-surface-subtle";
  }
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function NumbersInner({ numbers, agents }: { numbers: NumberItem[]; agents: AgentOption[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filtered = query.trim()
    ? numbers.filter(
        (n) =>
          n.phoneNumber.includes(query) ||
          n.friendlyName?.toLowerCase().includes(query.toLowerCase()) ||
          n.assignedAgentName?.toLowerCase().includes(query.toLowerCase()),
      )
    : numbers;

  const totalNumbers = numbers.length;
  const assigned = numbers.filter((n) => n.assignedAgentId).length;
  const unassigned = totalNumbers - assigned;
  const needsSetup = numbers.filter((n) => !n.assignedAgentId && !n.friendlyName);

  return (
    <DashboardLayout>
      <div className="p-5 sm:p-8 max-w-[1200px]">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-[1.5rem] font-semibold tracking-[-0.025em] text-text-strong mb-1">Numbers</h1>
            <p className="font-body text-[0.82rem] text-text-subtle">Assign phone numbers to agents and manage call routing.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="font-body text-text-subtle text-[0.78rem] gap-1.5">
              <Link2 className="w-3.5 h-3.5" />Assign
            </Button>
            <Button onClick={() => setShowAddDialog(true)} variant="hero" size="default" className="rounded-lg gap-1.5 text-[0.8rem]">
              <Plus className="w-3.5 h-3.5" />Add number
            </Button>
          </div>
        </div>

        {numbers.length === 0 ? (
          <div className="bg-surface-panel rounded-card border border-border-soft">
            <EmptyState
              icon={Hash}
              title="No numbers yet"
              description="Add a phone number to route inbound calls to your agents. Numbers connect callers to the right agent automatically."
              actionLabel="Add your first number"
              onAction={() => setShowAddDialog(true)}
            />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-subtle" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search numbers..."
                  className="w-full h-9 pl-9 pr-3 rounded-lg border border-border-soft bg-surface-panel font-body text-[0.8rem] text-text-strong placeholder:text-text-subtle/50 focus:outline-none focus:ring-1 focus:ring-text-strong/10 transition-shadow"
                />
              </div>
              <button className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-border-soft bg-surface-panel font-body text-[0.78rem] text-text-subtle hover:text-text-body transition-colors">
                <SlidersHorizontal className="w-3.5 h-3.5" />Filters
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
              <div className="xl:col-span-2">
                <div className="bg-surface-panel rounded-card border border-border-soft overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border-soft">
                          <th className="text-left px-5 py-2.5 font-body text-[0.65rem] font-medium text-text-subtle uppercase tracking-[0.1em]">Number</th>
                          <th className="text-left px-5 py-2.5 font-body text-[0.65rem] font-medium text-text-subtle uppercase tracking-[0.1em]">Name</th>
                          <th className="text-left px-5 py-2.5 font-body text-[0.65rem] font-medium text-text-subtle uppercase tracking-[0.1em]">Agent</th>
                          <th className="text-left px-5 py-2.5 font-body text-[0.65rem] font-medium text-text-subtle uppercase tracking-[0.1em]">Status</th>
                          <th className="text-left px-5 py-2.5 font-body text-[0.65rem] font-medium text-text-subtle uppercase tracking-[0.1em]">Provider</th>
                          <th className="text-right px-5 py-2.5 font-body text-[0.65rem] font-medium text-text-subtle uppercase tracking-[0.1em]">Added</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((n) => {
                          const status = getStatus(n);
                          return (
                            <tr key={n.id} className="border-b border-border-soft last:border-0 hover:bg-surface-subtle/40 transition-colors cursor-pointer group">
                              <td className="px-5 py-3.5 font-mono text-[0.78rem] text-text-body">{n.phoneNumber}</td>
                              <td className="px-5 py-3.5 font-body text-[0.8rem] text-text-body">{n.friendlyName ?? "—"}</td>
                              <td className="px-5 py-3.5 font-body text-[0.8rem] text-text-body">{n.assignedAgentName ?? "—"}</td>
                              <td className="px-5 py-3.5">
                                <span className={`inline-flex px-2 py-0.5 rounded-md text-[0.68rem] font-body font-medium ${statusStyle(status)}`}>{status}</span>
                              </td>
                              <td className="px-5 py-3.5 font-body text-[0.75rem] text-text-subtle">{n.twilioSid ? "Twilio" : "—"}</td>
                              <td className="px-5 py-3.5 text-right font-body text-[0.75rem] text-text-subtle">{formatDate(n.createdAt)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="bg-surface-panel rounded-card border border-border-soft">
                  <div className="px-5 py-4 border-b border-border-soft">
                    <h3 className="font-display text-sm font-medium text-text-strong">Assignment summary</h3>
                  </div>
                  <div className="p-4 space-y-2">
                    {[
                      { label: "Total numbers", value: String(totalNumbers) },
                      { label: "Assigned", value: String(assigned) },
                      { label: "Unassigned", value: String(unassigned) },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-1.5 px-1">
                        <span className="font-body text-[0.78rem] text-text-body">{item.label}</span>
                        <span className="font-mono text-xs text-text-subtle">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {needsSetup.length > 0 && (
                  <div className="bg-surface-panel rounded-card border border-border-soft">
                    <div className="px-5 py-4 border-b border-border-soft">
                      <h3 className="font-display text-sm font-medium text-text-strong">Needs attention</h3>
                    </div>
                    <div className="p-4 space-y-2">
                      {needsSetup.map((n) => (
                        <div key={n.id} className="p-3 rounded-lg bg-accent-warm/5 border border-accent-warm/10">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-[0.7rem] text-text-body">{n.phoneNumber}</span>
                            <span className="font-body text-[0.6rem] text-accent-warm-dim bg-accent-warm/10 px-1.5 py-0.5 rounded">Needs setup</span>
                          </div>
                          <p className="font-body text-[0.72rem] text-text-subtle leading-relaxed">Number provisioned but not yet named or assigned to an agent.</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add number dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={() => setShowAddDialog(false)} />
          <div className="relative w-full max-w-md mx-4 bg-surface-panel rounded-2xl shadow-surface-xl border border-border-soft overflow-hidden">
            <div className="px-6 pt-6 pb-2 flex items-center justify-between">
              <h2 className="font-display text-[1.1rem] font-semibold tracking-[-0.02em] text-text-strong">Add phone number</h2>
              <button onClick={() => setShowAddDialog(false)} className="p-1.5 rounded-lg hover:bg-surface-subtle transition-colors">
                <X className="w-4 h-4 text-text-subtle" />
              </button>
            </div>
            <form action={registerPhoneNumberAction} className="px-6 pb-6">
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="phoneNumber" className="font-body text-[0.78rem] text-text-body mb-1.5 block">Phone number</Label>
                  <Input id="phoneNumber" name="phoneNumber" placeholder="+1 (555) 123-4567" required className="font-mono text-[0.85rem]" />
                  <p className="font-body text-[0.68rem] text-text-subtle mt-1">Enter the full phone number including country code.</p>
                </div>
                <div>
                  <Label htmlFor="friendlyName" className="font-body text-[0.78rem] text-text-body mb-1.5 block">Friendly name</Label>
                  <Input id="friendlyName" name="friendlyName" placeholder="e.g. Main Office Line" className="text-[0.85rem]" />
                </div>
                <div>
                  <Label htmlFor="twilioSid" className="font-body text-[0.78rem] text-text-body mb-1.5 block">Twilio SID <span className="text-text-subtle">(optional)</span></Label>
                  <Input id="twilioSid" name="twilioSid" placeholder="PNxxxxxxxxxxxxxxxx" className="font-mono text-[0.85rem]" />
                </div>
                <div>
                  <Label htmlFor="agentId" className="font-body text-[0.78rem] text-text-body mb-1.5 block">Assign to agent <span className="text-text-subtle">(optional)</span></Label>
                  <select id="agentId" name="agentId" className="w-full h-9 px-3 rounded-lg border border-border-soft bg-surface-panel font-body text-[0.85rem] text-text-strong focus:outline-none focus:ring-1 focus:ring-text-strong/10">
                    <option value="">No agent</option>
                    {agents.map((a) => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-border-soft">
                <Button type="button" variant="ghost" size="sm" onClick={() => setShowAddDialog(false)}>Cancel</Button>
                <Button type="submit" variant="hero" size="default" className="rounded-lg text-[0.8rem]">Add number</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default function NumbersClient({ numbers, agents }: { numbers: NumberItem[]; agents: AgentOption[] }) {
  return (
    <Suspense>
      <NumbersInner numbers={numbers} agents={agents} />
    </Suspense>
  );
}
