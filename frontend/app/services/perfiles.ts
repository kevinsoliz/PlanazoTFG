import { fetchServer } from "../lib/api-server";
import { UserProfile } from "../types/user";

export async function getPerfil(): Promise<UserProfile | null> {
  const me = await fetchServer("/api/auth/me");

  if (!me) return null;

  const data = await fetchServer(`/api/perfiles/${me.data.user.id}`);
  return data?.data?.perfil ?? null;
}
