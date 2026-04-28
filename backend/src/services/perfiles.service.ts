/*
Service de perfiles.
Lógica de negocio relacionada con la tabla `perfiles`: lectura y
actualización. NO sabe de Express (no toca req/res/session).
La autorización ("solo puedo editar mi propio perfil") la hace el
controller antes de llamar aquí — el service confía en que quien
le invoca tiene permiso.
*/

import pool from "../db";
import { AppError } from "../AppError";
// Tipos derivados de los schemas de zod -> fuente única de verdad.
// Si el schema cambia, estos tipos cambian solos.
import type { Perfil, PerfilUpdate } from "../schemas/perfil.schema";


// 1. Servicio para obtener un perfil:

// Busca el perfil cuyo user_id coincide.
// Lanza AppError(404) si no existe.
export async function obtener(userId: number): Promise<Perfil> {
  const resultado = await pool.query(
    "SELECT * FROM perfiles WHERE user_id = $1",
    [userId],
  );

  if (resultado.rows.length === 0) {
    throw new AppError(404, "Perfil no encontrado");
  }

  return resultado.rows[0];
}


// 2. Servicio para actualizar un perfil:

// Actualiza los campos enviados y mantiene los demás.
// COALESCE($n, columna) -> si el parámetro es NULL/undefined, usa el valor
// actual de la columna. Así soportamos PATCH parcial sin escribir varios
// UPDATEs distintos según qué campos vengan.
// RETURNING * devuelve la fila actualizada, evitando un SELECT extra.
// Lanza AppError(404) si el perfil no existe.
export async function actualizar(
  userId: number,
  datos: PerfilUpdate,
): Promise<Perfil> {
  const resultado = await pool.query(
    `UPDATE perfiles
        SET nombre = COALESCE($1, nombre),
            username = COALESCE($2, username),
            descripcion = COALESCE($3, descripcion),
            categorias = COALESCE($4, categorias)
        WHERE user_id = $5
        RETURNING *`,
    [
      datos.nombre,
      datos.username,
      datos.descripcion,
      datos.categorias,
      userId,
    ],
  );

  if (resultado.rows.length === 0) {
    throw new AppError(404, "Perfil no encontrado");
  }

  return resultado.rows[0];
}
