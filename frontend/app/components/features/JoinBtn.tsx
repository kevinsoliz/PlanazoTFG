"use client";

import { unirseAPlan } from "@/app/actions/planes";
import { useState } from "react";
import { useToast } from "@/app/context/ToastContext"; 

const JoinBtn = ({ plan_id }: { plan_id: number }) => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast(); 

  const handleClick = async () => {
    setLoading(true); // Bloquea el botón para evitar doble click
    const resultado = await unirseAPlan(plan_id);
    setLoading(false);

    if (resultado?.error) {
      showToast(resultado.error, "error");
    } else {
      showToast("Te has unido al plan correctamente", "success");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="btn btn-primary btn-outline btn-sm"
      disabled={loading} // Desactivamos el botón mientras carga
    >
      {loading ? "Uniéndome..." : "Unirme"}
    </button>
  );
};

export default JoinBtn;