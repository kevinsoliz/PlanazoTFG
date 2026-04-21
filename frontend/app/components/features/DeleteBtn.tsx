'use client';
import { borrarPlan } from "@/app/actions/planes";
import React from "react";
import { useToast } from "@/app/context/ToastContext"; 

const DeleteBtn = ({ plan_id }: { plan_id: number }) => {
  const { showToast } = useToast(); 

  const handleClick = async () => {
    const resultado = await borrarPlan(plan_id);

    if (resultado?.error) {
      showToast(resultado.error, "error");
    } else {
      showToast("Plan eliminado correctamente", "success");
    }
  };

  return (
    <button className="btn btn-outline btn-error btn-sm" onClick={handleClick}>
      Borrar
    </button>
  );
};

export default DeleteBtn;