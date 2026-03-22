import { requireSession } from "@/lib/auth";
import { getSettingsReadiness } from "@/lib/settings-data";
import SettingsClient from "./settings-client";

export default async function SettingsPage() {
  const session = await requireSession();
  const readiness = await getSettingsReadiness({ includeRuntimeProbes: false });

  return (
    <SettingsClient
      userEmail={session.email}
      userName={session.name ?? ""}
      sections={readiness.sections}
      configuredCount={readiness.configuredCount}
      totalCount={readiness.totalCount}
    />
  );
}
