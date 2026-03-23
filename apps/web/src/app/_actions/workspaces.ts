"use server";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);
}

export async function createWorkspaceAction(formData: FormData) {
  const session = await getSession();
  if (!session) return { error: "Not authenticated" };

  const name = (formData.get("name") as string)?.trim();
  if (!name || name.length < 2) return { error: "Name must be at least 2 characters" };
  if (name.length > 50) return { error: "Name must be 50 characters or less" };

  const user = await prisma.user.findUnique({ where: { email: session.email } });
  if (!user) return { error: "User not found" };

  // Limit workspaces per user
  const count = await prisma.workspace.count({ where: { ownerId: user.id } });
  if (count >= 5) return { error: "Maximum 5 workspaces allowed" };

  const baseSlug = toSlug(name);
  let slug = baseSlug || "workspace";
  let suffix = 0;
  while (await prisma.workspace.findUnique({ where: { slug } })) {
    suffix++;
    slug = `${baseSlug}-${suffix}`;
  }

  const workspace = await prisma.workspace.create({
    data: {
      name,
      slug,
      ownerId: user.id,
      members: {
        create: { userId: user.id, role: "owner" },
      },
    },
  });

  return { success: true, id: workspace.id, slug: workspace.slug };
}
