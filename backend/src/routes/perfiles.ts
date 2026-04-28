/*
Routes de perfiles.
Wiring puro: cada URL/método HTTP -> handler del controller.
Sin lógica aquí.
*/

import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import * as perfilesController from "../controllers/perfiles.controller";

const router = Router();

// GET /api/perfiles/:id -> ver perfil (público, no requiere auth)
router.get("/perfiles/:id", perfilesController.obtener);

// PATCH /api/perfiles/:id -> editar perfil propio (requiere auth + autorización)
router.patch("/perfiles/:id", requireAuth, perfilesController.actualizar);

export default router;
