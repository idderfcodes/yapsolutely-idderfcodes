import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import BillingClient from "./billing-client";

export default async function BillingPage() {
  const session = await requireSession();

  const user = await prisma.user.findUnique({
    where: { email: session.email },
    select: { id: true },
  });

  const paymentMethods = user
    ? await prisma.paymentMethod.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          cardLast4: true,
          cardBrand: true,
          expiryMonth: true,
          expiryYear: true,
          billingName: true,
          isDefault: true,
        },
      })
    : [];

  return <BillingClient paymentMethods={paymentMethods} />;
}
