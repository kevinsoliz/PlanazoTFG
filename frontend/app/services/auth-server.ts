import { fetchServer } from "../lib/api-server";
import { AuthUser } from "../types/user";

// Pide al backend el usuario de la sesión actual; devuelve null si no hay sesión.
export async function getCurrentUser(): Promise<AuthUser | null> {
    const res = await fetchServer("/api/auth/me");
    if (!res.ok) return null;
    return res.data?.user ?? null;
}
