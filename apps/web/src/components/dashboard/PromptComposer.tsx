import { useState } from "react";
import { Sparkles, RotateCcw, X, ChevronRight, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PromptComposerProps {
  currentPrompt: string;
  onApply: (prompt: string) => void;
  onClose: () => void;
  agentName?: string;
}

const toneOptions = ["Professional", "Warm", "Direct", "Empathetic", "Casual", "Formal"];

const refinementActions = [
  { label: "Make it shorter", instruction: "shorter" },
  { label: "More detailed", instruction: "detailed" },
  { label: "Sound more natural", instruction: "natural" },
];

// Simulated prompt generation for prototype
const generatePrompt = (inputs: {
  name: string;
  purpose: string;
  tone: string;
  goal: string;
  mustDo: string;
  avoid: string;
  escalation: string;
  notes: string;
}) => {
  const parts = [
    `You are ${inputs.name || "a voice agent"}${inputs.purpose ? `, responsible for ${inputs.purpose.toLowerCase()}` : ""}.`,
    inputs.goal ? `\nYour primary goal is to ${inputs.goal.toLowerCase()}.` : "",
    inputs.tone ? `\nMaintain a ${inputs.tone.toLowerCase()} tone throughout the conversation.` : "",
    inputs.mustDo ? `\nKey instructions:\n${inputs.mustDo.split("\n").filter(Boolean).map(l => `- ${l.trim()}`).join("\n")}` : "",
    inputs.avoid ? `\nThings to avoid:\n${inputs.avoid.split("\n").filter(Boolean).map(l => `- ${l.trim()}`).join("\n")}` : "",
    inputs.escalation ? `\nEscalation rules: ${inputs.escalation}` : "",
    inputs.notes ? `\nAdditional context: ${inputs.notes}` : "",
    "\nAlways confirm next steps before ending the call. If you're unsure about something, acknowledge the caller's question and offer to connect them with the appropriate team.",
  ];
  return parts.filter(Boolean).join("");
};

const PromptComposer = ({ currentPrompt, onApply, onClose, agentName = "" }: PromptComposerProps) => {
  const isExpanding = currentPrompt.trim().length > 0;
  const [phase, setPhase] = useState<"input" | "result">("input");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [expanded, setExpanded] = useState(false);

  // Structured inputs
  const [name, setName] = useState(agentName);
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("");
  const [goal, setGoal] = useState("");
  const [mustDo, setMustDo] = useState("");
  const [avoid, setAvoid] = useState("");
  const [escalation, setEscalation] = useState("");
  const [notes, setNotes] = useState("");

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      const base = generatePrompt({ name, purpose, tone, goal, mustDo, avoid, escalation, notes });
      const result = isExpanding
        ? `${currentPrompt}\n\n--- Expanded ---\n\n${base}`
        : base;
      setGeneratedPrompt(result);
      setIsGenerating(false);
      setPhase("result");
    }, 1200);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const base = generatePrompt({ name, purpose, tone, goal, mustDo, avoid, escalation, notes });
      setGeneratedPrompt(isExpanding ? `${currentPrompt}\n\n${base}` : base);
      setIsGenerating(false);
    }, 900);
  };

  const handleRefinement = (type: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      let refined = generatedPrompt;
      if (type === "shorter") {
        // Simulate shortening by taking first ~60% of sentences
        const sentences = refined.split(". ");
        refined = sentences.slice(0, Math.ceil(sentences.length * 0.6)).join(". ");
        if (!refined.endsWith(".")) refined += ".";
      } else if (type === "detailed") {
        refined += "\n\nBe specific when discussing features and pricing. Reference the caller's industry when possible. Ask clarifying questions to better understand their use case before making recommendations.";
      } else if (type === "natural") {
        refined = refined
          .replace(/Maintain a /g, "Keep a ")
          .replace(/Your primary goal is to /g, "Focus on ")
          .replace(/responsible for /g, "helping with ");
      }
      setGeneratedPrompt(refined);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="border-t border-border-soft bg-surface-subtle/30">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-soft">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-foreground/[0.06] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-text-strong" />
          </div>
          <div>
            <h3 className="font-display text-[0.88rem] font-semibold text-text-strong tracking-[-0.01em]">
              {isExpanding ? "Improve prompt" : "Generate prompt"}
            </h3>
            <p className="font-body text-[0.68rem] text-text-subtle">
              {isExpanding ? "Expand and refine your existing draft" : "Describe your agent and we'll write the first draft"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-md hover:bg-surface-panel transition-colors text-text-subtle"
          >
            {expanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-surface-panel transition-colors text-text-subtle"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {phase === "input" ? (
        <div className={`px-6 py-5 ${expanded ? "max-h-none" : "max-h-[460px] overflow-y-auto"}`}>
          {isExpanding && (
            <div className="mb-5 p-3.5 rounded-lg bg-surface-panel border border-border-soft">
              <div className="font-body text-[0.65rem] text-text-subtle uppercase tracking-[0.1em] mb-1.5">Current draft</div>
              <p className="font-body text-[0.78rem] text-text-body leading-relaxed line-clamp-3">{currentPrompt}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div className="space-y-1.5">
              <Label className="font-body text-[0.72rem] text-text-subtle">Agent name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Inbound Sales"
                className="h-9 rounded-lg border-border-soft bg-surface-panel font-body text-[0.82rem]"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-[0.72rem] text-text-subtle">Tone</Label>
              <div className="flex flex-wrap gap-1.5">
                {toneOptions.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(tone === t ? "" : t)}
                    className={`px-2.5 py-1 rounded-md font-body text-[0.72rem] border transition-all duration-150 ${
                      tone === t
                        ? "border-foreground bg-foreground text-background"
                        : "border-border-soft bg-surface-panel text-text-body hover:border-foreground/20"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-5">
            <div className="space-y-1.5">
              <Label className="font-body text-[0.72rem] text-text-subtle">What does this agent do?</Label>
              <Input
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g. Qualifies inbound leads and books demos"
                className="h-9 rounded-lg border-border-soft bg-surface-panel font-body text-[0.82rem]"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-[0.72rem] text-text-subtle">Primary goal</Label>
              <Input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Qualify leads and schedule a demo call"
                className="h-9 rounded-lg border-border-soft bg-surface-panel font-body text-[0.82rem]"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-[0.72rem] text-text-subtle">Must-do instructions</Label>
              <textarea
                value={mustDo}
                onChange={(e) => setMustDo(e.target.value)}
                placeholder={"Always greet by name\nConfirm contact details\nOffer a callback option"}
                rows={3}
                className="w-full rounded-lg border border-border-soft bg-surface-panel px-3 py-2 font-body text-[0.82rem] text-text-strong placeholder:text-text-subtle/50 focus:outline-none focus:ring-1 focus:ring-text-strong/10 transition-shadow resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-[0.72rem] text-text-subtle">Things to avoid</Label>
              <textarea
                value={avoid}
                onChange={(e) => setAvoid(e.target.value)}
                placeholder={"Don't discuss competitor pricing\nDon't make promises about delivery dates"}
                rows={2}
                className="w-full rounded-lg border border-border-soft bg-surface-panel px-3 py-2 font-body text-[0.82rem] text-text-strong placeholder:text-text-subtle/50 focus:outline-none focus:ring-1 focus:ring-text-strong/10 transition-shadow resize-none"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-[0.72rem] text-text-subtle">Escalation / transfer rules</Label>
              <Input
                value={escalation}
                onChange={(e) => setEscalation(e.target.value)}
                placeholder="e.g. Transfer to a human if the caller mentions legal issues"
                className="h-9 rounded-lg border-border-soft bg-surface-panel font-body text-[0.82rem]"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="font-body text-[0.72rem] text-text-subtle">
                Additional notes
                <span className="ml-1 text-text-subtle/50 normal-case tracking-normal">(optional)</span>
              </Label>
              <Input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. This agent handles healthcare clients specifically"
                className="h-9 rounded-lg border-border-soft bg-surface-panel font-body text-[0.82rem]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <Button variant="ghost" size="sm" onClick={onClose} className="font-body text-[0.78rem] text-text-subtle">
              Cancel
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || (!purpose && !goal)}
              className="bg-foreground text-background hover:bg-foreground/90 font-display font-medium tracking-[-0.01em] text-[0.8rem] h-9 rounded-lg px-5 gap-2"
            >
              {isGenerating ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  {isExpanding ? "Expand draft" : "Generate prompt"}
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        /* Result phase */
        <div className={`px-6 py-5 ${expanded ? "max-h-none" : "max-h-[520px] overflow-y-auto"}`}>
          {/* Refinement chips */}
          <div className="flex items-center gap-2 mb-4">
            <span className="font-body text-[0.65rem] text-text-subtle uppercase tracking-[0.1em]">Refine</span>
            <div className="flex gap-1.5">
              {refinementActions.map((action) => (
                <button
                  key={action.instruction}
                  onClick={() => handleRefinement(action.instruction)}
                  disabled={isGenerating}
                  className="px-2.5 py-1 rounded-md border border-border-soft bg-surface-panel font-body text-[0.72rem] text-text-body hover:border-foreground/15 hover:text-text-strong transition-all disabled:opacity-50"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generated prompt */}
          <div className="relative mb-5">
            {isGenerating && (
              <div className="absolute inset-0 bg-surface-panel/60 rounded-lg flex items-center justify-center z-10">
                <span className="w-5 h-5 border-2 border-text-subtle/30 border-t-text-strong rounded-full animate-spin" />
              </div>
            )}
            <textarea
              value={generatedPrompt}
              onChange={(e) => setGeneratedPrompt(e.target.value)}
              rows={12}
              className="w-full rounded-lg border border-border-soft bg-surface-panel px-4 py-3.5 font-body text-[0.82rem] text-text-body leading-[1.75] placeholder:text-text-subtle/50 focus:outline-none focus:ring-1 focus:ring-text-strong/10 transition-shadow resize-y"
            />
            <div className="absolute bottom-3 right-3 font-mono text-[0.6rem] text-text-subtle/40">
              {generatedPrompt.length} chars
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setPhase("input")}
              className="font-body text-[0.78rem] text-text-subtle hover:text-text-body transition-colors flex items-center gap-1"
            >
              <ChevronRight className="w-3 h-3 rotate-180" />
              Back to inputs
            </button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRegenerate}
                disabled={isGenerating}
                className="font-body text-[0.78rem] text-text-subtle gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Regenerate
              </Button>
              <Button
                onClick={() => onApply(generatedPrompt)}
                className="bg-foreground text-background hover:bg-foreground/90 font-display font-medium tracking-[-0.01em] text-[0.8rem] h-9 rounded-lg px-5"
              >
                Apply to prompt
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptComposer;
