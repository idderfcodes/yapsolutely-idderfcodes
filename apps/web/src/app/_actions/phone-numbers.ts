"use server";

import { PhoneNumberProvider } from "@prisma/client";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { normalizePhoneNumber } from "@/lib/phone-number-data";

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function registerPhoneNumberAction(formData: FormData) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const rawPhoneNumber = readText(formData, "phoneNumber");
  const phoneNumber = normalizePhoneNumber(rawPhoneNumber);
  const friendlyName = readText(formData, "friendlyName");
  const twilioSid = readText(formData, "twilioSid");
  const agentId = readText(formData, "agentId");

  if (!phoneNumber) {
    redirect("/numbers?error=missing-phone-number");
  }

  try {
    const user = await prisma.user.upsert({
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
    });

    if (agentId) {
      const existingAgent = await prisma.agent.findFirst({
        where: {
          id: agentId,
          userId: user.id,
        },
        select: {
          id: true,
        },
      });

      if (!existingAgent) {
        redirect("/numbers?error=invalid-agent");
      }
    }

    const existingPhoneNumber = await prisma.phoneNumber.findUnique({
      where: {
        phoneNumber,
      },
      select: {
        id: true,
      },
    });

    if (existingPhoneNumber) {
      redirect("/numbers?error=duplicate-phone-number");
    }

    if (twilioSid) {
      const existingTwilioSid = await prisma.phoneNumber.findUnique({
        where: {
          twilioSid,
        },
        select: {
          id: true,
        },
      }).catch(() => null);

      if (existingTwilioSid) {
        redirect("/numbers?error=duplicate-twilio-sid");
      }
    }

    await prisma.phoneNumber.create({
      data: {
        userId: user.id,
        provider: PhoneNumberProvider.TWILIO,
        phoneNumber,
        friendlyName: friendlyName || null,
        twilioSid: twilioSid || null,
        agentId: agentId || null,
      },
    });

    redirect("/numbers?created=1");
  } catch {
    redirect("/numbers?error=database-unavailable");
  }
}

export async function deletePhoneNumberAction(formData: FormData) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const phoneNumberId = readText(formData, "phoneNumberId");

  if (!phoneNumberId) {
    redirect("/numbers?error=missing-phone-number-id");
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      redirect("/sign-in");
    }

    const existingPhoneNumber = await prisma.phoneNumber.findFirst({
      where: {
        id: phoneNumberId,
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (!existingPhoneNumber) {
      redirect("/numbers?error=not-found");
    }

    await prisma.phoneNumber.delete({
      where: {
        id: phoneNumberId,
      },
    });

    redirect("/numbers?deleted=1");
  } catch {
    redirect("/numbers?error=database-unavailable");
  }
}

export async function reassignPhoneNumberAction(formData: FormData) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const phoneNumberId = readText(formData, "phoneNumberId");
  const agentId = readText(formData, "agentId");

  if (!phoneNumberId) {
    redirect("/numbers?error=missing-phone-number-id");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.email },
      select: { id: true },
    });

    if (!user) {
      redirect("/sign-in");
    }

    const phone = await prisma.phoneNumber.findFirst({
      where: { id: phoneNumberId, userId: user.id },
      select: { id: true },
    });

    if (!phone) {
      redirect("/numbers?error=not-found");
    }

    if (agentId) {
      const agent = await prisma.agent.findFirst({
        where: { id: agentId, userId: user.id },
        select: { id: true },
      });
      if (!agent) {
        redirect("/numbers?error=invalid-agent");
      }
    }

    await prisma.phoneNumber.update({
      where: { id: phoneNumberId },
      data: { agentId: agentId || null },
    });

    redirect("/numbers?updated=1");
  } catch {
    redirect("/numbers?error=database-unavailable");
  }
}