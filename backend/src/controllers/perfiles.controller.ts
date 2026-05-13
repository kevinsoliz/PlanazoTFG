/* Controller de perfiles. Capa intermedia entre la ruta y el service:
   extrae datos del request, valida autorización (¿este usuario puede tocar
   este perfil?) y delega la lógica al service. */

import { Request, Response } from "express";
import * as perfilesService from "../services/perfiles.service";
import { AppError } from "../AppError";


/* GET /api/perfiles/:id. Devuelve el perfil cuyo user_id coincide. No
   requiere login: los perfiles son públicos. */
export async function obtener(req: Request, res: Response) {
  /* params.id viene como string, lo convertimos a número. Si no es numérico
     (por ejemplo /api/perfiles/abc), Number devuelve NaN y respondemos 400
     antes de tocar la BBDD. */
  const userId = Number(req.params.id);
  if (Number.isNaN(userId)) {
    throw new AppError(400, "ID de usuario inválido");
  }

  const perfil = await perfilesService.obtener(userId);

  res.json({ perfil });
}


/* PATCH /api/perfiles/:id. Solo el propio usuario puede editar su perfil.
   La autorización vive aquí (controller) porque el service no debe saber
   nada de sesiones. La validación del body la hizo ya el middleware
   validate(perfilUpdateSchema) en la ruta. */
export async function actualizar(req: Request, res: Response) {
  const userId = Number(req.params.id);
  if (Number.isNaN(userId)) {
    throw new AppError(400, "ID de usuario inválido");
  }

  /* El id de la URL tiene que coincidir con el userId de la sesión.
     requireAuth ya garantiza que hay sesión, así que session.userId no
     es undefined aquí. */
  if (userId !== req.session.userId) {
    throw new AppError(403, "No puedes editar el perfil de otra persona");
  }

  const perfil = await perfilesService.actualizar(userId, req.body);

  res.json({ perfil });
}
