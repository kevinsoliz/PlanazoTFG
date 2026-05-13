/* Validación con zod de los inputs de registro y login. El usuario que
   devolvemos en la respuesta no necesita schema porque lo construye el
   backend, no llega desde fuera. */

import { z } from "zod";


export const registroSchema = z.object({
  nombre: z.string().min(1).max(20),
  // .email() valida que el string tenga formato email.
  email: z.string().email().max(255),
  // 8 caracteres mínimo. Sin máximo: bcrypt admite contraseñas largas.
  password: z.string().min(8),
  /* Honeypot: campo invisible para humanos pero los bots automáticos lo
     rellenan al ver el HTML. Si llega con cualquier contenido, zod falla
     por el length(0) y lo tratamos como bot. */
  website: z.string().length(0).optional(),
});

export type RegistroInput = z.infer<typeof registroSchema>;


/* En login no exigimos min(8) en la contraseña: si un usuario antiguo
   tiene una de 6 caracteres (registrada antes de subir el límite),
   tiene que poder seguir entrando. Solo comprobamos que no esté vacía. */
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginInput = z.infer<typeof loginSchema>;
