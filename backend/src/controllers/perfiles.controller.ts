/*
Controller de perfiles.
Capa intermedia entre la route y el service: extrae datos del request,
valida autorización (¿este usuario puede tocar este perfil?) y delega
la lógica al service. Errores propagados automáticamente al errorHandler
central por Express 5.
*/

import { Request, Response } from "express";
import * as perfilesService from "../services/perfiles.service";
import { AppError } from "../AppError";


// 1. Handler para obtener un perfil:

// GET /api/perfiles/:id
// Devuelve el perfil cuyo user_id coincide. No requiere autenticación:
// los perfiles son públicos (cualquier usuario puede ver el de otro).
export async function obtener(req: Request, res: Response) {
  // params.id viene como string -> lo convertimos a number.
  // Si no es numérico (p. ej. /api/perfiles/abc), Number devuelve NaN
  // y respondemos 400 antes de tocar la BBDD.
  const userId = Number(req.params.id);
  if (Number.isNaN(userId)) {
    throw new AppError(400, "ID de usuario inválido");
  }

  const perfil = await perfilesService.obtener(userId);

  res.json({ perfil });
}


// 2. Handler para actualizar un perfil:

// PATCH /api/perfiles/:id
// Solo el propio usuario puede editar su perfil. Esa autorización vive
// AQUÍ (controller) porque conoce req.session; el service no debe saber
// nada de sesiones.
export async function actualizar(req: Request, res: Response) {
  const userId = Number(req.params.id);
  if (Number.isNaN(userId)) {
    throw new AppError(400, "ID de usuario inválido");
  }

  // Comprobación de autorización: el id de la URL debe coincidir con
  // el userId de la sesión. requireAuth ya garantiza que hay sesión,
  // así que session.userId no es undefined aquí.
  if (userId !== req.session.userId) {
    throw new AppError(403, "No puedes editar el perfil de otra persona");
  }

  // Extraemos solo los campos editables del body. Los demás (id, user_id,
  // created_at...) no se aceptan aunque vengan: el service ignoraría lo
  // que no espera, pero ser explícito previene sorpresas.
  // Cuando entre zod, esto será un parse de PerfilUpdateSchema.
  const { nombre, username, descripcion, categorias } = req.body;

  const perfil = await perfilesService.actualizar(userId, {
    nombre,
    username,
    descripcion,
    categorias,
  });

  res.json({ perfil });
}
