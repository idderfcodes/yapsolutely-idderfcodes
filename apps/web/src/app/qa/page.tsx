import { requireSession } from "@/lib/auth";
import QAClient from "./qa-client";

export default async function QAPage() {
  await requireSession();
  return <QAClient />;
}
