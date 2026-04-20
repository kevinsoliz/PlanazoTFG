'use client'
import { editarPlan } from '../actions/planes';
import { editarPerfil } from '../services/auth.server';

export default function TestPage() {

    const handleEditar = async () => {
        debugger;
        const resultado = await editarPerfil({
            nombre: "Pericoooo",
            username: "juuuan",
            descripcion: "HOLA QUE ASE",
            categorias: "Aventura, Música, Cine"
        })

        console.log(resultado)

    }

    return <button onClick={handleEditar}>Editar</button>
}