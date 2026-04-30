"use client";

import { unirseAPlan } from "@/app/actions/planes";
import { useState } from "react";

const JoinBtn = ({ plan_id }: { plan_id: number }) => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ mensaje: string; tipo: string } | null>(
    null,
  );

  const handleClick = async () => {

    setLoading(true);
    // debugger;
    console.log('[CLIENT] voy a llamar a la server action')
    const resultado = await unirseAPlan(plan_id);
    // debugger;
    setLoading(false);

    if (resultado?.error) {
      setToast({ mensaje: resultado.error, tipo: "error" });
      setTimeout(() => setToast(null), 2000);
    } else {
      setToast({ mensaje: "Te has unido al plan!", tipo: "success" });
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
      <button
        onClick={handleClick}
        className="btn btn-primary btn-outline btn-sm"
      >
        {loading ? "Uniéndome..." : "Unirme"}
      </button>
    </>
  );
};

export default JoinBtn;
