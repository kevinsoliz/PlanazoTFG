import { fetchServer } from "../lib/api-server";
import { Plan } from "../types/plan";

export async function getPlanes(): Promise<Plan[]> {
    const res = await fetchServer("/api/planes");

    if (!res.ok) return [];

    return res.data?.planes ?? [];
}