"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { generateOtp, sendVerificationEmail } from "@/lib/email";
import { ensureWorkspaceUser, SESSION_COOKIE_NAME } from "@/lib/auth";

const OTP_EXPIRY_MINUTES = 10;

export async function sendOtpAction(email: string) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Invalid email address" };
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Delete any existing unused codes for this email
  await prisma.emailVerification.deleteMany({
    where: { email: normalizedEmail, verified: false },
  });

  const code = generateOtp();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

  await prisma.emailVerification.create({
    data: { email: normalizedEmail, code, expiresAt },
  });

  try {
    await sendVerificationEmail(normalizedEmail, code);
    return { success: true };
  } catch {
    return { error: "Failed to send email. Please try again." };
  }
}

export async function verifyOtpAction(email: string, code: string) {
  if (!email || !code || code.length !== 6) {
    return { error: "Invalid code" };
  }

  const normalizedEmail = email.trim().toLowerCase();

  const record = await prisma.emailVerification.findFirst({
    where: {
      email: normalizedEmail,
      code,
      verified: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!record) {
    return { error: "Invalid or expired code" };
  }

  await prisma.emailVerification.update({
    where: { id: record.id },
    data: { verified: true },
  });

  return { success: true };
}

export async function saveOnboardingAction(data: {
  role: string;
  agentCount: string;
  industry: string;
  email: string;
}) {
  if (!data.email) return { error: "Not authenticated" };

  const normalizedEmail = data.email.trim().toLowerCase();

  await prisma.user.update({
    where: { email: normalizedEmail },
    data: {
      workspaceSettings: {
        role: data.role,
        agentCount: data.agentCount,
        industry: data.industry,
        onboardedAt: new Date().toISOString(),
      },
    },
  });

  return { success: true };
}

export async function completeVerificationAction(email: string, name?: string) {
  if (!email) return { error: "Missing email" };

  const normalizedEmail = email.trim().toLowerCase();

  // Confirm that a verified OTP exists for this email
  const verified = await prisma.emailVerification.findFirst({
    where: { email: normalizedEmail, verified: true },
    orderBy: { createdAt: "desc" },
  });

  if (!verified) {
    return { error: "Email not verified" };
  }

  // Set session cookie
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify({ email: normalizedEmail, name }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  await ensureWorkspaceUser({ email: normalizedEmail, name });
  return { success: true };
}
