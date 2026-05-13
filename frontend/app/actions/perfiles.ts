"use server";
// Funciones que se ejecutan en el servidor pero se pueden llamar desde el cliente.

import { revalidatePath } from "next/cache";
import { fetchServer } from "../lib/api-server";
import type { ProfileUpdate } from "../types/user";

// Edita el perfil del usuario logueado y refresca la vista /perfil.
export async function editarPerfil(datos: ProfileUpdate) {
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
