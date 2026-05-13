/* Validación de perfiles con zod. Definimos el schema y de paso sacamos
   los tipos TypeScript, así schema y tipo van siempre acompasados. */

import { z } from "zod";

const AVATARES_PERMITIDOS = Array.from(
  { length: 9 },
  (_, i) => `/images/avatars/avatar-${i + 1}.png`,
);


// Forma completa del perfil tal y como se guarda.
export const perfilSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  nombre: z.string().min(1).max(20),
  username: z.string().min(1).max(20),
  // Puede no haber elegido avatar todavía.
  avatar_url: z.string().nullable(),
  /* La descripción es obligatoria (mínimo 50 caracteres). Los perfiles
     antiguos que la tengan vacía la rellenarán al editar. */
  descripcion: z.string().min(50).max(500),
  categorias: z.string().max(200).nullable(),
  created_at: z.string(),
});

export type Perfil = z.infer<typeof perfilSchema>;


/* Schema para editar el perfil. Cogemos solo los campos editables y los
   hacemos opcionales, así el usuario puede enviar solo los que cambia.
   id, user_id y created_at no son editables. */
export const perfilUpdateSchema = perfilSchema
  .pick({
    nombre: true,
    username: true,
    avatar_url: true,
    descripcion: true,
    categorias: true,
  })
  .partial()
  .extend({
    avatar_url: z
      .string()
      .nullable()
      .refine((v) => v === null || AVATARES_PERMITIDOS.includes(v), {
        message: "Avatar no permitido",
      })
      .optional(),
  });

export type PerfilUpdate = z.infer<typeof perfilUpdateSchema>;
