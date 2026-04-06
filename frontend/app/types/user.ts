export interface AuthUser {
    id: number;
    nombre: string;
    email: string;
}

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