"use client";

import { abandonarPlan } from "@/app/actions/planes";
import { useState } from "react";
import { useToast } from "@/app/context/ToastContext";

const UnjoinBtn = ({ plan_id }: { plan_id: number }) => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleLeave = async () => {
    setLoading(true);
    const resultado = await abandonarPlan(plan_id);
    setLoading(false);

    if (resultado?.error) {
      showToast(resultado.error, "error");
    } else {
      showToast("Ya no estás apuntado a este plan", "success");
    }
  };

  return (
    <button
      onClick={handleLeave}
      className="btn btn-error btn-outline btn-sm"
      disabled={loading}
    >
      {loading ? "Saliendo..." : "Anular"}
    </button>
  );
};

export default UnjoinBtn;