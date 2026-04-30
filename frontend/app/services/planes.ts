import { fetchServer } from "../lib/api-server";
import { Plan } from "../types/plan";

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