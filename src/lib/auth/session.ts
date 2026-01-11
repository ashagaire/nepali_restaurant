// lib/auth/session.ts
import { Prisma } from "@prisma/client";

export async function createSession(
  tx: Prisma.TransactionClient,
  userId: string,
  days = 7
) {
  return tx.session.create({
    data: {
      userId,
      expiresAt: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
    },
  });
}
