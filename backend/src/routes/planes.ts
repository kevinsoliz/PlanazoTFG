/*
Routes de planes.
Wiring puro: cada URL/método HTTP -> handler del controller.

IMPORTANTE: el orden importa. Las rutas específicas (/creados, /apuntado)
DEBEN ir antes de la dinámica /:id. Si /:id fuera primero, Express
matchearía /creados como /:id con id="creados" y nunca llegaría al handler
correcto.
*/

import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { planInputSchema } from "../schemas/plan.schema";
import * as planesController from "../controllers/planes.controller";

const router = Router();

// POST /api/planes -> crear plan
// Cadena: requireAuth -> validate -> handler.
router.post("/", requireAuth, validate(planInputSchema), planesController.crear);

// GET /api/planes -> listar planes (público, opcional ?categoria=...)
router.get("/", planesController.listar);

// GET /api/planes/creados -> planes creados por el usuario logado
router.get("/creados", requireAuth, planesController.listarCreados);

// GET /api/planes/apuntado -> planes a los que el usuario está apuntado (sin contar los suyos)
router.get("/apuntado", requireAuth, planesController.listarApuntado);

// GET /api/planes/usuario/:id -> planes creados por un usuario concreto
router.get("/usuario/:id", requireAuth, planesController.listarCreadosPorUsuario);

// GET /api/planes/:id -> detalle de un plan (privado)
router.get("/:id", requireAuth, planesController.obtenerDetalle);

// POST /api/planes/:id/join -> unirse a un plan
router.post("/:id/join", requireAuth, planesController.unirse);

// DELETE /api/planes/:id/join -> salir de un plan
router.delete("/:id/join", requireAuth, planesController.salir);

// DELETE /api/planes/:id -> borrar plan (solo creador)
router.delete("/:id", requireAuth, planesController.borrar);

// PUT /api/planes/:id -> actualizar plan (solo creador)
router.put(
  "/:id",
  requireAuth,
  validate(planInputSchema),
  planesController.actualizar,
);

export default router;

// valorar plan
router.post("/:id/rate", requireAuth, async (req, res) => {
  const planId = req.params.id;
  const { puntuacion } = req.body;
  const userId = req.session.userId;

  if (!puntuacion || puntuacion < 0.5 || puntuacion > 5 || puntuacion % 0.5 !== 0) {
    res.status(400).json({ error: "La puntuación debe ser entre 0.5 y 5, en incrementos de 0.5." });
    return;
  }

  try {
    const planResult = await pool.query(
      "SELECT fecha FROM planes WHERE id = $1", 
      [planId]
    );
    
    if (planResult.rows.length === 0) {
      res.status(404).json({ error: "Plan no encontrado" });
      return;
    }

    const fechaPlan = new Date(planResult.rows[0].fecha);
    const ahora = new Date();

    if (fechaPlan > ahora) {
      res.status(400).json({ error: "No puedes valorar un plan que aún no ha terminado." });
      return;
    }

    const participantResult = await pool.query(
      "SELECT 1 FROM plan_participants WHERE plan_id = $1 AND user_id = $2",
      [planId, userId]
    );

    if (participantResult.rows.length === 0) {
      res.status(403).json({ error: "Solo los participantes pueden valorar el plan." });
      return;
    }

    await pool.query(
      `INSERT INTO valoraciones (plan_id, usuario_id, puntuacion) 
       VALUES ($1, $2, $3)
       ON CONFLICT (plan_id, usuario_id) 
       DO UPDATE SET puntuacion = EXCLUDED.puntuacion`,
      [planId, userId, puntuacion]
    );

    res.status(201).json({ message: "Valoración registrada con éxito." });
    
  } catch (error: any) {
    console.log("Error en /:id/rate: ", error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

// listar detalle del plan
router.get("/:id", async (req, res) => {
  try {
    const plan = await pool.query(
      `SELECT p.*, u.nombre AS creador_nombre, 
        COALESCE(ROUND(AVG(v.puntuacion), 1), 0) AS nota_media,
        COUNT(v.id) AS total_valoraciones
       FROM planes p 
       JOIN users u ON p.creator_id = u.id 
       LEFT JOIN valoraciones v ON p.id = v.plan_id
       WHERE p.id = $1
       GROUP BY p.id, u.nombre`,
      [req.params.id],
    )} catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error del servidor " });
  }
  });
