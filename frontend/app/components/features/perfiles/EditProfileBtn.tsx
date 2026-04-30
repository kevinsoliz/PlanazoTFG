"use client";

import { useRef, useState } from "react";
import { CATEGORIAS } from "@/app/constants/categorias";
import { editarPerfil } from "@/app/actions/perfiles";
import type { UserProfile } from "@/app/types/user";

type Props = {
  perfil: UserProfile | null;
};

const EditProfileBtn = ({ perfil }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<
    string[]
  >(perfil?.categorias ? perfil.categorias.split(",") : []);
  const [avatarSeleccionado, setAvatarSeleccionado] = useState<string | null>(
    perfil?.avatar_url ?? null,
  );
  const [nombre, setNombre] = useState(perfil?.nombre ?? "");
  const [username, setUsername] = useState(perfil?.username ?? "");
  const [descripcion, setDescripcion] = useState(perfil?.descripcion ?? "");

  const handleOpen = () => {
    dialogRef.current?.showModal();
  };

  const toggleCategoria = (name: string) => {
    setCategoriasSeleccionadas((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name],
    );
  };

  const handleGuardar = async () => {
    const result = await editarPerfil({
      nombre,
      username,
      descripcion: descripcion || null,
      categorias:
        categoriasSeleccionadas.length > 0
          ? categoriasSeleccionadas.join(",")
          : null,
    });
    if (result && "ok" in result) {
      dialogRef.current?.close();
    }
  };

  return (
    <>
      <button onClick={handleOpen} className="btn btn-secondary">
        Editar
      </button>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box max-w-3xl bg-base-100 p-8">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-80 ">
              <fieldset className="fieldset">
                <label className="label ">Nombre</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />

                <label className="label ">Username</label>
                <input
                  type="text"
                  className="input"
                  placeholder="@username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <label className="label ">Descripción</label>
                <textarea
                  className="textarea"
                  placeholder="Cuéntanos algo sobre ti..."
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />

                <label className="label ">Categorías</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIAS.map((cat) => {
                    const seleccionada = categoriasSeleccionadas.includes(
                      cat.name,
                    );
                    return (
                      <button
                        key={cat.name}
                        type="button"
                        onClick={() => toggleCategoria(cat.name)}
                        className={`badge ${cat.badge} ${
                          seleccionada ? "" : "badge-outline opacity-60"
                        }`}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleGuardar}
                  className="btn btn-success mt-4 w-full max-w-xs"
                >
                  Guardar
                </button>
              </fieldset>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-3 border place-items-center">
              {Array.from({ length: 9 }, (_, i) => {
                const url = `/images/avatars/avatar-${i + 1}.png`;
                const seleccionado = avatarSeleccionado === url;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAvatarSeleccionado(url)}
                    className={seleccionado ? "ring-2 ring-primary rounded" : "opacity-50"}
                  >
                    <img
                      src={url}
                      alt={`Avatar ${i + 1}`}
                      className="w-20 h-20"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditProfileBtn;
