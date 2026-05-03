/*
Schema de auth en el frontend.
Es un duplicado intencional del de backend/src/schemas/auth.schema.ts.
Decidimos no extraer un paquete shared/ para mantener el monorepo simple.
Si cambian las reglas, hay que actualizar AMBOS ficheros.

Aquí solo necesitamos el schema de registro: el de login lo añadiremos
cuando toque ese form.
*/

import { z } from "zod";

export const registroSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(20, "Máximo 20 caracteres"),
  email: z.string().email("Email inválido").max(255),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

export type RegistroInput = z.infer<typeof registroSchema>;
