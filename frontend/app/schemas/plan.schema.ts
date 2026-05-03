/*
Schema de plan en el frontend.
Duplicado intencional del de backend/src/schemas/plan.schema.ts (la parte
de input). Si cambian las reglas, hay que actualizar ambos ficheros.

Solo el schema de input. La forma completa del Plan (con id, creator_id,
campos del JOIN, etc.) sigue tipada a mano en types/plan.ts porque eso es
salida del backend, no input del usuario.
*/

import { z } from "zod";

export const planInputSchema = z.object({
  titulo: z
    .string()
    .min(1, "El título es obligatorio")
    .max(100, "Máximo 100 caracteres"),
  categoria: z.string().min(1, "Selecciona una categoría").max(50),
  descripcion: z
    .string()
    .min(20, "Mínimo 20 caracteres")
    .max(2000, "Máximo 2000 caracteres"),
  // El input datetime-local devuelve "YYYY-MM-DDTHH:mm" en hora local.
  // refine se evalúa en cliente: el navegador interpreta el string como
  // hora local y lo compara con Date.now(). Suficiente para evitar que
  // alguien cree un plan en el pasado.
  fecha: z
    .string()
    .min(1, "La fecha es obligatoria")
    .refine((v) => new Date(v).getTime() > Date.now(), {
      message: "La fecha debe ser futura",
    }),
  ubicacion: z
    .string()
    .min(1, "La ubicación es obligatoria")
    .max(200, "Máximo 200 caracteres"),
  aforo_max: z.number().int().min(1).max(1000),
});

export type PlanInput = z.infer<typeof planInputSchema>;
