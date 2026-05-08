"use client";

import { unirseAPlan } from "@/app/actions/planes";
import { useState } from "react";
import { useToast } from "@/app/context/ToastContext"; 

const JoinBtn = ({ plan_id }: { plan_id: number }) => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast(); 

  const handleClick = async () => {
<<<<<<< HEAD:frontend/app/components/features/JoinBtn.tsx
    setLoading(true); // Bloquea el botón para evitar doble click
=======
    setLoading(true);
>>>>>>> origin/dev:frontend/app/components/features/planes/JoinBtn.tsx
    const resultado = await unirseAPlan(plan_id);
    setLoading(false);

    if (resultado?.error) {
      showToast(resultado.error, "error");
    } else {
      showToast("Te has unido al plan correctamente", "success");
    }
  };

  return (
<<<<<<< HEAD:frontend/app/components/features/JoinBtn.tsx
    <button
      onClick={handleClick}
      className="btn btn-primary btn-outline btn-sm"
      disabled={loading} // Desactivamos el botón mientras carga
    >
      {loading ? "Uniéndome..." : "Unirme"}
    </button>
=======
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
>>>>>>> origin/dev:frontend/app/components/features/planes/JoinBtn.tsx
  );
};

export default JoinBtn;