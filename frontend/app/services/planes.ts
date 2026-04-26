import { fetchServer } from "../lib/api-server";
import { Plan } from "../types/plan";

export async function getPlanes(): Promise<Plan[]> {
    const res = await fetchServer("/api/planes");

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