// lib/auth/session.ts
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import crypto from "crypto";

const SESSION_COOKIE_NAME = "session_id";
const SESSION_DURATION_DAYS = 7;

export async function createSession(userId: string) {
  const sessionId = crypto.randomUUID();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DURATION_DAYS);

  await prisma.session.create({
    data: {
      id: sessionId,
      userId,
      expiresAt,
    },
  });

  // Set HttpOnly cookie
  cookies().set({
    name: SESSION_COOKIE_NAME,
    value: sessionId,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}
