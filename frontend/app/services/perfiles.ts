import { fetchServer } from "../lib/api-server";
import { UserProfile } from "../types/user";

// Perfil del usuario logueado: pide /me para saber su id, luego /perfiles/:id.
export async function getPerfil(): Promise<UserProfile | null> {
  const me = await fetchServer("/api/auth/me");

  if (!me.ok || !me.data?.user?.id) return null;

  const data = await fetchServer(`/api/perfiles/${me.data.user.id}`);
  if (!data.ok) return null;

  return data.data?.perfil ?? null;
}

// Perfil público de cualquier usuario por su id.
export async function getPerfilPorId(id: number): Promise<UserProfile | null> {
  const res = await fetchServer(`/api/perfiles/${id}`);
  if (!res.ok) return null;
  return res.data?.perfil ?? null;
}
