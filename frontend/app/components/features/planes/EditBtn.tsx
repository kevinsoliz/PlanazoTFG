"use client";

import { editarPlan } from "@/app/actions/planes";
import { Plan } from "@/app/types/plan";
import { useRef, useState } from "react";

const EditBtn = ({ plan }: { plan: Plan }) => {
  const [currentPlan, setCurrentPlan] = useState({
    titulo: plan.titulo,
    categoria: plan.categoria,
    descripcion: plan.descripcion,
    fecha: plan.fecha.slice(0, 16),
    ubicacion: plan.ubicacion,
    aforo_max: plan.aforo_max,
  });

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClick = () => {
    dialogRef.current?.showModal();

    console.log("plan actual:", plan);
  };

  const handleSubmit = async () => {
    const resultado = await editarPlan(plan.id, currentPlan);
    console.log(resultado);
  }
  return (
    <>
      {/* (You can open the modal using document.getElementById('ID').showModal() method) -> de DaisyUI, para no tener que usar el document usamos useRef que persiste la referencia al elemento html dialog*/}
      <button
        className="btn btn-success btn-sm btn-outline"
        onClick={handleClick}
      >
        Editar
      </button>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <button
            onClick={() => dialogRef.current?.close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <form onSubmit={handleSubmit} className="fieldset w-xs">
            <legend className="fieldset-legend">Titulo</legend>
            <input
              type="text"
              className="input"
              value={currentPlan.titulo}
              onChange={(event) =>
                setCurrentPlan({ ...currentPlan, titulo: event.target.value })
              }
            />
            <legend className="fieldset-legend">Categoria</legend>
            <input
              type="text"
              className="input"
              value={currentPlan.categoria}
              onChange={(event) =>
                setCurrentPlan({ ...currentPlan, categoria: event.target.value })
              }
            />
            <legend className="fieldset-legend">Descripcion</legend>
            <input
              type="text"
              className="input"
              value={currentPlan.descripcion ?? ""}
              onChange={(event) =>
                setCurrentPlan({ ...currentPlan, descripcion: event.target.value })
              }
            />
            <legend className="fieldset-legend">Fecha</legend>
            <input
              type="datetime-local"
              className="input"
              value={currentPlan.fecha}
              onChange={(event) =>
                setCurrentPlan({ ...currentPlan, fecha: event.target.value })
              }
            />
            <legend className="fieldset-legend">Aforo maximo</legend>
            <input
              type="text"
              className="input"
              value={currentPlan.aforo_max}
              onChange={(event) =>
                setCurrentPlan({ ...currentPlan, aforo_max: Number(event.target.value) })
              }
            />
            <legend className="fieldset-legend">Ubicacion</legend>
            <input
              type="text"
              className="input"
              value={currentPlan.ubicacion ?? ""}
              onChange={(event) =>
                setCurrentPlan({ ...currentPlan, ubicacion: event.target.value })
              }
            />
            <button type="submit" className="btn btn-neutral ">
              Editar
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default EditBtn;
