"use client";
import { crearPlan } from "@/app/actions/planes";
import { CATEGORIAS } from "@/app/constants/categorias";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const PlanPage = () => {
  const [plan, setPlan] = useState({
    titulo: "",
    categoria: "",
    descripcion: "",
    fecha: "",
    ubicacion: "",
    aforo_max: 0,
  });

  const [toast, setToast] = useState<{ mensaje: string; tipo: string } | null>(
    null,
  );
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const resultado = await crearPlan(plan);
    console.log(plan);

    if (resultado?.error) {
      setToast({ mensaje: resultado.error, tipo: "error" });
      setTimeout(() => setToast(null), 2000);
      return;
    }
    setToast({
      mensaje: "Tu plan se ha creado correctamente",
      tipo: "success",
    });
    setTimeout(() => setToast(null), 2000);

    //vacio el form
    setTimeout(() => {
      setPlan({
        titulo: "",
        categoria: "",
        descripcion: "",
        fecha: "",
        ubicacion: "",
        aforo_max: 0,
      });
    }, 100);
  };
  return (
    <div>
      {toast && (
        <div className="toast toast-top toast-center z-20">
          <div className={`alert alert-${toast.tipo}`}>
            <span>{toast.mensaje}</span>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="fieldset w-xs">
        <legend className="fieldset-legend">Titulo</legend>
        <input
          type="text"
          className="input"
          value={plan.titulo}
          onChange={(event) => setPlan({ ...plan, titulo: event.target.value })}
        />
        <legend className="fieldset-legend">Categoria</legend>
        {/* <input
          type="text"
          className="input"
          value={plan.categoria}
          onChange={(event) =>
            setPlan({ ...plan, categoria: event.target.value })
          }
        /> */}
        <select
          value={plan.categoria}
          onChange={(event) =>
            setPlan({ ...plan, categoria: event.target.value })
          }
        >
          <option value="Aventura">Aventura</option>
          <option value="Cultura">Cultura</option>
          <option value="Deporte">Deporte</option>
          <option value="Música">Música</option>
          <option value="Gastronomía">Gastronomía</option>
          <option value="Naturaleza">Naturaleza</option>
          <option value="Tecnología">Tecnología</option>
          <option value="Arte">Arte</option>
          <option value="Cine">Cine</option>
          <option value="Social">Social</option>
        </select>
        <legend className="fieldset-legend">Descripcion</legend>
        <input
          type="text"
          className="input"
          value={plan.descripcion}
          onChange={(event) =>
            setPlan({ ...plan, descripcion: event.target.value })
          }
        />
        <legend className="fieldset-legend">Fecha</legend>
        <input
          type="datetime-local"
          className="input"
          value={plan.fecha}
          onChange={(event) => setPlan({ ...plan, fecha: event.target.value })}
        />
        <legend className="fieldset-legend">Aforo maximo</legend>
        <input
          type="number"
          className="input"
          value={plan.aforo_max}
          onChange={(event) =>
            setPlan({ ...plan, aforo_max: Number(event.target.value) })
          }
        />
        <legend className="fieldset-legend">Ubicacion</legend>
        <input
          type="text"
          className="input"
          value={plan.ubicacion}
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
