"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIAS } from "@/app/constants/categorias";
import { crearPlan } from "@/app/actions/planes";

const PlanPage = () => {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [aforoMax, setAforoMax] = useState(2);

  const handleCrear = async () => {
    const result = await crearPlan({
      titulo,
      categoria,
      descripcion: descripcion || null,
      fecha,
      ubicacion: ubicacion || null,
      aforo_max: aforoMax,
    });
    if (result && "ok" in result) {
      router.push("/mis-planes");
    }
  };

  return (
    <div className="flex flex-col gap-9">
      <header className="text-center font-(family-name:--font-bagel-fat-one) text-4xl md:text-5xl text-neutral leading-none">
        Monta tu planazo
      </header>
      <div className="flex gap-10 justify-center">
        <form
          className="fieldset bg-base-200 border-base-300 rounded-box w-120 border p-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleCrear();
          }}
        >
          <fieldset className="fieldset">
            <label className="label">Título</label>
            <input
              type="text"
              className="input validator w-full"
              placeholder="Título del plan"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
            <p className="validator-hint hidden">Obligatorio</p>
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Descripción</label>
            <textarea
              className="textarea w-full"
              placeholder="Cuenta de qué va el plan..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Categoría</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIAS.map((cat) => {
                const seleccionada = categoria === cat.name;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setCategoria(cat.name)}
                    className={`badge ${cat.badge} ${
                      seleccionada ? "" : "badge-outline opacity-60"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Fecha</label>
            <input
              type="datetime-local"
              className="input validator w-full"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
            <p className="validator-hint hidden">Obligatorio</p>
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Ubicación</label>
            <input
              type="text"
              className="input w-full"
              placeholder="¿Dónde?"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <div className="flex items-center justify-between">
              <label className="label">Aforo máximo</label>
              <span className="font-bold">{aforoMax}</span>
            </div>
            <input
              type="range"
              min={2}
              max={20}
              value={aforoMax}
              onChange={(e) => setAforoMax(Number(e.target.value))}
              className="range range-sm w-full"
            />
          </fieldset>

          <button type="submit" className="btn btn-success mt-4 w-full">
            Crear plan
          </button>
        </form>
        <div className="w-100 self-end hidden lg:block">
          <img src="/images/crear-plan/amigo-lapiz.png" alt="Amigo con lápiz" />
        </div>
      </div>
    </div>
  );
};

export default PlanPage;
