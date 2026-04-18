import { expect, test, vi } from "vitest";
import { greet } from "./greeter";
import { log } from "./logger";

vi.mock("./logger", () => ({
    log: vi.fn()
}))

test("greet usa log con el mensaje correcto y devuelve el saludo", () => {
    const result = greet("Pepe");

    expect(result).toBe("Hola Pepe");
    expect(log).toHaveBeenCalledWith("greeting Pepe")
    expect(log).toHaveBeenCalledTimes(1)
})