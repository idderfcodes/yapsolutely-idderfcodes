import { requireSession } from "@/lib/auth";
import AlertsClient from "./alerts-client";

export default async function AlertsPage() {
  await requireSession();
  return <AlertsClient />;
}
