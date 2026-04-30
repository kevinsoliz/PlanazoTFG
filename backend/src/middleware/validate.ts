/*
Middleware genérico de validación con zod.
Se monta en cualquier route como: router.post("/", validate(miSchema), handler).
Si el body no cumple el schema, lanza ZodError -> el errorHandler lo
traduce a 400 con detalles. Si cumple, REEMPLAZA req.body por la versión
parseada (con campos extra eliminados y tipos coherentes).

Por qué reemplazar req.body:
  - El body parseado es más seguro: no tiene campos no declarados.
  - El controller puede leerlo asumiendo que cumple el schema, sin más
    chequeos. Si en el futuro le metemos `coerce` o transformaciones, el
    controller las recibe ya aplicadas.
*/

import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export function validate(schema: ZodType) {
  return (req: Request, _res: Response, next: NextFunction) => {
    // .parse lanza ZodError si falla. Express 5 + nuestro errorHandler
    // se encargan: el throw se convierte en next(err) automáticamente.
    req.body = schema.parse(req.body);
    next();
  };
}
