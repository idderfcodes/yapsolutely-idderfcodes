import { z } from "zod";

/* ------------------------------------------------------------------ */
/*  Shared field definitions                                          */
/* ------------------------------------------------------------------ */

const requiredId = z.string().min(1);

const agentName = z.string().min(1).max(200);
const systemPrompt = z.string().min(1).max(50_000);
const optionalText = z.string().max(2_000).optional().default("");
const optionalVoice = z.string().max(100).optional().default("");
const optionalTransfer = z.string().max(30).optional().default("");

const agentStatusEnum = z.enum(["DRAFT", "ACTIVE", "PAUSED", "ARCHIVED"]);

/* ------------------------------------------------------------------ */
/*  Agent schemas                                                     */
/* ------------------------------------------------------------------ */

export const createAgentSchema = z.object({
  name: agentName,
  description: optionalText,
  systemPrompt,
  firstMessage: optionalText,
  voiceModel: optionalVoice,
  transferNumber: optionalTransfer,
});

export const updateAgentSchema = z.object({
  agentId: requiredId,
  name: agentName,
  description: optionalText,
  systemPrompt,
  firstMessage: optionalText,
  voiceModel: optionalVoice,
  transferNumber: optionalTransfer,
  status: z.string().max(20).optional().default(""),
  phoneNumberId: z.string().max(100).optional().default(""),
});

export const archiveAgentSchema = z.object({
  agentId: requiredId,
});

export const toggleAgentStatusSchema = z.object({
  agentId: requiredId,
  newStatus: agentStatusEnum,
});

export const duplicateAgentSchema = z.object({
  agentId: requiredId,
});

export const saveFlowSchema = z.object({
  agentId: requiredId,
  flow: z.string().min(1).max(500_000),
});

export const generatePromptFromFlowSchema = z.object({
  agentId: requiredId,
  flow: z.string().min(1).max(500_000),
  generatedPrompt: z.string().min(1).max(50_000),
});

export const importAgentSchema = z.object({
  agentJson: z.string().min(1).max(500_000),
});

/* ------------------------------------------------------------------ */
/*  Phone number schemas                                              */
/* ------------------------------------------------------------------ */

export const registerPhoneNumberSchema = z.object({
  phoneNumber: z.string().min(1).max(30),
  friendlyName: z.string().max(100).optional().default(""),
  twilioSid: z.string().max(100).optional().default(""),
  agentId: z.string().max(100).optional().default(""),
});

export const deletePhoneNumberSchema = z.object({
  phoneNumberId: requiredId,
});

export const reassignPhoneNumberSchema = z.object({
  phoneNumberId: requiredId,
  agentId: z.string().max(100).optional().default(""),
});

/* ------------------------------------------------------------------ */
/*  Auth schemas                                                      */
/* ------------------------------------------------------------------ */

export const signInSchema = z.object({
  email: z.string().email().max(320),
  password: z.string().max(128).optional().default(""),
});

export const signUpSchema = z.object({
  email: z.string().email().max(320),
  name: z.string().max(100).optional().default(""),
  password: z.string().max(128).optional().default(""),
});

export const updateProfileSchema = z.object({
  name: z.string().min(1).max(100),
});
