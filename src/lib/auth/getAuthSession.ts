import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function getAuthSession() {
  const SESSION_COOKIE = "session_id";
  const sessionId = (await cookies()).get(SESSION_COOKIE)?.value;

  // 1. Try to find a real session
  if (sessionId) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });

    if (session && session.expiresAt > new Date()) {
      return session;
    }
  }

  // 2. Developer Mode Bypass
  if (process.env.NODE_ENV === "development") {
    // Return the first available user (admin) as a mock session
    const devUser = await prisma.user.findFirst();
    if (devUser) {
      console.log(`🛠️ [Auth] Developer mode bypass: Impersonating ${devUser.email}`);
      return {
        id: "dev-session",
        userId: devUser.id,
        user: devUser,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day fallback
      };
    }
  }

  return null;
}
