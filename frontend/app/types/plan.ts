/* Tipos de plan para el frontend. Duplican a mano la forma definida por
   los schemas de zod del backend (backend/src/schemas/plan.schema.ts).
   Si cambia el backend, hay que actualizar aquí también. */


/* Plan tal como lo devuelve el backend en las lecturas (listar, detalle).
   Incluye los datos del creador (los traemos en la misma query) para
   pintar la PlanCard con avatar y @username sin pedir el perfil aparte. */
export interface Plan {
    id: number,
    creator_id: number,
    titulo: string,
    categoria: string,
    descripcion: string | null,
    fecha: string,
    ubicacion: string | null,
    aforo_max: number,
    participants: number,
    created_at: string,
    creador_nombre: string,
    creador_username: string,
    creador_avatar_url: string | null,
    creador_descripcion?: string | null,
    mi_voto?: number | string | null,
    nota_media?: number | string | null,
    es_favorito?: boolean,
}

// Datos que se mandan al backend al crear (POST) o editar (PUT) un plan.
export interface PlanInput {
    titulo: string,
    categoria: string,
    descripcion: string | null,
    fecha: string,
    ubicacion: string | null,
    aforo_max: number
}
