import { requireSession } from "@/lib/auth";
import { getAnalyticsForUser } from "@/lib/analytics-data";
import AnalyticsClient from "./analytics-client";

export default async function AnalyticsPage() {
  const session = await requireSession();
  const data = await getAnalyticsForUser(session.email, 30);
  return <AnalyticsClient data={data} />;
}
