"use server";
import { revalidatePath } from "next/cache";
import { fetchServer } from "../lib/api-server";
import { UserProfile } from "../types/user";

export async function getPerfil(): Promise<UserProfile | null> {
  const me = await fetchServer("/api/auth/me");

  if (!me) return null;

  const data = await fetchServer(`/api/perfiles/${me.data.user.id}`);
  return data?.data?.perfil ?? null;
}

type ProfileInput = {
  nombre: string;
  username: string;
  descripcion: string;
  categorias: string;
};

export async function editarPerfil(datos: ProfileInput) {
  const me = await fetchServer("/api/auth/me");

  if (!me) return null;

  const res = await fetchServer(`/api/perfiles/${me.data.user.id}`, {
    method: "PATCH",
    body: datos,
  });

  if (!res.ok) return { error: res.data?.error ?? "Error al editar el perfil" };

  revalidatePath(`/perfil`);

  return { ok: true };
}
