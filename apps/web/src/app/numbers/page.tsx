import { requireSession } from "@/lib/auth";
import { listPhoneNumbersWithAssignments } from "@/lib/phone-number-data";
import { listAgentsForUser } from "@/lib/agent-data";
import NumbersClient from "./numbers-client";

export default async function NumbersPage() {
  const session = await requireSession();
  const [numbers, agents] = await Promise.all([
    listPhoneNumbersWithAssignments(session.email),
    listAgentsForUser(session.email),
  ]);

  const serializedNumbers = numbers.map((n) => ({
    ...n,
    createdAt: n.createdAt.toISOString(),
  }));

  const agentOptions = agents.map((a) => ({
    id: a.id,
    name: a.name,
  }));

  return <NumbersClient numbers={serializedNumbers} agents={agentOptions} />;
}
