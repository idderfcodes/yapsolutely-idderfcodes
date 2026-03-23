"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

function detectCardBrand(number: string): string {
  if (/^4/.test(number)) return "Visa";
  if (/^5[1-5]/.test(number)) return "Mastercard";
  if (/^3[47]/.test(number)) return "Amex";
  if (/^6(?:011|5)/.test(number)) return "Discover";
  return "Card";
}

export async function addPaymentMethodAction(formData: FormData) {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  const cardNumber = (formData.get("cardNumber") as string)?.replace(/\s+/g, "") ?? "";
  const expiryRaw = (formData.get("expiry") as string) ?? "";
  const billingName = ((formData.get("billingName") as string) ?? "").trim();

  // Validate card number (basic length check — real validation would use a payment provider)
  if (!/^\d{13,19}$/.test(cardNumber)) {
    redirect("/billing?error=invalid-card");
  }

  // Parse MM/YY
  const expiryMatch = expiryRaw.match(/^(\d{2})\s*\/\s*(\d{2,4})$/);
  if (!expiryMatch) {
    redirect("/billing?error=invalid-expiry");
  }

  const expiryMonth = parseInt(expiryMatch[1], 10);
  const expiryYear = expiryMatch[2].length === 2
    ? 2000 + parseInt(expiryMatch[2], 10)
    : parseInt(expiryMatch[2], 10);

  if (expiryMonth < 1 || expiryMonth > 12) {
    redirect("/billing?error=invalid-expiry");
  }

  if (!billingName || billingName.length < 2) {
    redirect("/billing?error=invalid-name");
  }

  const cardLast4 = cardNumber.slice(-4);
  const cardBrand = detectCardBrand(cardNumber);

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.email },
      select: { id: true },
    });

    if (!user) redirect("/sign-in");

    // Set all existing methods to non-default
    await prisma.paymentMethod.updateMany({
      where: { userId: user!.id },
      data: { isDefault: false },
    });

    await prisma.paymentMethod.create({
      data: {
        userId: user!.id,
        cardLast4,
        cardBrand,
        expiryMonth,
        expiryYear,
        billingName,
        isDefault: true,
      },
    });

    redirect("/billing?saved=1");
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    redirect("/billing?error=save-failed");
  }
}

export async function deletePaymentMethodAction(formData: FormData) {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  const methodId = (formData.get("methodId") as string) ?? "";
  if (!methodId) redirect("/billing?error=missing-id");

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.email },
      select: { id: true },
    });

    if (!user) redirect("/sign-in");

    await prisma.paymentMethod.deleteMany({
      where: { id: methodId, userId: user!.id },
    });

    redirect("/billing?deleted=1");
  } catch (error) {
    if (error && typeof error === "object" && "digest" in error) throw error;
    redirect("/billing?error=delete-failed");
  }
}
