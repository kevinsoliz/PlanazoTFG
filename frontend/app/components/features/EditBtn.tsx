'use client'

import { Plan } from "@/app/types/plan";

const EditBtn = ({ plan }: {plan: Plan}) => {
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-success btn-sm btn-outline"
        onClick={() => (document.getElementById("my_modal_3") as HTMLDialogElement).showModal()}
      >
        Editar
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{plan.titulo}</h3>
          <p className="py-4">{plan.descripcion}</p>
          <p className="py-4">{plan.fecha}</p>
          <p className="py-4">{plan.categoria}</p>
          
        </div>
      </dialog>
    </>
  );
};

export default EditBtn;
