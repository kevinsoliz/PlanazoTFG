/* Tipos de usuario y perfil para el frontend. Duplican a mano la forma
   definida por los schemas de zod del backend. Si cambia el backend,
   hay que actualizar aquí también. */


// Usuario autenticado, lo que devuelven /api/auth/me y /api/auth/login.
export interface AuthUser {
    id: number;
    nombre: string;
    email: string;
}

// Perfil tal como lo devuelve GET /api/perfiles/:id.
export interface UserProfile {
    id: number,
    user_id: number,
    nombre: string;
    username: string;
    avatar_url: string | null,
    descripcion: string | null,
    categorias: string | null,
    created_at: string
}

/* Datos que se mandan al backend en PATCH /api/perfiles/:id. Todos los
   campos son opcionales: solo se envían los que cambian. */
export interface ProfileUpdate {
    nombre?: string;
    username?: string;
    avatar_url?: string | null;
    descripcion?: string | null;
    categorias?: string | null;
}
