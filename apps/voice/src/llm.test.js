import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { generateAssistantReply, isLlmConfigured } from "./llm.js";

// ─── Helpers ──────────────────────────

function makeSession(overrides = {}) {
  return {
    systemPrompt: "You are a test agent.",
    agentName: "Test Agent",
    agentDescription: "A test agent",
    firstMessage: "Hello!",
    history: [{ role: "user", content: "Hi there" }],
    transferNumber: "",
    phoneNumber: "+18005551234",
    externalCallId: "call-test-123",
    callerNumber: "+14155550100",
    callSid: "CA_test_sid",
    callMetadata: {},
    pendingHangup: null,
    ...overrides,
  };
}

const noopRecordEvent = vi.fn().mockResolvedValue(undefined);

function mockAnthropicTextResponse(text) {
  return {
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve({
        content: [{ type: "text", text }],
        stop_reason: "end_turn",
      }),
  };
}

function mockAnthropicErrorResponse(status) {
  return {
    ok: false,
    status,
    json: () =>
      Promise.resolve({
        error: { message: `Anthropic error ${status}` },
      }),
  };
}

// ─── Tests ──────────────────────────

describe("isLlmConfigured", () => {
  it("returns true when ANTHROPIC_API_KEY is set", () => {
    process.env.ANTHROPIC_API_KEY = "test-key-for-tests";
    expect(isLlmConfigured()).toBe(true);
    delete process.env.ANTHROPIC_API_KEY;
  });
});

describe("generateAssistantReply", () => {
  let originalFetch;

  beforeEach(() => {
    process.env.ANTHROPIC_API_KEY = "test-key-for-tests";
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("returns text from a successful response", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce(mockAnthropicTextResponse("Sure, I can help!"));

    const session = makeSession();
    const result = await generateAssistantReply(session, AbortSignal.timeout(5000), noopRecordEvent);

    expect(result).toBe("Sure, I can help!");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("retries on 429 and succeeds on second attempt", async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce(mockAnthropicErrorResponse(429))
      .mockResolvedValueOnce(mockAnthropicTextResponse("Recovered!"));

    const session = makeSession();
    const result = await generateAssistantReply(session, AbortSignal.timeout(10000), noopRecordEvent);

    expect(result).toBe("Recovered!");
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it("retries on 503 and succeeds on third attempt", async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce(mockAnthropicErrorResponse(503))
      .mockResolvedValueOnce(mockAnthropicErrorResponse(503))
      .mockResolvedValueOnce(mockAnthropicTextResponse("Finally!"));

    const session = makeSession();
    const result = await generateAssistantReply(session, AbortSignal.timeout(15000), noopRecordEvent);

    expect(result).toBe("Finally!");
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  it("throws after exhausting all retries on 429", async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValue(mockAnthropicErrorResponse(429));

    const session = makeSession();
    await expect(
      generateAssistantReply(session, AbortSignal.timeout(15000), noopRecordEvent),
    ).rejects.toThrow("Anthropic error 429");
    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  it("does not retry on non-retryable errors like 400", async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce(mockAnthropicErrorResponse(400));

    const session = makeSession();
    await expect(
      generateAssistantReply(session, AbortSignal.timeout(5000), noopRecordEvent),
    ).rejects.toThrow("Anthropic error 400");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("does not retry on 401 unauthorized", async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce(mockAnthropicErrorResponse(401));

    const session = makeSession();
    await expect(
      generateAssistantReply(session, AbortSignal.timeout(5000), noopRecordEvent),
    ).rejects.toThrow("Anthropic error 401");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("returns fallback message after max tool iterations", async () => {
    // Each tool iteration: 1 fetch for the LLM call that returns tool_use
    // After running the tool, the loop sends tool results back, which is another fetch
    // With 3 iterations, we need 3 tool_use responses
    const makeToolUseResponse = () => ({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          content: [
            { type: "tool_use", id: `tool_${Math.random()}`, name: "capture_lead", input: { fullName: "Test" } },
          ],
          stop_reason: "tool_use",
        }),
    });

    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve(makeToolUseResponse()),
    );

    const session = makeSession();
    const result = await generateAssistantReply(session, AbortSignal.timeout(10000), noopRecordEvent);

    // After 3 iterations it should return the fallback
    expect(result).toMatch(/completed the requested action/i);
    // 3 LLM calls + tool runtime fetch calls for event logging
    expect(global.fetch.mock.calls.filter(c => c[0] === "https://api.anthropic.com/v1/messages")).toHaveLength(3);
  });
});
