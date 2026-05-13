/* Middleware genérico de validación con zod. Se monta en cualquier ruta
   como: router.post("/", validate(miSchema), handler). Si el body no cumple
   el schema, lanza ZodError y el errorHandler lo traduce a 400 con detalles.
   Si cumple, reemplaza req.body por la versión parseada (con campos extra
   eliminados), así el controller puede leerlo asumiendo que es correcto. */

import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export function validate(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body);
    next();
  };
}
