/*
Controller de autenticación.
Es la capa intermedia entre la route (Express) y el service (lógica).
Aquí SÍ se conoce req/res: extraemos datos del request, llamamos al
service y devolvemos la response. NO se manejan errores aquí — los
errores que se lancen los captura el errorHandler central (Express 5
propaga las promesas rechazadas automáticamente).
Mantener esta capa fina: nada de queries SQL ni reglas de negocio aquí,
eso vive en el service.
*/

import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";
import { AppError } from "../AppError";


// 1. Handler de registro:

// POST /api/auth/registro
// Crea un usuario nuevo y abre sesión inmediatamente (auto-login tras registro).
export async function registrar(req: Request, res: Response) {
  // Extraemos los campos del body. Cuando entre zod, esta extracción +
  // la validación provisional se reemplazará por un parse del schema.
  const { nombre, email, password } = req.body;

  // Validación mínima provisional (zod la reemplazará).
  // Lanzamos AppError(400) -> el errorHandler central lo traduce a 400.
  if (!nombre || !email || !password) {
    throw new AppError(400, "Faltan campos obligatorios");
  }

  // Delegamos toda la lógica al service. Si el service lanza AppError
  // (email duplicado, etc.), Express 5 propaga la rejection al errorHandler
  // automáticamente — no hace falta try/catch aquí.
  const user = await authService.registrar(nombre, email, password);

  // Abrimos sesión guardando el id del usuario en la cookie de sesión.
  // Esto SÍ vive en el controller porque req.session es de Express.
  req.session.userId = user.id;

  res.status(201).json({ user });
}


// 2. Handler de login:

// POST /api/auth/login
// Comprueba credenciales y abre sesión. Responde con el user.
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(400, "Faltan campos obligatorios");
  }

  const user = await authService.login(email, password);

  // Sesión iniciada -> guardamos userId en la cookie de sesión.
  req.session.userId = user.id;

  res.json({ user });
}


// 3. Handler de logout:

// POST /api/auth/logout
// Destruye la sesión y borra la cookie. NO usa service porque no hay lógica
// de negocio: es 100% Express.
// req.session.destroy es callback-based (no devuelve Promise), así que
// Express 5 NO captura sus errores automáticamente. Por eso este handler
// SÍ recibe `next` y lo usa para pasar el error al errorHandler.
export function logout(req: Request, res: Response, next: NextFunction) {
  req.session.destroy((err) => {
    // Si destroy falla, lo enviamos al errorHandler central via next(err).
    if (err) return next(err);

    // session_id es el nombre de la cookie configurado en index.ts cuando
    // se inicializa express-session.
    res.clearCookie("session_id");
    res.json({ message: "Sesión cerrada" });
  });
}


// 4. Handler de "quién soy":

// GET /api/auth/me
// Devuelve el usuario de la sesión actual. La ruta lleva el middleware
// requireAuth, así que cuando entramos aquí req.session.userId está garantizado:
// no hace falta revalidarlo.
export async function me(req: Request, res: Response) {
  // El "!" le dice a TS "confío en que userId existe aquí" — es seguro porque
  // requireAuth corta antes si no hay sesión.
  const user = await authService.obtenerUsuario(req.session.userId!);

  res.json({ user });
}
