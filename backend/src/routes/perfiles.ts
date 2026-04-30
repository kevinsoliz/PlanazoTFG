/*
Routes de perfiles.
Wiring puro: cada URL/método HTTP -> handler del controller.
Sin lógica aquí.
*/

import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { perfilUpdateSchema } from "../schemas/perfil.schema";
import * as perfilesController from "../controllers/perfiles.controller";

const router = Router();

// GET /api/perfiles/:id -> ver perfil (público, no requiere auth)
router.get("/perfiles/:id", perfilesController.obtener);

// PATCH /api/perfiles/:id -> editar perfil propio
// Cadena: requireAuth -> validate(schema) -> handler.
// El middleware validate se ejecuta antes del handler: si el body no
// cumple el schema, nunca se llama al handler — el errorHandler responde 400.
router.patch(
  "/perfiles/:id",
  requireAuth,
  validate(perfilUpdateSchema),
  perfilesController.actualizar,
);

export default router;
