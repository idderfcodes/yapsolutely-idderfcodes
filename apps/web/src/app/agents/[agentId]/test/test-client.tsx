"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeft, Send, RotateCcw, Bot, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

type AgentSummary = {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  systemPrompt: string;
  firstMessage: string | null;
  voiceModel: string | null;
  status: string;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
};

export default function AgentTestClient({ agent }: { agent: AgentSummary }) {
  const slug = agent.slug ?? agent.id;
  const [messages, setMessages] = useState<Message[]>(() => {
    if (agent.firstMessage) {
      return [{
        id: "first",
        role: "assistant" as const,
        content: agent.firstMessage,
        timestamp: Date.now(),
      }];
    }
    return [];
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    setError(null);
    setInput("");

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const apiMessages = updatedMessages
        .filter((m) => m.id !== "first")
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/runtime/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId: agent.id, messages: apiMessages }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      const reply = data?.reply || "No response from agent.";
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: reply,
          timestamp: Date.now(),
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get response");
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [input, isLoading, messages, agent.id]);

  const resetConversation = () => {
    setMessages(
      agent.firstMessage
        ? [{ id: "first", role: "assistant", content: agent.firstMessage, timestamp: Date.now() }]
        : [],
    );
    setError(null);
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-3.5rem)]">
        {/* Header */}
        <div className="shrink-0 border-b border-border-soft bg-surface-panel px-5 py-4">
          <div className="flex items-center justify-between max-w-[900px] mx-auto">
            <div className="flex items-center gap-3">
              <Link
                href={`/agents/${slug}`}
                className="inline-flex items-center gap-1.5 font-body text-[0.75rem] text-text-subtle hover:text-text-body transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </Link>
              <div className="h-4 w-px bg-border-soft" />
              <div>
                <h1 className="font-display text-sm font-semibold text-text-strong">
                  Test: {agent.name}
                </h1>
                <p className="font-body text-[0.68rem] text-text-subtle">
                  Chat with your agent to test its behavior
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetConversation}
              className="font-body text-[0.75rem] text-text-subtle gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6">
          <div className="max-w-[900px] mx-auto space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-16">
                <div className="w-12 h-12 bg-surface-subtle rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-6 h-6 text-text-subtle" />
                </div>
                <p className="font-body text-[0.85rem] text-text-subtle mb-1">
                  Start a conversation
                </p>
                <p className="font-body text-[0.75rem] text-text-subtle/70">
                  Type a message below to test how {agent.name} responds.
                </p>
              </div>
            )}

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                    msg.role === "user"
                      ? "bg-surface-subtle"
                      : "bg-accent-warm/10"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-3.5 h-3.5 text-text-subtle" />
                  ) : (
                    <Bot className="w-3.5 h-3.5 text-accent-warm" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-text-strong text-white rounded-br-md"
                      : "bg-surface-panel border border-border-soft rounded-bl-md"
                  }`}
                >
                  <p
                    className={`font-body text-[0.82rem] leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user" ? "" : "text-text-body"
                    }`}
                  >
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-accent-warm/10">
                  <Bot className="w-3.5 h-3.5 text-accent-warm" />
                </div>
                <div className="bg-surface-panel border border-border-soft rounded-2xl rounded-bl-md px-4 py-3">
                  <Loader2 className="w-4 h-4 text-text-subtle animate-spin" />
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 max-w-[75%]">
                <p className="font-body text-[0.78rem] text-red-700">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <div className="shrink-0 border-t border-border-soft bg-surface-panel px-5 py-4">
          <div className="max-w-[900px] mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void sendMessage();
              }}
              className="flex items-center gap-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message to test your agent…"
                disabled={isLoading}
                className="flex-1 bg-surface-subtle border border-border-soft rounded-xl px-4 py-2.5 font-body text-[0.82rem] text-text-body placeholder:text-text-subtle/50 focus:outline-none focus:ring-2 focus:ring-accent-warm/30 focus:border-accent-warm/40 disabled:opacity-50"
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                variant="hero"
                size="default"
                className="rounded-xl gap-1.5 px-5"
              >
                <Send className="w-3.5 h-3.5" />
                Send
              </Button>
            </form>
            <p className="font-body text-[0.65rem] text-text-subtle/60 mt-2 text-center">
              This tests the agent&apos;s prompt and behavior via text. Voice testing requires the live pipeline.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
