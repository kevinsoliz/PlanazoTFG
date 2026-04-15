"use client";

import { Plan } from "@/app/types/plan";
import { useRef, useState } from "react";

const EditBtn = ({ plan }: { plan: Plan }) => {
  const [currentPlan, setCurrentPlan] = useState({
    titulo: plan.titulo,
    categoria: plan.categoria,
    descripcion: plan.descripcion,
    fecha: plan.fecha,
    ubicacion: plan.ubicacion,
    aforo_max: plan.aforo_max,
  });

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClick = () => {

    dialogRef.current?.showModal();

    console.log("plan actual:", plan);
  };
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
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{currentPlan.titulo}</h3>
          <p className="py-4">{currentPlan.descripcion}</p>
          <p className="py-4">{currentPlan.fecha}</p>
          <p className="py-4">{currentPlan.categoria}</p>
        </div>
      </dialog>
    </>
  );
};

export default EditBtn;
