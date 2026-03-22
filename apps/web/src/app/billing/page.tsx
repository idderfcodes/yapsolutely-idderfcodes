import { requireSession } from "@/lib/auth";
import BillingClient from "./billing-client";

export default async function BillingPage() {
  await requireSession();
  return <BillingClient />;
}
