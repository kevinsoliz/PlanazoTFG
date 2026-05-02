import { fetchServer } from "../lib/api-server";
import { Plan } from "../types/plan";

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

export async function getPlan(id: number): Promise<PlanDetalle | null> {
    const res = await fetchServer(`/api/planes/${id}`);
    if (!res.ok) return null;
    return res.data ?? null;
}

export async function getPlanes(categoria?: string): Promise<Plan[]> {
    const url = categoria
        ? `/api/planes?categoria=${encodeURIComponent(categoria)}`
        : "/api/planes";
    const res = await fetchServer(url);

    if (!res.ok) return [];

    return res.data?.planes ?? [];
}

export async function getPlanesCreados(): Promise<Plan[]> {
    const res = await fetchServer("/api/planes/creados");
    
    if (!res.ok) return [];

    return res.data?.planes ?? [];
}

export async function getPlanesApuntados(): Promise<Plan[]> {
    const res = await fetchServer("/api/planes/apuntado");

    if (!res.ok) return [];

    return res.data?.planes ?? [];
}