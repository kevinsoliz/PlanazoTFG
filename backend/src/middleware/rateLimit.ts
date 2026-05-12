/*
Rate limiting: limita cuántas peticiones puede hacer una misma IP
en una ventana de tiempo. Defensa básica contra bots y fuerza bruta.

Nota: por la arquitectura proxy de Next.js (rewrites), todas las
peticiones llegan al backend con la IP del frontend, así que el
contador es de facto GLOBAL. La defensa principal contra bots es el
honeypot del registroSchema; este limiter actúa de cinturón de
seguridad por si el honeypot fallase o el atacante lo aprendiera.
*/

import { rateLimit } from "express-rate-limit";

// Límite global del endpoint de registro.
// Un ataque masivo (p. ej. 115 cuentas en 2 minutos) lo frena.
// 50/h deja sobrado margen para uso humano normal.
//
// skipFailedRequests: true -> el contador SOLO suma cuando la cuenta
// se crea (2xx/3xx). Bots que disparan el honeypot reciben 400 y NO
// gastan cupo, así que no pueden bloquear a usuarios reales martillando
// peticiones inválidas.
export const registroLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 50,
  skipFailedRequests: true,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    error: "Demasiados intentos de registro. Inténtalo de nuevo más tarde.",
  },
});
