import { requireSession } from "@/lib/auth";
import KnowledgeBaseClient from "./knowledge-base-client";

export default async function KnowledgeBasePage() {
  await requireSession();
  return <KnowledgeBaseClient />;
}
