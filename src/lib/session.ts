import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE_NAME, verifySessionToken } from "./auth";

export async function getSession(): Promise<{ userId: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = await verifySessionToken(token);
  if (!payload?.sub) return null;

  return { userId: payload.sub };
}

export async function requireSession(): Promise<{ userId: string }> {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}
