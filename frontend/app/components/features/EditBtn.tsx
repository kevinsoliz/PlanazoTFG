"use client";

import { editarPlan } from "@/app/actions/planes";
import { Plan } from "@/app/types/plan";
import { useRef, useState } from "react";
import { useToast } from "@/app/context/ToastContext"; 

const EditBtn = ({ plan }: { plan: Plan }) => {
  const { showToast } = useToast(); 
  
  // Estado local para manejar los campos del formulario
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita el refresco de página

    const resultado = await editarPlan(plan.id, currentPlan);
    
    if (!resultado?.ok) {
      showToast("Hubo un error al actualizar el plan", "error");
    } 
    else {
      showToast("Plan actualizado correctamente", "success");
      dialogRef.current?.close(); // Cierre automático del modal
    }
  };

  return (
    <>
      <button
        className="btn btn-success btn-sm btn-outline"
        onClick={handleClick}
      >
        Editar
      </button>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          {/* Formulario de edición con inputs vinculados al estado */}
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <form onSubmit={handleSubmit} className="fieldset w-full">
            <legend className="fieldset-legend">Titulo</legend>
            <input
              type="text"
              className="input w-full"
              value={currentPlan.titulo}
              onChange={(event) =>
                setCurrentPlan({ ...currentPlan, titulo: event.target.value })
              }
            />
            
            <legend className="fieldset-legend">Categoria</legend>
            <input
              type="text"
              className="input w-full"
              value={currentPlan.categoria}
              onChange={(event) =>
                setCurrentPlan({ ...currentPlan, categoria: event.target.value })
              }
            />
            
            <legend className="fieldset-legend">Descripcion</legend>
            <input
              type="text"
              className="input w-full"
              value={currentPlan.descripcion ?? ""}
              onChange={(event) =>
                setCurrentPlan({ ...currentPlan, descripcion: event.target.value })
              }
            />
            
            <legend className="fieldset-legend">Fecha</legend>
            <input
              type="datetime-local"
              className="input w-full"
              value={currentPlan.fecha}
              onChange={(event) =>
                setCurrentPlan({ ...currentPlan, fecha: event.target.value })
              }
            />
            
            <legend className="fieldset-legend">Aforo maximo</legend>
            <input
              type="number"
              className="input w-full"
              value={currentPlan.aforo_max}
              onChange={(event) =>
                setCurrentPlan({ ...currentPlan, aforo_max: Number(event.target.value) })
              }
            />
            
            <legend className="fieldset-legend">Ubicacion</legend>
            <input
              type="text"
              className="input w-full"
              value={currentPlan.ubicacion ?? ""}
              onChange={(event) =>
                setCurrentPlan({ ...currentPlan, ubicacion: event.target.value })
              }
            />
            
            <div className="mt-4">
              <button type="submit" className="btn btn-neutral w-full">
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default EditBtn;