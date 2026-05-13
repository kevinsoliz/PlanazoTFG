/* Validación de planes con zod. planSchema es la forma completa de un plan
   tal y como sale a leer; planInputSchema es solo lo que el usuario rellena
   al crear o editar (los dos endpoints reciben los mismos campos). */

import { z } from "zod";


export const planSchema = z.object({
  id: z.number(),
  creator_id: z.number(),
  titulo: z.string().min(1).max(100),
  categoria: z.string().min(1).max(50),
  /* La descripción es obligatoria (mínimo 20 caracteres). Los planes
     antiguos pueden tenerla vacía, los nuevos no. */
  descripcion: z.string().min(20).max(2000),
  // Solo aceptamos fechas futuras.
  fecha: z.string().refine((v) => new Date(v).getTime() > Date.now(), {
    message: "La fecha debe ser futura",
  }),
  ubicacion: z.string().min(1).max(200),
  // Al menos 1 plaza, máximo 1000 como tope razonable.
  aforo_max: z.number().int().min(1).max(1000),
  /* participants lo calculamos en la query, no es una columna real.
     Solo aparece en lecturas, por eso es opcional. */
  participants: z.number().optional(),
  created_at: z.string(),
  /* Datos del creador. Los traemos en la misma query para que el
     frontend pinte avatar y @username sin pedirlos aparte. */
  creador_nombre: z.string(),
  creador_username: z.string(),
  // Puede no haber elegido avatar todavía.
  creador_avatar_url: z.string().nullable(),
  // Solo viene en el detalle del plan; en la lista no la usamos.
  creador_descripcion: z.string().nullable().optional(),
});

export type Plan = z.infer<typeof planSchema>;


/* Schema para crear o editar un plan. Solo los campos que el usuario rellena;
   id, creator_id, participants y created_at los pone el backend. */
export const planInputSchema = planSchema.pick({
  titulo: true,
  categoria: true,
  descripcion: true,
  fecha: true,
  ubicacion: true,
  aforo_max: true,
});

export type PlanInput = z.infer<typeof planInputSchema>;
