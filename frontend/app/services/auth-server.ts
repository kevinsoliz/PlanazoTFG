import { fetchServer } from "../lib/api-server";
import { AuthUser } from "../types/user";

export async function getCurrentUser(): Promise<AuthUser | null> {
    const res = await fetchServer("/api/auth/me");
    if (!res.ok) return null;
    return res.data?.user ?? null;
}
