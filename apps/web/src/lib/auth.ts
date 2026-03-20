import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export const SESSION_COOKIE_NAME = "yapsolutely_session";

export type SessionUser = {
  email: string;
  name?: string;
};

export async function ensureWorkspaceUser(session: SessionUser) {
  try {
    return await prisma.user.upsert({
      where: {
        email: session.email,
      },
      update: {
        name: session.name,
      },
      create: {
        email: session.email,
        name: session.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    return JSON.parse(sessionCookie) as SessionUser;
  } catch {
    return null;
  }
}

export async function requireSession() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  await ensureWorkspaceUser(session);

  return session;
}