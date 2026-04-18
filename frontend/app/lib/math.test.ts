import {test, expect, vi} from "vitest";
import {divideMod, runTwice, suma, sumaAsync} from "./math";

// test("sum devuelve la suma de dos numeros", () => {
//     expect(suma(2, 3)).toBe(5);
// })

// test("suma gestiona negativos", () => {
//     expect(suma(-4, 1)).toBe(-3);
// })

// test("suma asincrona de dos numbers", async () => {
//     const resultado = await sumaAsync(10, 5);
//     expect(resultado).toBe(15);
// })

// // test("suma mal intencinal", () => {
// //     expect(sumaAsync(1, 3)).toBe(3);
// // })

// // test("divideMod intencional con toBe", () => {
// //     expect(divideMod(17, 5)).toBe({ quotient: 3, remainder: 2});
// // })

// test("divideMod con toEqual", () => {
//     expect(divideMod(17, 5)).toEqual({ quotient: 3, remainder: 2});
// })

test("runTwice llama al callback con 1 y con 10", () => {
    const tracer = vi.fn((n:number) => n * 2);

    const result = runTwice(tracer);

    expect(result).toBe(22);
    expect(tracer).toHaveBeenCalledTimes(2);
    expect(tracer).toHaveBeenCalledWith(1);
    expect(tracer).toHaveBeenCalledWith(10);
})

// test("exploramos vi.fn", () => {
//     const tracer = vi.fn((n: number) => n * 2);

//     const result = runTwice(tracer);

//     console.log("result:", result);
//     console.log("veces llamada:", tracer.mock.calls.length);
//     console.log("calls:", tracer.mock.calls[0][0]);
//     console.log("results:", tracer.mock.results);
// })