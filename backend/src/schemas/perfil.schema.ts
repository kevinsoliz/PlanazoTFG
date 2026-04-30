/*
Schemas de perfil con zod.
Fuente única de verdad para tipos + validación.

- perfilSchema: forma completa del perfil (refleja la fila de BBDD).
- perfilUpdateSchema: derivado, solo los campos editables y todos opcionales.
- Los tipos TS se sacan con z.infer — nunca escribir tipos a mano.

Si añadimos un campo a perfilSchema, perfilUpdateSchema y sus tipos
derivados se actualizan automáticamente. Eso es la "fuente única".
*/

import { z } from "zod";

// 1. Schema completo (tipo + forma de la fila de BBDD)

export const perfilSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  // min/max razonables. Si los superan, zod rechaza con un mensaje claro.
  nombre: z.string().min(1).max(100),
  username: z.string().min(1).max(50),
  // nullable porque la columna en Postgres acepta NULL.
  avatar_url: z.string().nullable(),
  descripcion: z.string().max(500).nullable(),
  categorias: z.string().max(200).nullable(),
  created_at: z.string(),
});

// Tipo TS derivado. Se exporta para que el service tipe sus retornos.
export type Perfil = z.infer<typeof perfilSchema>;


// 2. Schema de input para PATCH /api/perfiles/:id

// .pick selecciona los campos editables.
// .partial los hace todos opcionales (PATCH parcial: solo los que vienen).
// Cualquier campo que NO esté en la lista (id, user_id, created_at)
// será stripeado por defecto si llega en el body — eso reemplaza la whitelist
// manual que hacíamos en el controller con desestructuración.
export const perfilUpdateSchema = perfilSchema
  .pick({
    nombre: true,
    username: true,
    avatar_url: true,
    descripcion: true,
    categorias: true,
  })
  .partial();

export type PerfilUpdate = z.infer<typeof perfilUpdateSchema>;
