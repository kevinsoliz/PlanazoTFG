/*
Service de planes.
Lógica de negocio relacionada con la tabla `planes` y `plan_participants`:
crear, listar, ver detalle, unirse, salir, editar, borrar.
NO sabe de Express. La autorización ("solo el creador puede editar/borrar")
SÍ vive aquí: requiere leer la BBDD para conocer el creator_id, y hacerlo
en el controller obligaría a duplicar la query.
*/

import pool from "../db";
import { AppError } from "../AppError";
// Tipos derivados del schema de zod -> fuente única de verdad.
import type { Plan, PlanInput } from "../schemas/plan.schema";

// Límite de planes activos (con fecha futura) que un usuario puede tener
// creados a la vez. Defensa básica contra spam.
const LIMITE_PLANES_ACTIVOS = 10;


// 1. Servicio para crear un plan:

// Inserta el plan y añade automáticamente al creador como participante.
// Antes comprueba que no supera el límite de planes activos.
export async function crear(
  creatorId: number,
  datos: PlanInput,
): Promise<Plan> {
  // Cuenta cuántos planes con fecha futura tiene este usuario.
  const planesActivos = await pool.query(
    "SELECT COUNT(*) FROM planes WHERE creator_id = $1 AND fecha > NOW()",
    [creatorId],
  );

  if (parseInt(planesActivos.rows[0].count) >= LIMITE_PLANES_ACTIVOS) {
    throw new AppError(
      400,
      `Has alcanzado el límite de ${LIMITE_PLANES_ACTIVOS} planes activos`,
    );
  }

  const nuevo = await pool.query(
    `INSERT INTO planes (creator_id, titulo, categoria, descripcion, fecha, ubicacion, aforo_max)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
    [
      creatorId,
      datos.titulo,
      datos.categoria,
      datos.descripcion,
      datos.fecha,
      datos.ubicacion,
      datos.aforo_max,
    ],
  );

  // El creador entra automáticamente como participante de su propio plan.
  await pool.query(
    "INSERT INTO plan_participants (plan_id, user_id) VALUES ($1, $2)",
    [nuevo.rows[0].id, creatorId],
  );

  return nuevo.rows[0];
}


// 2. Servicio para listar planes (futuros, opcionalmente filtrados por categoría):

// Solo planes con fecha futura. Incluye `participants` (count) calculado en SQL
// y los datos del creador (nombre, username, avatar_url) traídos por JOIN —
// así el frontend pinta avatar + @username sin pedirlo aparte por cada plan.
export async function listar(categoria?: string): Promise<Plan[]> {
  // SUBQUERY (SELECT COUNT...) calcula los participantes de cada plan en
  // una sola query. JOIN con users + perfiles para los datos del creador.
  const baseSelect = `SELECT planes.*,
        (SELECT COUNT(*) FROM plan_participants WHERE plan_participants.plan_id = planes.id) AS participants,
        users.nombre AS creador_nombre,
        perfiles.username AS creador_username,
        perfiles.avatar_url AS creador_avatar_url
        FROM planes
        JOIN users ON planes.creator_id = users.id
        JOIN perfiles ON perfiles.user_id = users.id
        WHERE planes.fecha > NOW()`;

  if (categoria) {
    const resultado = await pool.query(
      `${baseSelect} AND planes.categoria = $1 ORDER BY planes.fecha ASC`,
      [categoria],
    );
    return resultado.rows;
  }

  const resultado = await pool.query(
    `${baseSelect} ORDER BY planes.fecha ASC`,
  );
  return resultado.rows;
}


// 3. Servicio para listar planes creados por un usuario:

export async function listarCreadosPor(userId: number): Promise<Plan[]> {
  const resultado = await pool.query(
    `SELECT planes.*,
        (SELECT COUNT(*) FROM plan_participants WHERE plan_participants.plan_id = planes.id) AS participants,
        users.nombre AS creador_nombre,
        perfiles.username AS creador_username,
        perfiles.avatar_url AS creador_avatar_url
        FROM planes
        JOIN users ON planes.creator_id = users.id
        JOIN perfiles ON perfiles.user_id = users.id
        WHERE planes.creator_id = $1
        ORDER BY planes.fecha ASC`,
    [userId],
  );
  return resultado.rows;
}


// 4. Servicio para listar planes a los que el usuario se ha apuntado (sin contar los suyos):

export async function listarApuntadosDe(userId: number): Promise<Plan[]> {
  const resultado = await pool.query(
    `SELECT planes.*,
        (SELECT COUNT(*) FROM plan_participants WHERE plan_participants.plan_id = planes.id) AS participants,
        users.nombre AS creador_nombre,
        perfiles.username AS creador_username,
        perfiles.avatar_url AS creador_avatar_url
        FROM planes
        JOIN plan_participants ON plan_participants.plan_id = planes.id
        JOIN users ON planes.creator_id = users.id
        JOIN perfiles ON perfiles.user_id = users.id
        WHERE plan_participants.user_id = $1
        AND planes.creator_id != $1
        ORDER BY planes.fecha ASC`,
    [userId],
  );
  return resultado.rows;
}


// 5. Servicio para obtener el detalle de un plan:

// Devuelve plan completo (con datos del creador) + participantes + plazas.
type PlanDetalle = {
  plan: Plan;
  participantes: {
    id: number;
    nombre: string;
    username: string;
    avatar_url: string | null;
  }[];
  plazas_disponibles: number;
};

export async function obtenerDetalle(planId: number): Promise<PlanDetalle> {
  const plan = await pool.query(
    `SELECT planes.*,
        (SELECT COUNT(*) FROM plan_participants WHERE plan_participants.plan_id = planes.id) AS participants,
        users.nombre AS creador_nombre,
        perfiles.username AS creador_username,
        perfiles.avatar_url AS creador_avatar_url,
        perfiles.descripcion AS creador_descripcion
        FROM planes
        JOIN users ON planes.creator_id = users.id
        JOIN perfiles ON perfiles.user_id = users.id
        WHERE planes.id = $1`,
    [planId],
  );

  if (plan.rows.length === 0) {
    throw new AppError(404, "Plan no encontrado");
  }

  const participantes = await pool.query(
    `SELECT users.id, users.nombre, perfiles.username, perfiles.avatar_url
        FROM plan_participants
        JOIN users ON plan_participants.user_id = users.id
        JOIN perfiles ON perfiles.user_id = users.id
        WHERE plan_participants.plan_id = $1`,
    [planId],
  );

  const plazas_disponibles =
    plan.rows[0].aforo_max - participantes.rows.length;

  return {
    plan: plan.rows[0],
    participantes: participantes.rows,
    plazas_disponibles,
  };
}


// 6. Servicio para unirse a un plan:

export async function unirse(planId: number, userId: number): Promise<void> {
  const plan = await pool.query("SELECT * FROM planes WHERE id = $1", [planId]);

  if (plan.rows.length === 0) {
    throw new AppError(404, "Plan no encontrado");
  }

  if (plan.rows[0].creator_id === userId) {
    throw new AppError(400, "No puedes unirte a tu propio plan");
  }

  // Comprobamos aforo.
  const participantes = await pool.query(
    "SELECT COUNT(*) FROM plan_participants WHERE plan_id = $1",
    [planId],
  );

  if (parseInt(participantes.rows[0].count) >= plan.rows[0].aforo_max) {
    throw new AppError(400, "El plan está completo");
  }

  // Intentamos insertar. Si ya está apuntado, postgres devuelve el código
  // 23505 (unique_violation) por la PK compuesta (plan_id, user_id).
  try {
    await pool.query(
      "INSERT INTO plan_participants (plan_id, user_id) VALUES ($1, $2)",
      [planId, userId],
    );
  } catch (err: unknown) {
    // err en pg es un objeto con `code`. Comprobamos el código antes de
    // asumir el tipo, para no propagar errores genéricos como "ya apuntado".
    if (
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code: string }).code === "23505"
    ) {
      throw new AppError(400, "Ya estás apuntado a este plan");
    }
    throw err;
  }
}


// 7. Servicio para salir de un plan (anular apuntamiento):

export async function salir(planId: number, userId: number): Promise<void> {
  const plan = await pool.query(
    "SELECT creator_id FROM planes WHERE id = $1",
    [planId],
  );

  if (plan.rows.length === 0) {
    throw new AppError(404, "Plan no encontrado");
  }

  if (plan.rows[0].creator_id === userId) {
    throw new AppError(400, "No puedes salir de tu propio plan");
  }

  const resultado = await pool.query(
    "DELETE FROM plan_participants WHERE plan_id = $1 AND user_id = $2",
    [planId, userId],
  );

  if (resultado.rowCount === 0) {
    throw new AppError(400, "No estabas en este plan");
  }
}


// 8. Servicio para borrar un plan (solo el creador):

export async function borrar(planId: number, userId: number): Promise<void> {
  const plan = await pool.query(
    "SELECT creator_id FROM planes WHERE id = $1",
    [planId],
  );

  if (plan.rows.length === 0) {
    throw new AppError(404, "Plan no encontrado");
  }

  if (plan.rows[0].creator_id !== userId) {
    throw new AppError(403, "Solo el creador puede borrar el plan");
  }

  // Borramos primero las participaciones (FK) y luego el plan.
  // Si la BBDD tuviera ON DELETE CASCADE definido, esto sería una sola
  // sentencia. Lo dejamos explícito por claridad.
  await pool.query("DELETE FROM plan_participants WHERE plan_id = $1", [
    planId,
  ]);
  await pool.query("DELETE FROM planes WHERE id = $1", [planId]);
}


// 9. Servicio para actualizar un plan (solo el creador):

export async function actualizar(
  planId: number,
  userId: number,
  datos: PlanInput,
): Promise<Plan> {
  const plan = await pool.query(
    "SELECT creator_id FROM planes WHERE id = $1",
    [planId],
  );

  if (plan.rows.length === 0) {
    throw new AppError(404, "Plan no encontrado");
  }

  if (plan.rows[0].creator_id !== userId) {
    throw new AppError(403, "Solo el creador puede editar el plan");
  }

  const resultado = await pool.query(
    `UPDATE planes
        SET titulo = $1,
            categoria = $2,
            descripcion = $3,
            fecha = $4,
            ubicacion = $5,
            aforo_max = $6
        WHERE id = $7
        RETURNING *`,
    [
      datos.titulo,
      datos.categoria,
      datos.descripcion,
      datos.fecha,
      datos.ubicacion,
      datos.aforo_max,
      planId,
    ],
  );

  return resultado.rows[0];
}
