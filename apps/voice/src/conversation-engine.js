export function createStreamSession({ streamSid, startMessage, pipelineMode = "mock" }) {
  const customParameters = startMessage.start?.customParameters || {};
  let agentConfig = null;

  if (customParameters.agentConfig) {
    try {
      agentConfig = JSON.parse(customParameters.agentConfig);
    } catch {
      agentConfig = null;
    }
  }

  return {
    streamSid,
    callSid: startMessage.start?.callSid || customParameters.callSid || null,
    externalCallId: startMessage.start?.callSid || customParameters.callSid || null,
    callerNumber: customParameters.callerNumber || null,
    toNumber: customParameters.toNumber || null,
    userId: customParameters.userId || null,
    agentId: customParameters.agentId || null,
    agentName: customParameters.agentName || null,
    agentDescription: customParameters.agentDescription || null,
    agentStatus: customParameters.agentStatus || null,
    agentIsActive: customParameters.agentIsActive === "true",
    phoneNumberId: customParameters.phoneNumberId || null,
    phoneNumber: customParameters.phoneNumber || null,
    phoneNumberFriendlyName: customParameters.phoneNumberFriendlyName || null,
    firstMessage: customParameters.firstMessage || null,
    systemPrompt: customParameters.systemPrompt || null,
    voiceProvider: customParameters.voiceProvider || null,
    voiceModel: customParameters.voiceModel || null,
    language: customParameters.language || null,
    transferNumber: customParameters.transferNumber || null,
    agentConfig,
    mediaPackets: 0,
    sequence: 2,
    mockTurnEmitted: false,
    pipelineMode,
  };
}

export function shouldEmitMockTurn(session) {
  return session.pipelineMode === "mock" && !session.mockTurnEmitted && session.mediaPackets >= 1;
}

export function buildMockCallerTranscript(session) {
  if (session.agentName) {
    return `Caller audio detected for ${session.agentName}. Awaiting full STT transcription integration.`;
  }

  return "Caller audio detected. Awaiting full STT transcription integration.";
}

export function buildMockAgentReply(session) {
  const intro = session.agentName
    ? `${session.agentName} is ready to respond once the live speech pipeline is connected.`
    : "The assigned agent is ready to respond once the live speech pipeline is connected.";

  const guidance = session.systemPrompt
    ? "The current system prompt has already been loaded into the session context."
    : "No system prompt is loaded yet.";

  const routingContext = session.phoneNumber
    ? `Inbound routing resolved from ${session.phoneNumberFriendlyName ? `${session.phoneNumberFriendlyName} ` : ""}${session.phoneNumber}.`
    : "Inbound routing is active, but the assigned number metadata is still empty.";

  const activationContext = session.agentStatus
    ? `Agent status is ${session.agentStatus}${session.agentIsActive ? " and active." : ", but currently marked inactive."}`
    : "Agent lifecycle status has not been passed into the stream session yet.";

  return `${intro} ${guidance} ${routingContext} ${activationContext}`;
}