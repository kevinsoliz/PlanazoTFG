import { fetchServer } from "../lib/api-server";
import { Plan } from "../types/plan";

// Lo que devuelve /api/planes/:id (plan + lista de participantes + plazas libres).
export interface PlanDetalle {
    plan: Plan;
    participantes: {
        id: number;
        nombre: string;
        username: string;
        avatar_url: string | null;
    }[];
    plazas_disponibles: number;
}

// Detalle de un plan por su id.
export async function getPlan(id: number): Promise<PlanDetalle | null> {
    const res = await fetchServer(`/api/planes/${id}`);
    if (!res.ok) return null;
    return res.data ?? null;
}

// Listado público de planes. Si llega una categoría, filtra por ella.
export async function getPlanes(categoria?: string): Promise<Plan[]> {
    const url = categoria
        ? `/api/planes?categoria=${encodeURIComponent(categoria)}`
        : "/api/planes";
    const res = await fetchServer(url);

    if (!res.ok) return [];

    return res.data?.planes ?? [];
}

// Planes creados por el usuario logueado.
export async function getPlanesCreados(): Promise<Plan[]> {
    const res = await fetchServer("/api/planes/creados");

    if (!res.ok) return [];

    return res.data?.planes ?? [];
}

// Planes a los que el usuario logueado está apuntado (sin contar los suyos).
export async function getPlanesApuntados(): Promise<Plan[]> {
    const res = await fetchServer("/api/planes/apuntado");

    if (!res.ok) return [];

    return res.data?.planes ?? [];
}

// Planes creados por un usuario concreto (para su perfil público).
export async function getPlanesCreadosPor(userId: number): Promise<Plan[]> {
    const res = await fetchServer(`/api/planes/usuario/${userId}`);

    if (!res.ok) return [];

    return res.data?.planes ?? [];
}
