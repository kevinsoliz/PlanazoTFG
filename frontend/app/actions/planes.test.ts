import { beforeEach, expect, test, vi } from "vitest";
import { fetchServer } from "../lib/api-server";
import { unirseAPlan } from "./planes";
import { revalidatePath } from "next/cache";

vi.mock("../lib/api-server", () => ({
    fetchServer: vi.fn()
}))

vi.mock("next/cache", () => ({
    revalidatePath: vi.fn()
}));

beforeEach(() => {
    vi.clearAllMocks();
})

test("unirse a plan -> happy path devuelve { ok: true} y revalida /home", async () => {
    
    vi.mocked(fetchServer).mockResolvedValue({
        ok: true,
        status: 200,
        data: {}
    })

    const result = await unirseAPlan(42);

    //Comprueba retorno:

    expect(result).toEqual({ ok: true});
    expect(fetchServer).toHaveBeenCalledWith("/api/planes/42/join", { method: "POST"});
    expect(revalidatePath).toHaveBeenCalledWith("/home");
})

test("unirse a plan -> error del backend devuelve { error } y no revalida", async () => {
    vi.mocked(fetchServer).mockResolvedValue({
        ok: false,
        status: 400,
        data: { error: "No puedes unirte a tu propio plan"}
    });

    const result = await unirseAPlan(42);

    expect(result).toEqual({ error: "No puedes unirte a tu propio plan"});
    expect(revalidatePath).not.toHaveBeenCalled();
})

test("unirse a plan -> error sin mensaje usa el fallback por defecto", async () => {
    vi.mocked(fetchServer).mockResolvedValue({
        ok: false,
        status: 500,
        data: {}
    })

    const result = await unirseAPlan(42);

    expect(result).toEqual({ error: "Error al unirse al plan"})
})