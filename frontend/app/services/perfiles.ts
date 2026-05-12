import { fetchServer } from "../lib/api-server";
import { UserProfile } from "../types/user";

export async function getPerfil(): Promise<UserProfile | null> {
  const me = await fetchServer("/api/auth/me");

  if (!me.ok || !me.data?.user?.id) return null; // Verificamos que tenemos el ID del usuario

  const data = await fetchServer(`/api/perfiles/${me.data.user.id}`);
  if (!data.ok) return null; // Verificamos que la solicitud fue exitosa

  return data.data?.perfil ?? null;
}

export async function getPerfilPorId(id: number): Promise<UserProfile | null> {
  const res = await fetchServer(`/api/perfiles/${id}`);
  if (!res.ok) return null;
  return res.data?.perfil ?? null;
}
