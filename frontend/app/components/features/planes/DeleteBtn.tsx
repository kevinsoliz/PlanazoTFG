'use client';
import { borrarPlan } from "@/app/actions/planes";
import React, { useState } from "react";

// Botón para borrar un plan (solo lo verá el creador). Si el backend rechaza, enseña un toast con el error.
const DeleteBtn = ({ plan_id }: { plan_id: number }) => {
  const [toast, setToast] = useState<{ mensaje: string; tipo: string } | null>(
    null,
  );
  const handleClick = async () => {
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
    <button className="btn btn-error btn-xs btn-soft" onClick={handleClick}>
      Borrar
    </button>
    </>
  );
};

export default DeleteBtn;
