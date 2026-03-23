"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ensureWorkspaceUser, SESSION_COOKIE_NAME } from "@/lib/auth";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signInSchema, signUpSchema, updateProfileSchema } from "@/lib/validations";
import { sendOtpAction } from "@/app/_actions/verification";

function normalizeEmail(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function normalizeName(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

async function setSessionCookie(email: string, name?: string) {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify({ email, name }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function signInAction(formData: FormData) {
  const parsed = signInSchema.safeParse({
    email: normalizeEmail(formData.get("email")),
    password: typeof formData.get("password") === "string" ? (formData.get("password") as string) : "",
  });

  if (!parsed.success) {
    redirect("/sign-in?error=missing-email");
  }

  const { email, password } = parsed.data;

  // If password provided, verify it
  if (password) {
    try {
      const user = await prisma.user.findUnique({ where: { email }, select: { passwordHash: true, name: true } });
      if (!user?.passwordHash) {
        redirect("/sign-in?error=invalid-credentials");
      }
      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) {
        redirect("/sign-in?error=invalid-credentials");
      }
      await setSessionCookie(email, user.name || undefined);
      await ensureWorkspaceUser({ email, name: user.name || undefined });
      redirect("/dashboard");
    } catch (e: unknown) {
      // redirect() throws NEXT_REDIRECT — rethrow it
      if (e && typeof e === "object" && "digest" in e) throw e;
      redirect("/sign-in?error=invalid-credentials");
    }
  }

  // Passwordless fallback (demo mode)
  await setSessionCookie(email);
  await ensureWorkspaceUser({ email });
  redirect("/dashboard");
}

export async function signUpAction(formData: FormData) {
  const parsed = signUpSchema.safeParse({
    email: normalizeEmail(formData.get("email")),
    name: normalizeName(formData.get("name")),
    password: typeof formData.get("password") === "string" ? (formData.get("password") as string) : "",
  });

  if (!parsed.success) {
    redirect("/sign-up?error=missing-email");
  }

  const { email, name, password } = parsed.data;

  // If password provided, hash and store
  if (password) {
    if (password.length < 8) {
      redirect("/sign-up?error=password-too-short");
    }
    try {
      const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
      if (existing) {
        redirect("/sign-up?error=email-taken");
      }
      const hash = await bcrypt.hash(password, 12);
      await prisma.user.create({
        data: { email, name: name || undefined, passwordHash: hash },
      });
      // Send OTP for email verification
      await sendOtpAction(email);
      redirect(`/verify-identity?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name || "")}`);
    } catch (e: unknown) {
      if (e && typeof e === "object" && "digest" in e) throw e;
      redirect("/sign-up?error=signup-failed");
    }
  }

  // Passwordless fallback — send OTP
  try {
    const existingUser = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (!existingUser) {
      await prisma.user.create({ data: { email, name: name || undefined } });
    }
    await sendOtpAction(email);
    redirect(`/verify-identity?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name || "")}`);
  } catch (e: unknown) {
    if (e && typeof e === "object" && "digest" in e) throw e;
    redirect("/sign-up?error=signup-failed");
  }
}

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/sign-in");
}

export async function updateProfileAction(formData: FormData) {
  const parsed = updateProfileSchema.safeParse({
    name: normalizeName(formData.get("name")),
  });

  if (!parsed.success) {
    redirect("/settings?error=missing-name");
  }

  const { name } = parsed.data;

  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!raw) {
    redirect("/sign-in");
  }

  const session = JSON.parse(raw) as { email: string; name?: string };
  await setSessionCookie(session.email, name);
  await ensureWorkspaceUser({ email: session.email, name });
  redirect("/settings?saved=1");
}