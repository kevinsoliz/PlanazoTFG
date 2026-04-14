'use server'
import { revalidatePath } from "next/cache";
import { fetchServer } from "../lib/api-server";

export async function unirseAPlan(planId: number) {

    const res = await fetchServer(`/api/planes/${planId}/join`, { method: "POST"});
    
    if (!res.ok) {
        return { error: res.data?.error ?? "Error al unirse al plan"}
    }

    revalidatePath("/home");
    
    return { ok: true };
}

export async function borrarPlan(planId: number) {
    const res = await fetchServer(`/api/planes/${planId}`, { method: "DELETE"});

    if (!res.ok) return { error: res.data?.error ?? "Error al borrar el plan"}

    // esta function invalida la caché de datos y fuerza la re-ejecución de los server componentes de esa ruta.
    revalidatePath("/mis-planes");

    return {ok: true}
}