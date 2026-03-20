import { PrismaClient } from "@prisma/client";

declare global {
  var __yapsolutelyPrisma__: PrismaClient | undefined;
}

export const prisma =
  globalThis.__yapsolutelyPrisma__ ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__yapsolutelyPrisma__ = prisma;
}