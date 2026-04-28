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
  - Debe registrarse en app.ts DESPUÉS de las routes, si no, no captura nada.
  - El parámetro `next` debe estar declarado aunque no lo usemos: Express
    distingue middleware normal de middleware de error por la cantidad de args.
*/

import { Request, Response, NextFunction } from "express";
import { AppError } from "../AppError";

export function errorHandler(
  err: unknown, // unknown es más seguro que any: nos obliga a comprobar el tipo
  req: Request,
  res: Response,
  // El "_" indica que no usamos next, pero la firma de 4 args es necesaria
  // para que Express reconozca este middleware como handler de errores.
  _next: NextFunction,
) {
  // 1. Si es un error de negocio que lanzamos nosotros (AppError),
  //    ya viene con su status HTTP semántico. Lo reenviamos tal cual.
  if (err instanceof AppError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  // 2. Cualquier otro error es imprevisto (BBDD caída, bug, etc.).
  //    Loggeamos para depurar y devolvemos 500 genérico al cliente,
  //    SIN exponer detalles internos (filtrar stack traces es un riesgo
  //    de seguridad: revela rutas, queries, librerías, etc.).
  console.error("Error no controlado:", err);
  res.status(500).json({ error: "Error del servidor" });
}
