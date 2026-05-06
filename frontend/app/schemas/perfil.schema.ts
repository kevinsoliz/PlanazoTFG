/*
Schema de perfil en el frontend.
Duplicado intencional del de backend/src/schemas/perfil.schema.ts.
Si cambian las reglas, hay que actualizar ambos ficheros.

A diferencia del backend (que usa un schema PARTIAL para PATCH parcial),
aquí el form de editar perfil siempre envía los 5 campos, así que el schema
es no-partial. La forma del payload sigue siendo compatible: el backend
acepta cualquier subconjunto.
*/

import { z } from "zod";

// Lista cerrada de avatares permitidos. Los 9 que se ven en el grid del
// formulario. La validación es defensiva: el UI ya impide otros valores,
// pero replicamos lo que hace el backend para mantener simetría.
const AVATARES_PERMITIDOS = Array.from(
  { length: 9 },
  (_, i) => `/images/avatars/avatar-${i + 1}.png`,
);

export const perfilUpdateSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es obligatorio")
    .max(20, "Máximo 20 caracteres"),
  username: z
    .string()
    .min(1, "El username es obligatorio")
    .max(20, "Máximo 20 caracteres"),
  avatar_url: z
    .string()
    .nullable()
    .refine((v) => v === null || AVATARES_PERMITIDOS.includes(v), {
      message: "Avatar no permitido",
    }),
  descripcion: z
    .string()
    .min(50, "Mínimo 50 caracteres")
    .max(500, "Máximo 500 caracteres"),
  categorias: z.string().max(200).nullable(),
});

export type PerfilUpdate = z.infer<typeof perfilUpdateSchema>;
