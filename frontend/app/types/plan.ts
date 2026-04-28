// Tipos de plan para el frontend.
// IMPORTANTE: estos tipos duplican (a mano) la forma definida por los
// schemas de zod del backend (backend/src/schemas/plan.schema.ts).
// Si cambia el backend, hay que actualizar aquí. Es deuda conocida y
// aceptada para evitar la fricción de un paquete `shared/` en el monorepo.

// Plan tal como el backend lo devuelve en las lecturas (listar, detalle).
// Incluye los datos del creador traídos por JOIN para pintar la PlanCard
// (avatar + @username) sin pedir el perfil aparte.
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
    creador_avatar_url: string | null
}

// Datos que se mandan al backend para crear (POST) o editar (PUT) un plan.
// Refleja `planInputSchema` del backend.
export interface PlanInput {
    titulo: string,
    categoria: string,
    descripcion: string | null,
    fecha: string,
    ubicacion: string | null,
    aforo_max: number
}
