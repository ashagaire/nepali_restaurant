import { clearSession } from "@/lib/auth/session";

export async function POST() {
  await clearSession();
  return new Response("Logged out", { status: 200 });
}
