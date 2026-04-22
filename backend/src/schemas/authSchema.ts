import { z } from 'zod';

export const RegistroSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es obligatorio")
    .trim(),
  email: z
    .email()
    .min(1, "El correo es obligatorio")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
});

export type RegistroInput = z.infer<typeof RegistroSchema>;

export const LoginSchema = z.object({
  email: z.email("Email inválido").trim().toLowerCase(),
  password: z.string().min(1, "La contraseña es obligatoria"),
});