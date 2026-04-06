export interface Plan {
    id: number,
    creator_id: number,
    titulo: string,
    categoria: string,
    descripcion: string | null,
    fecha: string,
    ubicacion: string | null,
    aforo_max: number,
    created_at: string
}