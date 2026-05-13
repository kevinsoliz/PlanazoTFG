'use server'
// Funciones que se ejecutan en el servidor pero se pueden llamar desde el cliente.

import { revalidatePath } from "next/cache";
import { fetchServer } from "../lib/api-server";
import type { PlanInput } from "../types/plan";


// Unirse a un plan.
export async function unirseAPlan(planId: number) {
    const res = await fetchServer(`/api/planes/${planId}/join`, { method: "POST"});

    if (!res.ok) {
        return { error: res.data?.error ?? "Error al unirse al plan"}
    }

    revalidatePath("/home");

    return { ok: true };
}

// Salir de un plan.
export async function abandonarPlan(planId: number) {
    const res = await fetchServer(`/api/planes/${planId}/join`, { method: "DELETE"});

    if (!res.ok) {
        return { error: res.data?.error ?? "Error al abandonar el plan"}
    }

    revalidatePath("/mis-planes");

    return { ok: true };
}

// Borrar un plan (solo el creador puede hacerlo; el backend lo comprueba).
export async function borrarPlan(planId: number) {
    const res = await fetchServer(`/api/planes/${planId}`, { method: "DELETE"});

    if (!res.ok) return { error: res.data?.error ?? "Error al borrar el plan"}

    revalidatePath("/mis-planes");

    return {ok: true}
}

// Crear un plan. Refrescamos /home y /mis-planes para que aparezca en ambas.
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

/* Valorar un plan (de 0.5 a 5, en pasos de 0.5). Solo los participantes
   pueden valorar; el backend lo comprueba. Refrescamos las rutas donde se
   muestra la nota para que se vea el cambio. */
export async function valorarPlan(planId: number, puntuacion: number) {
    const res = await fetchServer(`/api/planes/${planId}/rate`, {
        method: "POST",
        body: { puntuacion }
    });

    if (!res.ok) {
        return { error: res.data?.error ?? "Error al valorar el plan" };
    }

    revalidatePath(`/home/${planId}`);
    revalidatePath("/home");
    revalidatePath("/mis-planes");

    return { ok: true };
}

// Editar un plan. Refrescamos /home y /mis-planes para reflejar los cambios.
export async function editarPlan(planId: number, datos: PlanInput) {
    const res = await fetchServer(`/api/planes/${planId}`, {
        method: "PUT",
        body: datos
    })

    if (!res.ok) return {error: res.data?.error ?? "Error al editar el plan"};

    revalidatePath("/home");
    revalidatePath("/mis-planes");

    return { ok: true };
}
