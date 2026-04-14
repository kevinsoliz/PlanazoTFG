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