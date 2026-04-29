"use client";

import { useRef, useState } from "react";
import { CATEGORIAS } from "@/app/constants/categorias";

const EditProfileBtn = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<
    string[]
  >([]);

  const handleOpen = () => {
    dialogRef.current?.showModal();
  };

  const toggleCategoria = (name: string) => {
    setCategoriasSeleccionadas((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name],
    );
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
                />

                <label className="label ">Username</label>
                <input
                  type="text"
                  className="input"
                  placeholder="@username"
                />

                <label className="label ">Descripción</label>
                <textarea
                  className="textarea"
                  placeholder="Cuéntanos algo sobre ti..."
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

                <button type="button" className="btn btn-success mt-4 w-full max-w-xs">
                  Guardar
                </button>
              </fieldset>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-3 border place-items-center">
              {Array.from({ length: 9 }, (_, i) => (
                <img
                  key={i}
                  src={`/images/avatars/avatar-${i + 1}.png`}
                  alt={`Avatar ${i + 1}`}
                  className="w-20 h-20"
                />
              ))}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditProfileBtn;
