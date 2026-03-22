import { requireSession } from "@/lib/auth";
import AnalyticsClient from "./analytics-client";

export default async function AnalyticsPage() {
  await requireSession();
  return <AnalyticsClient />;
}
