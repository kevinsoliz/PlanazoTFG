/*
Routes de autenticación.
Esta capa es WIRING puro: une cada URL/método HTTP con el handler del
controller correspondiente y aplica los middlewares pertinentes.
NO hay lógica aquí.
*/

import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { registroLimiter } from "../middleware/rateLimit";
import { registroSchema, loginSchema } from "../schemas/auth.schema";
import * as authController from "../controllers/auth.controller";

const router = Router();

// POST /api/auth/registro -> crear cuenta y abrir sesión
// Cadena: rateLimit -> validate -> handler. El limiter rechaza al bot
// antes de gastar CPU validando el body o tocando la base de datos.
router.post(
  "/registro",
  registroLimiter,
  validate(registroSchema),
  authController.registrar
);

// POST /api/auth/login -> abrir sesión
router.post("/login", validate(loginSchema), authController.login);

// POST /api/auth/logout -> cerrar sesión (requiere estar autenticado)
router.post("/logout", requireAuth, authController.logout);

// GET /api/auth/me -> usuario de la sesión actual (requiere estar autenticado)
router.get("/me", requireAuth, authController.me);

export default router;
