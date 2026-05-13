// Rutas de perfiles. Cada URL apunta al handler de su controller.

import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { perfilUpdateSchema } from "../schemas/perfil.schema";
import * as perfilesController from "../controllers/perfiles.controller";

const router = Router();

// GET /api/perfiles/:id: ver perfil (privado).
router.get("/perfiles/:id", requireAuth, perfilesController.obtener);

/* PATCH /api/perfiles/:id: editar perfil propio.
   El validate se ejecuta antes del handler: si el body no cumple el
   schema, nunca se llega al handler y el errorHandler responde 400. */
router.patch(
  "/perfiles/:id",
  requireAuth,
  validate(perfilUpdateSchema),
  perfilesController.actualizar,
);

export default router;
