'use client';
import { borrarPlan } from "@/app/actions/planes";
import React from "react";
import { useToast } from "@/app/context/ToastContext"; 

const DeleteBtn = ({ plan_id }: { plan_id: number }) => {
<<<<<<< HEAD:frontend/app/components/features/DeleteBtn.tsx
  const { showToast } = useToast(); 

  const handleClick = async () => {
  const resultado = await borrarPlan(plan_id);

  // Lógica para mostrar mensaje según la respuesta del servidor
  if (resultado?.error) {
    showToast(resultado.error, "error");
  } 
  else {
    showToast("¡Plan borrado con éxito!", "success");
  }
};

  return (
    <button className="btn btn-outline btn-error btn-sm" onClick={handleClick}>
=======
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
>>>>>>> origin/dev:frontend/app/components/features/planes/DeleteBtn.tsx
      Borrar
    </button>
  );
};

export default DeleteBtn;