// Tipos de plan para el frontend.
// IMPORTANTE: estos tipos duplican (a mano) la forma definida por los
// schemas de zod del backend (backend/src/schemas/plan.schema.ts).
// Si cambia el backend, hay que actualizar aquí. Es deuda conocida y
// aceptada para evitar la fricción de un paquete `shared/` en el monorepo.

// Plan tal como el backend lo devuelve en las lecturas.
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
    created_at: string
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
