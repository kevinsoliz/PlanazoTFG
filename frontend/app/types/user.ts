// Tipos de usuario y perfil para el frontend.
// Estos tipos duplican (a mano) la forma definida por los schemas de
// zod del backend. Si cambia el backend, hay que actualizar aquí.
// Es deuda conocida y aceptada para evitar un paquete `shared/`.

// Usuario autenticado tal como lo devuelve /api/auth/me y /api/auth/login.
export interface AuthUser {
    id: number;
    nombre: string;
    email: string;
}

// Perfil tal como lo devuelve GET /api/perfiles/:id.
// Refleja `perfilSchema` del backend.
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

// Datos que se mandan al backend en el PATCH de perfil.
// Refleja `perfilUpdateSchema` del backend (todos los campos opcionales,
// porque PATCH parcial — solo se mandan los que cambian).
export interface ProfileUpdate {
    nombre?: string;
    username?: string;
    descripcion?: string | null;
    categorias?: string | null;
}
