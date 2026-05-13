/* Rate limiting: limita cuántas peticiones puede hacer una misma IP en
   una ventana de tiempo. Defensa básica contra bots y fuerza bruta.

   Por la arquitectura del frontend (Next.js hace de proxy con rewrites),
   todas las peticiones llegan al backend con la IP del frontend, así que
   el contador es de hecho global. La defensa principal contra bots es el
   honeypot del registroSchema; este limiter actúa de cinturón de seguridad
   por si el honeypot fallase o un atacante lo descubriera. */

import { rateLimit } from "express-rate-limit";

/* Límite global del endpoint de registro. Un ataque masivo (por ejemplo
   115 cuentas en 2 minutos) lo frena; 50/h deja margen sobrado para uso
   humano normal.

   skipFailedRequests hace que el contador solo sume cuando la cuenta se
   crea (status 2xx/3xx). Los bots que disparan el honeypot reciben 400 y
   no gastan cupo, así que no pueden bloquear a usuarios reales martillando
   peticiones inválidas. */
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
