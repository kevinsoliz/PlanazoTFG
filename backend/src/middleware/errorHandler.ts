/* Middleware central de manejo de errores. Recibe todos los errores que se
   lanzan en cualquier handler y los traduce a una response HTTP. Así no
   tenemos que hacer try/catch en cada controller.

   En Express 5, si un handler async lanza, Express llama por dentro a
   next(err). Cualquier middleware con 4 argumentos (err, req, res, next)
   queda registrado como manejador de errores y se ejecuta entonces. Por
   eso esa firma es obligatoria, y se registra en index.ts después de las
   rutas (si no, no captura nada). */

import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AppError } from "../AppError";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  // El '_' indica que no usamos next, pero la firma de 4 argumentos es
  // necesaria para que Express reconozca este middleware como handler de errores.
  _next: NextFunction,
) {
  /* Errores de validación de zod: respondemos 400 con el detalle que zod
     ya nos da (err.issues es un array con un objeto por cada campo que ha
     fallado). Lo devolvemos tal cual. */
  if (err instanceof z.ZodError) {
    res.status(400).json({
      error: "Datos inválidos",
      detalles: err.issues,
    });
    return;
  }

  // Errores de negocio que lanzamos nosotros, ya vienen con su status HTTP.
  if (err instanceof AppError) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  /* Cualquier otro error es imprevisto (BBDD caída, bug, etc.). Lo
     loggeamos para poder depurar y devolvemos un 500 genérico al cliente,
     sin exponer detalles internos. */
  console.error("Error no controlado:", err);
  res.status(500).json({ error: "Error del servidor" });
}
