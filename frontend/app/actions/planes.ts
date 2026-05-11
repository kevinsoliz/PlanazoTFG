'use server'
/* Esta directiva le indica a Next.js que todas las funciones de este archivo
   son Server Actions, es decir, se ejecutan únicamente en el servidor.
   Esto nos permite realizar operaciones seguras como llamadas a APIs internas
   sin exponer lógica sensible al cliente. */

import { revalidatePath } from "next/cache";
/* revalidatePath es una función de Next.js que nos permite invalidar la caché
   de una ruta específica, forzando que los Server Components de esa ruta
   vuelvan a ejecutarse y obtengan datos frescos en la próxima visita. */

import { fetchServer } from "../lib/api-server";
/* Utilidad personalizada para realizar peticiones HTTP desde el servidor.
   Es probable que esta función gestione internamente cabeceras de autenticación
   u otras configuraciones comunes a todas las llamadas a la API. */

import type { PlanInput } from "../types/plan";
/* Importamos únicamente el tipo TypeScript de PlanInput.
   Al usar "import type", nos aseguramos de que este import desaparece
   completamente en el bundle final, ya que solo se usa en tiempo de compilación. */

/* Permite que el usuario autenticado se una a un plan existente.
   Realiza una petición POST al endpoint de unión y, si tiene éxito,
   invalida la caché de la página principal para reflejar el cambio. */
export async function unirseAPlan(planId: number) {
    const res = await fetchServer(`/api/planes/${planId}/join`, { method: "POST"});
    
    if (!res.ok) {
        /* Si la respuesta no es exitosa, devolvemos un objeto de error.
           Usamos el operador "??" (nullish coalescing) para mostrar el mensaje
           del servidor si existe, o un mensaje genérico como alternativa. */
        return { error: res.data?.error ?? "Error al unirse al plan"}
    }

    revalidatePath("/home"); // Actualizamos la caché de /home para reflejar el nuevo estado del plan.
    
    return { ok: true };
}

/* Permite que el usuario autenticado abandone un plan al que pertenece.
   Realiza una petición DELETE al endpoint de unión y, si tiene éxito,
   invalida la caché de la sección "mis planes". */
export async function abandonarPlan(planId: number) {
    const res = await fetchServer(`/api/planes/${planId}/join`, { method: "DELETE"});

    if (!res.ok) {
        return { error: res.data?.error ?? "Error al abandonar el plan"}
    }

    revalidatePath("/mis-planes"); // Actualizamos la caché para que el plan ya no aparezca en la lista del usuario.

    return { ok: true };
}

/* Elimina permanentemente un plan por su ID.
   Solo debería ser accesible por el creador del plan.
   Tras el borrado, invalida la caché de "mis planes" para que
   el plan eliminado desaparezca de la lista inmediatamente. */
export async function borrarPlan(planId: number) {
    const res = await fetchServer(`/api/planes/${planId}`, { method: "DELETE"});

    if (!res.ok) return { error: res.data?.error ?? "Error al borrar el plan"}

    revalidatePath("/mis-planes"); // Forzamos la re-ejecución de los Server Components de esta ruta.

    return {ok: true}
}

/* Crea un nuevo plan con los datos proporcionados por el usuario.
   Realiza una petición POST con el cuerpo del plan y, si tiene éxito,
   invalida la caché de dos rutas: "/home" y "/mis-planes", ya que
   el nuevo plan debería aparecer reflejado en ambas. */
export async function crearPlan(datos: PlanInput) {
    const res = await fetchServer("/api/planes", {
        method: "POST",
        body: datos // Enviamos los datos del nuevo plan como cuerpo de la petición.
    });

    if (!res.ok) {
        return { error: res.data?.error ?? "Error al crear el plan"};
    }

    /* Invalidamos ambas rutas porque el plan recién creado debe aparecer
       tanto en el feed general (/home) como en la lista personal (/mis-planes). */
    revalidatePath("/home");
    revalidatePath("/mis-planes");

    return { ok: true };
}

/* Actualiza los datos de un plan existente identificado por su ID.
   Realiza una petición PUT con los nuevos datos y, si tiene éxito,
   invalida la caché de las rutas afectadas para mostrar la información actualizada. */
export async function editarPlan(planId: number, datos: PlanInput) {
    const res = await fetchServer(`/api/planes/${planId}`, {
        method: "PUT",
        body: datos // Enviamos los datos actualizados del plan.
    })

    if (!res.ok) return {error: res.data?.error ?? "Error al editar el plan"};

    /* Al igual que en crearPlan, invalidamos ambas rutas para garantizar
       que los cambios se reflejen en todos los lugares donde aparece el plan. */
    revalidatePath("/home");
    revalidatePath("/mis-planes");

    return { ok: true };
}