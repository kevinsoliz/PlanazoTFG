/* Servicio de perfiles. Lógica para leer y actualizar la tabla 'perfiles'.
   No toca req/res (eso lo hace el controller). La autorización
   (solo puedes editar tu propio perfil) la hace también el controller. */

import pool from "../db";
import { AppError } from "../AppError";
// Tipos derivados de los schemas de zod (fuente única de verdad).
import type { Perfil, PerfilUpdate } from "../schemas/perfil.schema";


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


export async function actualizar(
  userId: number,
  datos: PerfilUpdate,
): Promise<Perfil> {
  /* COALESCE($n, columna): si el parámetro viene null/undefined, usa el
     valor actual de la columna. Así podemos hacer un PATCH parcial sin
     escribir un UPDATE distinto según qué campos lleguen. */
  const resultado = await pool.query(
    `UPDATE perfiles
        SET nombre = COALESCE($1, nombre),
            username = COALESCE($2, username),
            avatar_url = COALESCE($3, avatar_url),
            descripcion = COALESCE($4, descripcion),
            categorias = COALESCE($5, categorias)
        WHERE user_id = $6
        RETURNING *`,
    [
      datos.nombre,
      datos.username,
      datos.avatar_url,
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
