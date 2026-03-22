"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, AlertCircle, Save } from "lucide-react";
import { updateProfileAction } from "@/app/_actions/auth";

type ReadinessCheck = {
  key: string;
  label: string;
  status: "configured" | "missing";
  detail: string;
};

type ReadinessSection = {
  title: string;
  description: string;
  checks: ReadinessCheck[];
};

type SettingsProps = {
  userEmail: string;
  userName: string;
  sections: ReadinessSection[];
  configuredCount: number;
  totalCount: number;
};

export default function SettingsClient({
  userEmail,
  userName,
  sections,
  configuredCount,
  totalCount,
}: SettingsProps) {
  const [isSaving, setIsSaving] = useState(false);

  return (
    <DashboardLayout>
      <div className="p-5 sm:p-8 max-w-content-narrow">
        <div className="mb-8 sm:mb-10">
          <h1 className="font-display text-page-title text-text-strong mb-1">Settings</h1>
          <p className="font-body text-body-md text-text-subtle">Configure your workspace, review system readiness, and manage security.</p>
        </div>

        <section className="bg-surface-panel border border-border-soft rounded-card p-5 sm:p-6 mb-5">
          <h2 className="font-display text-section-head text-text-strong mb-1">Workspace</h2>
          <p className="font-body text-body-sm text-text-subtle mb-6">General workspace identity and account details.</p>
          <form action={updateProfileAction} onSubmit={() => setIsSaving(true)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="font-body text-label text-text-subtle">Display name</Label>
                <Input id="name" name="name" defaultValue={userName} className="h-10 rounded-lg" required />
              </div>
              <div className="space-y-1.5">
                <Label className="font-body text-label text-text-subtle">Email</Label>
                <Input defaultValue={userEmail} readOnly className="h-10 rounded-lg bg-surface-subtle font-mono text-text-subtle" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving} className="gap-2">
                {isSaving ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    Saving&hellip;
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    Save changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </section>

        <section className="bg-surface-panel border border-border-soft rounded-card p-5 sm:p-6 mb-5">
          <h2 className="font-display text-section-head text-text-strong mb-1">Readiness</h2>
          <p className="font-body text-body-sm text-text-subtle mb-5">
            System configuration status: {configuredCount}/{totalCount} checks passing.
          </p>
          {sections.map((section) => (
            <div key={section.title} className="mb-4 last:mb-0">
              <h3 className="font-body text-body-sm font-medium text-text-body mb-2">{section.title}</h3>
              <div className="space-y-1">
                {section.checks.map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-surface-subtle/40 transition-colors">
                    <div>
                      <span className="font-body text-body-md text-text-body">{item.label}</span>
                      <p className="font-body text-[0.7rem] text-text-subtle">{item.detail}</p>
                    </div>
                    {item.status === "configured" ? (
                      <span className="flex items-center gap-1.5 font-body text-body-sm text-emerald-600"><Check className="w-3.5 h-3.5" />Ready</span>
                    ) : (
                      <span className="flex items-center gap-1.5 font-body text-body-sm text-accent-warm-dim"><AlertCircle className="w-3.5 h-3.5" />Missing</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="bg-surface-panel border border-border-soft rounded-card p-5 sm:p-6 mb-5">
          <h2 className="font-display text-section-head text-text-strong mb-1">Security</h2>
          <p className="font-body text-body-sm text-text-subtle mb-5">Authentication and access settings for your workspace.</p>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 gap-2">
              <div>
                <p className="font-body text-body-md text-text-body font-medium">Sign-in method</p>
                <p className="font-body text-body-sm text-text-subtle">Email-based session</p>
              </div>
              <span className="font-body text-[0.72rem] text-emerald-600 bg-emerald-400/10 px-2.5 py-1 rounded-md self-start font-medium">Active</span>
            </div>
            <Separator className="bg-border-soft" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 gap-2">
              <div>
                <p className="font-body text-body-md text-text-body font-medium">Session</p>
                <p className="font-body text-body-sm text-text-subtle">Signed in as {userEmail}</p>
              </div>
              <form action="/sign-in">
                <Button variant="outline" size="sm" type="submit" className="self-start">Sign out</Button>
              </form>
            </div>
          </div>
        </section>

        <section className="bg-surface-panel border border-border-soft rounded-card p-5 sm:p-6">
          <h2 className="font-display text-section-head text-text-strong mb-1">Integrations</h2>
          <p className="font-body text-body-sm text-text-subtle mb-5">Connect external services to extend your workspace.</p>
          <div className="space-y-3">
            {[
              { name: "Twilio", description: "Phone number provisioning and call routing", connected: true },
              { name: "Deepgram", description: "Speech-to-text transcription", connected: true },
              { name: "Anthropic", description: "AI conversation engine", connected: true },
            ].map((integration) => (
              <div key={integration.name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 px-3 rounded-lg border border-border-soft bg-canvas/50 gap-2 hover:bg-surface-subtle/30 transition-colors">
                <div>
                  <p className="font-body text-body-md text-text-body font-medium">{integration.name}</p>
                  <p className="font-body text-label text-text-subtle">{integration.description}</p>
                </div>
                {integration.connected ? (
                  <span className="font-body text-label text-emerald-600 bg-emerald-400/10 px-2.5 py-1 rounded-md self-start font-medium">Connected</span>
                ) : (
                  <Button variant="outline" size="sm" className="self-start">Connect</Button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
