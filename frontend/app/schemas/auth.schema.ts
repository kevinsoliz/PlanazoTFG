/* Schema de auth en el frontend. Duplicado intencional del de
   backend/src/schemas/auth.schema.ts. Si cambian las reglas hay que
   tocar los dos ficheros. Solo necesitamos el de registro por ahora. */

import { z } from "zod";

export const registroSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(20, "Máximo 20 caracteres"),
  email: z.string().email("Email inválido").max(255),
  password: z.string().min(8, "Mínimo 8 caracteres"),
  /* Honeypot: campo invisible en el form (lo rellenan los bots, no los
     humanos). Si llega con texto, zod corta aquí silenciosamente. No hace
     falta mensaje porque ningún humano lo va a disparar. */
  website: z.string().length(0).optional(),
});

export type RegistroInput = z.infer<typeof registroSchema>;
