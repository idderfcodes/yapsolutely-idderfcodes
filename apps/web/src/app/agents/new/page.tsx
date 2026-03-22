import { requireSession } from "@/lib/auth";
import AgentEditorClient from "../[agentId]/edit/agent-editor-client";

export default async function NewAgentPage() {
  await requireSession();

  return (
    <AgentEditorClient
      isNew={true}
      agent={{
        id: "",
        name: "",
        slug: null,
        description: null,
        systemPrompt: "",
        firstMessage: null,
        voiceModel: null,
        status: "DRAFT",
        transferNumber: null,
        phoneNumber: null,
      }}
    />
  );
}
