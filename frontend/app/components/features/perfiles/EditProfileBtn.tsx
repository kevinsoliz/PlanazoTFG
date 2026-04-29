"use client";

import { useRef } from "react";

const EditProfileBtn = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpen = () => {
    dialogRef.current?.showModal();
  };

  return (
    <>
      <button onClick={handleOpen} className="btn btn-secondary">
        Editar
      </button>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box max-w-4xl p-0 overflow-hidden">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10">
              ✕
            </button>
          </form>

          <div className="hero bg-primary">
            <div className="hero-content flex-col lg:flex-row-reverse">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold">Edita tu perfil</h1>
                <p className="py-6">
                  Cambia tu nombre, username, descripción o las categorías que
                  más te interesan.
                </p>
              </div>

              <div className="card bg-base-100 w-full max-w-sm shrink-0">
                <div className="card-body">
                  <fieldset className="fieldset">
                    <label className="label">Nombre</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Nombre"
                    />

                    <label className="label">Username</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="@username"
                    />

                    <label className="label">Descripción</label>
                    <textarea
                      className="textarea"
                      placeholder="Cuéntanos algo sobre ti..."
                    />

                    <label className="label">Categorías</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Aventura,Cultura,Cine"
                    />

                    <button
                      type="button"
                      className="btn btn-success  mt-4"
                    >
                      Guardar
                    </button>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default EditProfileBtn;
