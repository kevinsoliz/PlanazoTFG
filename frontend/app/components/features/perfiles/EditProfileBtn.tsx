'use client'
import { editarPerfil } from '@/app/actions/perfiles'

const EditProfileBtn = () => {

    const handleClick = async () => {
        const resultado = await editarPerfil({
            nombre: "Perico",
            username: "juuuanpedrode",
            descripcion: "HOLA QUE ASE",
            categorias: "Aventura,Cultura,Cine"
        })
    }
  return (
    <button onClick={handleClick} className="btn btn-secondary">Editar</button>
  )
}

export default EditProfileBtn