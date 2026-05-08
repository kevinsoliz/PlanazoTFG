'use server'
import { revalidatePath } from "next/cache";
import { fetchServer } from "../lib/api-server";
import type { PlanInput } from "../types/plan";

export async function unirseAPlan(planId: number) {
    const res = await fetchServer(`/api/planes/${planId}/join`, { method: "POST"});
    
    if (!res.ok) {
        return { error: res.data?.error ?? "Error al unirse al plan"}
    }

    revalidatePath("/home");
    
    return { ok: true };
}
export async function abandonarPlan(planId: number) {

    const res = await fetchServer(`/api/planes/${planId}/join`, { method: "DELETE"});

    if (!res.ok) {
        return { error: res.data?.error ?? "Error al abandonar el plan"}
    }

    revalidatePath("/mis-planes");

    return { ok: true };
}

export async function borrarPlan(planId: number) {
    const res = await fetchServer(`/api/planes/${planId}`, { method: "DELETE"});

    if (!res.ok) return { error: res.data?.error ?? "Error al borrar el plan"}

    // esta function invalida la caché de datos y fuerza la re-ejecución de los server componentes de esa ruta.
    revalidatePath("/mis-planes");

    return {ok: true}
}

export async function crearPlan(datos: PlanInput) {
    const res = await fetchServer("/api/planes", {
        method: "POST",
        body: datos
    });

    if (!res.ok) {
        return { error: res.data?.error ?? "Error al crear el plan"};
    }

    revalidatePath("/home");
    revalidatePath("/mis-planes");

    return { ok: true };
}

export async function editarPlan(planId: number, datos: PlanInput) {
    const res = await fetchServer(`/api/planes/${planId}`, {
        method: "PUT",
        body: datos
    })

<<<<<<< HEAD
    if (!res.ok) {
        return { error: res.data?.error ?? "Error al editar el plan" };
    }
=======
    if (!res.ok) return {error: res.data?.error ?? "Error al editar el plan"};
>>>>>>> origin/dev

    revalidatePath("/home");
    revalidatePath("/mis-planes");

    return { ok: true };
}

export async function abandonarPlan(planId: number) {
    const res = await fetchServer(`/api/planes/${planId}/join`, { method: "DELETE" });
    
    if (!res.ok) {
        return { error: res.data?.error ?? "Error al abandonar el plan" }
    }

    revalidatePath("/home");
    revalidatePath("/mis-planes");
    
    return { ok: true };
}

export async function valorarPlan(planId: number, puntuacion: number) {
    const res = await fetchServer(`/api/planes/${planId}/rate`, {
        method: "POST",
        body: { puntuacion }
    });

    if (!res.ok) {
        return { error: res.data?.error ?? "Error al valorar el plan" };
    }

    revalidatePath("/home");
    revalidatePath("/apuntado");

    return { ok: true };
}