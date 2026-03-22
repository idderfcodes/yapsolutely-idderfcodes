import { AgentStatus } from "@prisma/client";
import { prisma } from "@/lib/db";

export type AgentListFilters = {
  query?: string;
  status?: string;
};

export type AgentListItem = {
  id: string;
  name: string;
  slug: string | null;
  status: AgentStatus;
  isActive: boolean;
  voiceModel: string | null;
  firstMessage: string | null;
  updatedAt: Date;
  phoneNumber: string | null;
  callCount: number;
};

export type PhoneNumberOption = {
  id: string;
  phoneNumber: string;
  friendlyName: string | null;
  assignedAgentId: string | null;
};

export async function listAgentsForUser(
  email: string,
  filters: AgentListFilters = {},
): Promise<AgentListItem[]> {
  const query = filters.query?.trim() || "";
  const normalizedStatus = filters.status?.trim().toUpperCase() || "";

  try {
    const agents = await prisma.agent.findMany({
      where: {
        user: {
          email,
        },
        ...(normalizedStatus && normalizedStatus !== "ALL"
          ? { status: normalizedStatus as AgentStatus }
          : {}),
        ...(query
          ? {
              OR: [
                {
                  name: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  description: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  firstMessage: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  voiceModel: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              ],
            }
          : {}),
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        status: true,
        isActive: true,
        voiceModel: true,
        firstMessage: true,
        updatedAt: true,
        phoneNumbers: {
          take: 1,
          select: { phoneNumber: true },
        },
        _count: {
          select: { calls: true },
        },
      },
    });

    return agents.map((a) => ({
      id: a.id,
      name: a.name,
      slug: a.slug,
      status: a.status,
      isActive: a.isActive,
      voiceModel: a.voiceModel,
      firstMessage: a.firstMessage,
      updatedAt: a.updatedAt,
      phoneNumber: a.phoneNumbers[0]?.phoneNumber ?? null,
      callCount: a._count.calls,
    }));
  } catch {
    return [];
  }
}

export async function getAgentByIdForUser(email: string, agentId: string) {
  try {
    return await prisma.agent.findFirst({
      where: {
        id: agentId,
        user: {
          email,
        },
      },
      include: {
        phoneNumbers: {
          orderBy: {
            createdAt: "desc",
          },
        },
        calls: {
          take: 5,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  } catch {
    return null;
  }
}

export async function getAgentBySlugOrIdForUser(email: string, identifier: string) {
  try {
    return await prisma.agent.findFirst({
      where: {
        user: { email },
        OR: [{ slug: identifier }, { id: identifier }],
      },
      include: {
        phoneNumbers: {
          orderBy: { createdAt: "desc" },
        },
        calls: {
          take: 5,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            callerNumber: true,
            status: true,
            durationSeconds: true,
            createdAt: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
}

export async function listPhoneNumbersForUser(email: string): Promise<PhoneNumberOption[]> {
  try {
    return await prisma.phoneNumber.findMany({
      where: {
        user: {
          email,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        phoneNumber: true,
        friendlyName: true,
        agentId: true,
      },
    }).then((items) =>
      items.map((item) => ({
        id: item.id,
        phoneNumber: item.phoneNumber,
        friendlyName: item.friendlyName,
        assignedAgentId: item.agentId,
      })),
    );
  } catch {
    return [];
  }
}