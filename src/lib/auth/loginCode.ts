import { Prisma } from "@prisma/client";

export function markLoginCodeUsed(
  tx: Prisma.TransactionClient,
  loginCodeId: string
) {
  return tx.loginCode.update({
    where: { id: loginCodeId },
    data: { used: true },
  });
}
