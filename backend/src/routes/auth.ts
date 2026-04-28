/*
Routes de autenticación.
Esta capa es WIRING puro: une cada URL/método HTTP con el handler del
controller correspondiente y aplica los middlewares pertinentes.
NO hay lógica aquí. Si tienes que escribir un if dentro de esta capa,
probablemente no debería estar aquí.
*/

import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import * as authController from "../controllers/auth.controller";

const router = Router();

// POST /api/auth/registro -> crear cuenta y abrir sesión
router.post("/registro", authController.registrar);

// POST /api/auth/login -> abrir sesión
router.post("/login", authController.login);

// POST /api/auth/logout -> cerrar sesión (requiere estar autenticado)
router.post("/logout", requireAuth, authController.logout);

// GET /api/auth/me -> usuario de la sesión actual (requiere estar autenticado)
router.get("/me", requireAuth, authController.me);

export default router;
