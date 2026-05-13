/* Schema de perfil en el frontend. Duplicado intencional del de
   backend/src/schemas/perfil.schema.ts. Si cambian las reglas hay que
   tocar los dos ficheros.

   Aquí no son opcionales como en el backend porque el formulario siempre
   manda los 5 campos, aunque el backend acepta también enviar solo unos
   pocos. */

import { z } from "zod";

/* Lista cerrada de avatares permitidos (los 9 que se ven en el grid del
   formulario). El UI ya impide otros valores, pero validamos también aquí
   por simetría con el backend. */
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
