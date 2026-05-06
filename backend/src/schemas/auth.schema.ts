/*
Schemas de auth con zod.
Validamos los inputs de registro y login. La forma del AuthUser que
DEVOLVEMOS al cliente NO necesita schema porque es algo que construimos
nosotros (no entra desde fuera) — su tipo TS sigue declarado a mano en
el service.
*/

import { z } from "zod";


// 1. Schema para POST /api/auth/registro

export const registroSchema = z.object({
  nombre: z.string().min(1).max(20),
  // z.string().email() valida que el string tenga formato email.
  email: z.string().email().max(255),
  // 8 chars mínimo es el estándar OWASP. Sin máximo: bcrypt admite
  // passwords largos sin problema.
  password: z.string().min(8),
  // Honeypot: campo invisible para humanos pero los bots automáticos lo
  // rellenan al ver el HTML. Si llega con cualquier contenido lo
  // tratamos como bot y zod falla (length(0)).
  website: z.string().length(0).optional(),
});

export type RegistroInput = z.infer<typeof registroSchema>;


// 2. Schema para POST /api/auth/login

// Para login NO ponemos min(8) en password: si un usuario antiguo tiene
// una password de 6 chars (registrada antes de subir el límite), tiene
// que poder seguir entrando. Solo comprobamos que sea string no vacío.
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginInput = z.infer<typeof loginSchema>;
