'use client';
import { borrarPlan } from "@/app/actions/planes";
import React, { useState } from "react";

const DeleteBtn = ({ plan_id }: { plan_id: number }) => {
  const [toast, setToast] = useState<{ mensaje: string; tipo: string } | null>(
    null,
  );
  const handleClick = async () => {
    console.log(plan_id);
    const resultado = await borrarPlan(plan_id);

    if (resultado?.error) {
      setToast({ mensaje: resultado.error, tipo: "error" });
      setTimeout(() => setToast(null), 2000);
    } 
  };

  return (
    <>
    {toast && (
        <div className="toast toast-top toast-center z-50 mt-15">
          <div className={`alert alert-${toast.tipo}`}>
            <span>{toast.mensaje}</span>
          </div>
        </div>
      )}
    <button className="btn btn-outline btn-error btn-xs" onClick={handleClick}>
      Borrar
    </button>
    </>
  );
};

export default DeleteBtn;
