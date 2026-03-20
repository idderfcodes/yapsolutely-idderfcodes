import { NextRequest, NextResponse } from "next/server";
import { resolveAgentByPhoneNumber } from "@/lib/phone-number-data";

export async function GET(request: NextRequest) {
  const runtimeSecret = process.env.RUNTIME_SHARED_SECRET;
  const providedSecret = request.headers.get("x-yapsolutely-runtime-secret");

  if (!runtimeSecret || providedSecret !== runtimeSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const phoneNumber = request.nextUrl.searchParams.get("phoneNumber");

  if (!phoneNumber) {
    return NextResponse.json({ error: "Missing phoneNumber" }, { status: 400 });
  }

  const record = await resolveAgentByPhoneNumber(phoneNumber);

  if (!record || !record.agent) {
    return NextResponse.json({ error: "Agent not found for number" }, { status: 404 });
  }

  if (!record.agent.isActive || record.agent.status !== "ACTIVE") {
    return NextResponse.json(
      {
        error: "Assigned agent is not callable",
        detail: "The number is assigned, but the linked agent is not active and ready to receive live inbound calls.",
        agent: {
          id: record.agent.id,
          status: record.agent.status,
          isActive: record.agent.isActive,
        },
      },
      { status: 409 },
    );
  }

  return NextResponse.json({
    phoneNumber: {
      id: record.id,
      value: record.phoneNumber,
      friendlyName: record.friendlyName,
      twilioSid: record.twilioSid,
    },
    user: record.user,
    agent: {
      id: record.agent.id,
      userId: record.agent.userId,
      name: record.agent.name,
      description: record.agent.description,
      status: record.agent.status,
      isActive: record.agent.isActive,
      phoneNumberId: record.id,
      phoneNumber: record.phoneNumber,
      phoneNumberFriendlyName: record.friendlyName,
      systemPrompt: record.agent.systemPrompt,
      firstMessage: record.agent.firstMessage,
      voiceProvider: record.agent.voiceProvider,
      voiceModel: record.agent.voiceModel,
      language: record.agent.language,
      transferNumber: record.agent.transferNumber,
      config: record.agent.config,
    },
  });
}