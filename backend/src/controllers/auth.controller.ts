/* Controller de autenticación. Capa intermedia entre la ruta y el service.
   Aquí sí conocemos req/res: extraemos datos del request, llamamos al service
   y devolvemos la response. No manejamos errores: si algo lanza, lo recoge
   el errorHandler central (Express 5 propaga las promesas rechazadas). */

import { Request, Response, NextFunction } from "express";
import * as authService from "../services/auth.service";


/* POST /api/auth/registro. Crea un usuario y abre sesión a la vez
   (auto-login tras registro). La validación del body la hizo ya el
   middleware validate(registroSchema) en la ruta. */
export async function registrar(req: Request, res: Response) {
  const { nombre, email, password } = req.body;

  const user = await authService.registrar(nombre, email, password);

  // Abrimos sesión guardando el id del usuario en la cookie de sesión.
  req.session.userId = user.id;

  res.status(201).json({ user });
}


/* POST /api/auth/login. Comprueba credenciales y abre sesión. El body
   ya viene validado por validate(loginSchema) en la ruta. */
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await authService.login(email, password);

  req.session.userId = user.id;

  res.json({ user });
}


/* POST /api/auth/logout. Destruye la sesión y borra la cookie. No usa
   service porque no hay lógica de negocio.

   req.session.destroy() funciona con callback (no devuelve promesa), así
   que Express 5 no captura sus errores automáticamente. Por eso este
   handler sí recibe 'next' y lo usa para pasar el error al errorHandler. */
export function logout(req: Request, res: Response, next: NextFunction) {
  req.session.destroy((err) => {
    if (err) return next(err);

    // session_id es el nombre de la cookie que pusimos en index.ts.
    res.clearCookie("session_id");
    res.json({ message: "Sesión cerrada" });
  });
}


/* GET /api/auth/me. Devuelve el usuario de la sesión actual. La ruta lleva
   el middleware requireAuth, así que aquí req.session.userId está garantizado;
   por eso usamos el '!' para decirle a TypeScript que confíe en que existe. */
export async function me(req: Request, res: Response) {
  const user = await authService.obtenerUsuario(req.session.userId!);

  res.json({ user });
}
