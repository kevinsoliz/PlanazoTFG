"use client";
import planes from "@/app/services/planes-service";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const PlanPage = () => {
  const [plan, setPlan] = useState({
    titulo: "",
    categoria: "",
    descripcion: "",
    fecha: "",
    ubicacion: "",
    aforo_max: "",
  });

  const [toast, setToast] = useState<{mensaje: string, tipo: string} | null>(null);
  const router = useRouter();

  const handlePlan = (event: FormEvent) => {
    event.preventDefault();
    planes
      .create(plan)
      .then(() => {
        setToast({
          mensaje: "Tu plan se ha creado correctamente",
          tipo: "success",
        });
        setTimeout(() => router.push("/home"), 2000);
      })
      .catch((err) => {
        const mensaje = err.response?.data?.error ?? "Error de conexión con el servidor"
        setToast({mensaje, tipo:"error"});
      });
  };
  return (
    <div>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className={`alert alert-${toast.tipo}`}>
            <span>{toast.mensaje}</span>
          </div>
        </div>
      )}
      <form onSubmit={handlePlan} className="fieldset w-xs">
        <legend className="fieldset-legend">Titulo</legend>
        <input
          type="text"
          className="input"
          onChange={(event) => setPlan({ ...plan, titulo: event.target.value })}
        />
        <legend className="fieldset-legend">Categoria</legend>
        <input
          type="text"
          className="input"
          onChange={(event) =>
            setPlan({ ...plan, categoria: event.target.value })
          }
        />
        <legend className="fieldset-legend">Descripcion</legend>
        <input
          type="text"
          className="input"
          onChange={(event) =>
            setPlan({ ...plan, descripcion: event.target.value })
          }
        />
        <legend className="fieldset-legend">Fecha</legend>
        <input
          type="datetime-local"
          className="input"
          onChange={(event) => setPlan({ ...plan, fecha: event.target.value })}
        />
        <legend className="fieldset-legend">Aforo maximo</legend>
        <input
          type="text"
          className="input"
          onChange={(event) =>
            setPlan({ ...plan, aforo_max: event.target.value })
          }
        />
        <legend className="fieldset-legend">Ubicacion</legend>
        <input
          type="text"
          className="input"
          onChange={(event) =>
            setPlan({ ...plan, ubicacion: event.target.value })
          }
        />
        <button type="submit" className="btn btn-neutral ">
          Crear
        </button>
      </form>
    </div>
  );
};

export default PlanPage;
