/*
Schemas de plan con zod.
- planSchema: forma completa de un plan (refleja la fila de BBDD + el
  campo participants que se calcula en SQL).
- planInputSchema: derivado, los campos editables en POST y PUT.

El mismo planInputSchema vale para crear y editar: ambos endpoints
aceptan exactamente los mismos campos.
*/

import { z } from "zod";


// 1. Schema completo (tipo + forma de la fila)

export const planSchema = z.object({
  id: z.number(),
  creator_id: z.number(),
  titulo: z.string().min(1).max(100),
  categoria: z.string().min(1).max(50),
  // La descripción es obligatoria a nivel de aplicación. La columna en
  // BBDD sigue siendo nullable por compatibilidad con planes antiguos,
  // pero los nuevos deben llevar mínimo 20 caracteres.
  descripcion: z.string().min(20).max(2000),
  // fecha: string ISO. Solo aceptamos fechas futuras: no tiene sentido
  // crear ni mover un plan al pasado.
  fecha: z.string().refine((v) => new Date(v).getTime() > Date.now(), {
    message: "La fecha debe ser futura",
  }),
  // Ubicación obligatoria: la PlanCard la imprime sin gestionar el null.
  ubicacion: z.string().min(1).max(200),
  // int().min(1): al menos 1 plaza. max(1000) como cap razonable.
  aforo_max: z.number().int().min(1).max(1000),
  // participants es un campo CALCULADO por la subquery SQL,
  // no existe en la tabla. Solo aparece en lecturas, opcional.
  participants: z.number().optional(),
  created_at: z.string(),
  // Campos del creador, traídos por JOIN con users + perfiles en las
  // queries de lectura. Permiten pintar avatar + @username en la PlanCard
  // sin que el frontend tenga que hacer una petición extra por cada plan
  // (anti N+1).
  creador_nombre: z.string(),
  creador_username: z.string(),
  // nullable porque el usuario puede no haber elegido avatar todavía
  // (cae al fallback con inicial sobre fondo gris).
  creador_avatar_url: z.string().nullable(),
  // .optional() porque solo lo seleccionamos en obtenerDetalle (no en las
  // queries de lista, que no pintan la bio en las PlanCards).
  creador_descripcion: z.string().nullable().optional(),
});

export type Plan = z.infer<typeof planSchema>;


// 2. Schema de input para POST y PUT

// .pick selecciona los campos editables. Los demás (id, creator_id,
// participants, created_at) los pone el backend, no el cliente.
// NO usamos .partial() porque crear/editar requieren los campos completos
// (a diferencia de PATCH en perfiles).
export const planInputSchema = planSchema.pick({
  titulo: true,
  categoria: true,
  descripcion: true,
  fecha: true,
  ubicacion: true,
  aforo_max: true,
});

export type PlanInput = z.infer<typeof planInputSchema>;
