/* Servicio de planes. No toca req/res (eso lo hace el controller).
   La autorización (solo el creador puede editar/borrar) sí vive aquí:
   requiere leer la BBDD para conocer el creator_id, y hacerlo en el
   controller obligaría a duplicar la query. */

import pool from "../db";
import { AppError } from "../AppError";
// Tipos derivados del schema de zod (fuente única de verdad).
import type { Plan, PlanInput } from "../schemas/plan.schema";

// Límite de planes activos (con fecha futura) que un usuario puede tener
// creados a la vez. Defensa básica contra spam.
const LIMITE_PLANES_ACTIVOS = 10;


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


export async function listar(categoria?: string): Promise<Plan[]> {
  /* La subquery (SELECT COUNT...) calcula los participantes de cada plan en
     una sola query. JOIN con users y perfiles para traer también los datos
     del creador (nombre, username, avatar_url) y pintarlos en la lista. */
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


export async function listarCreadosPor(userId: number): Promise<Plan[]> {
  const resultado = await pool.query(
    `SELECT planes.*,
        (SELECT COUNT(*) FROM plan_participants WHERE plan_participants.plan_id = planes.id) AS participants,
        (SELECT COALESCE(ROUND(AVG(puntuacion), 1), 0) FROM valoraciones WHERE plan_id = planes.id) AS nota_media,
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


export async function listarApuntadosDe(userId: number): Promise<Plan[]> {
  const resultado = await pool.query(
    `SELECT planes.*,
        (SELECT COUNT(*) FROM plan_participants WHERE plan_participants.plan_id = planes.id) AS participants,
        (SELECT COALESCE(ROUND(AVG(puntuacion), 1), 0) FROM valoraciones WHERE plan_id = planes.id) AS nota_media,
        (SELECT puntuacion FROM valoraciones WHERE plan_id = planes.id AND usuario_id = $1) AS mi_voto,
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

export async function obtenerDetalle(planId: number, userId?: number): Promise<PlanDetalle> {
  const plan = await pool.query(
    `SELECT planes.*,
        (SELECT COUNT(*) FROM plan_participants WHERE plan_participants.plan_id = planes.id) AS participants,
        (SELECT COALESCE(ROUND(AVG(puntuacion), 1), 0) FROM valoraciones WHERE plan_id = planes.id) AS nota_media,
        (SELECT puntuacion FROM valoraciones WHERE plan_id = planes.id AND usuario_id = $2) AS mi_voto,
        users.nombre AS creador_nombre,
        perfiles.username AS creador_username,
        perfiles.avatar_url AS creador_avatar_url,
        perfiles.descripcion AS creador_descripcion
        FROM planes
        JOIN users ON planes.creator_id = users.id
        JOIN perfiles ON perfiles.user_id = users.id
        WHERE planes.id = $1`,
    [planId, userId ?? null],
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

  /* Si el usuario ya está apuntado, postgres devuelve el código 23505
     (unique_violation) por la PK compuesta (plan_id, user_id). Comprobamos
     el código antes de tratarlo como duplicado, para no convertir otros
     errores en "ya apuntado". */
  try {
    await pool.query(
      "INSERT INTO plan_participants (plan_id, user_id) VALUES ($1, $2)",
      [planId, userId],
    );
  } catch (err: unknown) {
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

  /* Borramos primero las participaciones (FK) y luego el plan. Si la BBDD
     tuviera ON DELETE CASCADE definido, esto sería una sola sentencia.
     Lo dejamos explícito por claridad. */
  await pool.query("DELETE FROM plan_participants WHERE plan_id = $1", [
    planId,
  ]);
  await pool.query("DELETE FROM planes WHERE id = $1", [planId]);
}


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


// Usado para autorizar acciones del plan (chat, valoración, etc.).
export async function esParticipanteEnPlan(planId: number, userId: number): Promise<boolean> {
  const resultado = await pool.query(
    "SELECT 1 FROM plan_participants WHERE plan_id = $1 AND user_id = $2",
    [planId, userId],
  );
  return (resultado.rowCount ?? 0) > 0;
}


// Solo los participantes pueden valorar (el creador no).
export async function valorar(
  planId: number,
  userId: number,
  puntuacion: number,
): Promise<void> {
  const plan = await pool.query(
    "SELECT creator_id FROM planes WHERE id = $1",
    [planId],
  );

  if (plan.rows.length === 0) {
    throw new AppError(404, "Plan no encontrado");
  }

  if (plan.rows[0].creator_id === userId) {
    throw new AppError(403, "No puedes valorar tu propio plan");
  }

  const participacion = await pool.query(
    "SELECT 1 FROM plan_participants WHERE plan_id = $1 AND user_id = $2",
    [planId, userId],
  );

  if (participacion.rows.length === 0) {
    throw new AppError(403, "Solo los participantes pueden valorar este plan");
  }

  /* ON CONFLICT DO UPDATE: si ya existe una valoración de este usuario para
     este plan (lo garantiza el UNIQUE en plan_id + usuario_id), la sobreescribe
     en lugar de fallar. */
  await pool.query(
    `INSERT INTO valoraciones (plan_id, usuario_id, puntuacion)
        VALUES ($1, $2, $3)
        ON CONFLICT (plan_id, usuario_id)
        DO UPDATE SET puntuacion = EXCLUDED.puntuacion`,
    [planId, userId, puntuacion],
  );
}
