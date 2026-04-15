'use client'
import { editarPlan } from '../actions/planes';

export default function TestPage() {

    const handleEditar = async () => {

        const data = await editarPlan(24, {
            titulo: "Fuckkkkkkkkk",
          categoria: "Deportes",
          descripcion: "Nueva descripción",
          fecha: "2026-05-01",
          ubicacion: "Nueva ubicación",
          aforo_max: "21",
        })

        console.log(data)

    }

    return <button onClick={handleEditar}>Editar</button>
}