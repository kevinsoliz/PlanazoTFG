/*
Rate limiting: limita cuántas peticiones puede hacer una misma IP
en una ventana de tiempo. Defensa básica contra bots y fuerza bruta.
*/

import { rateLimit } from "express-rate-limit";

// Límite estricto para el endpoint de registro.
// Un usuario humano normal se registra una vez en su vida; 5 por hora
// deja margen para WiFi compartido (familia, oficina) y bloquea bots.
export const registroLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Demasiados intentos de registro. Inténtalo de nuevo más tarde.",
  },
});
