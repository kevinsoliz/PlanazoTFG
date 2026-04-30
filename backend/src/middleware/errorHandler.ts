/*
Middleware central de manejo de errores.
Recibe TODOS los errores que se lanzan en cualquier handler/middleware
y traduce cada uno a una response HTTP apropiada.
Esto evita repetir try/catch en cada controller.

Cómo se activa:
  - En Express 5, si un handler async lanza un error o devuelve una
    promesa rechazada, Express llama internamente a next(err).
  - Cualquier middleware con CUATRO argumentos (err, req, res, next) es
    reconocido por Express como "error-handling middleware" y se ejecuta
    cuando llega un next(err). Por eso esa firma es obligatoria.

Importante:
  - Debe registrarse en index.ts DESPUÉS de las routes, si no, no captura nada.
  - El parámetro `next` debe estar declarado aunque no lo usemos: Express
    distingue middleware normal de middleware de error por la cantidad de args.
*/

import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AppError } from "../AppError";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  // El "_" indica que no usamos next, pero la firma de 4 args es necesaria
  // para que Express reconozca este middleware como handler de errores.
  _next: NextFunction,
) {
  // 1. Errores de validación de zod -> 400 con el detalle que zod ya da.
  // err.issues es un array con un objeto por cada fallo:
  // { code, path: ["nombre"], message: "..." }. Lo devolvemos tal cual.
  if (err instanceof z.ZodError) {
    res.status(400).json({
      error: "Datos inválidos",
      detalles: err.issues,
    });
    return;
  }

  // 2. Errores de negocio que lanzamos nosotros (AppError),
  //    ya vienen con su status HTTP semántico. Los reenviamos tal cual.
  if (err instanceof AppError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  // 3. Cualquier otro error es imprevisto (BBDD caída, bug, etc.).
  //    Loggeamos para depurar y devolvemos 500 genérico al cliente,
  //    SIN exponer detalles internos.
  console.error("Error no controlado:", err);
  res.status(500).json({ error: "Error del servidor" });
}
