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
