"use client";

import { unirseAPlan } from "@/app/actions/planes";
import { useState } from "react";
import { useToast } from "@/app/context/ToastContext"; 

const JoinBtn = ({ plan_id }: { plan_id: number }) => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast(); 
  const [toast, setgitToast]  = useState<{ mensaje: string; tipo: string; } | null>(null,);

  const handleClick = async () => {
    setLoading(true);
    const resultado = await unirseAPlan(plan_id);
    setLoading(false);

    if (resultado?.error) {
      showToast(resultado.error, "error");
    } else {
      showToast("Te has unido al plan correctamente", "success");
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
      <button
        onClick={handleClick}
        className="btn btn-primary btn-outline  btn-xs"
      >
        {loading ? "Uniéndome..." : "Unirme"}
      </button>
    </>
  );
};

export default JoinBtn;