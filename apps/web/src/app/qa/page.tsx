import { requireSession } from "@/lib/auth";
import { getQAForUser } from "@/lib/qa-data";
import QAClient from "./qa-client";

export default async function QAPage() {
  const session = await requireSession();
  const data = await getQAForUser(session.email);
  return <QAClient data={data} />;
}
