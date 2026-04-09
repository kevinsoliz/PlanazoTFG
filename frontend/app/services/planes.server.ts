import { fetchServer } from "../lib/api-server";
import { Plan } from "../types/plan";

export async function getPlanes(): Promise<Plan[]> {
    const data = await fetchServer("/api/planes");
    return data?.planes ?? "nada de nada";
    
}