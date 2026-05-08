"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIAS } from "@/app/constants/categorias";
import { crearPlan } from "@/app/actions/planes";
import { planInputSchema } from "@/app/schemas/plan.schema";

type FormData = {
  titulo: string;
  categoria: string;
  descripcion: string;
  fecha: string;
  ubicacion: string;
  aforo_max: number;
};

type Campo = keyof FormData;

const PlanPage = () => {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    titulo: "",
    categoria: "",
    descripcion: "",
    fecha: "",
    ubicacion: "",
    aforo_max: 2,
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<Campo, string>>>(
    {},
  );

  // Setter genérico: actualiza el campo y limpia su error si lo había.
  // El generic K mantiene la correspondencia tipo-valor (titulo es string,
  // aforo_max es number, etc.) — sin esto perderíamos el tipado.
  const update = <K extends Campo>(campo: K, valor: FormData[K]) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    if (fieldErrors[campo]) {
      setFieldErrors((prev) => ({ ...prev, [campo]: undefined }));
    }
  };

  const handleCrear = async () => {
    const validacion = planInputSchema.safeParse(form);
    if (!validacion.success) {
      const errors = validacion.error.flatten().fieldErrors;
      setFieldErrors({
        titulo: errors.titulo?.[0],
        categoria: errors.categoria?.[0],
        descripcion: errors.descripcion?.[0],
        fecha: errors.fecha?.[0],
        ubicacion: errors.ubicacion?.[0],
        aforo_max: errors.aforo_max?.[0],
      });
      return;
    }

    setFieldErrors({});
    const result = await crearPlan(form);
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
              className="input w-full"
              placeholder="Título del plan"
              value={form.titulo}
              onChange={(e) => update("titulo", e.target.value)}
            />
            {fieldErrors.titulo && (
              <p className="text-error text-xs mt-1">{fieldErrors.titulo}</p>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Descripción</label>
            <textarea
              className="textarea w-full"
              placeholder="Cuenta de qué va el plan..."
              value={form.descripcion}
              onChange={(e) => update("descripcion", e.target.value)}
            />
            {fieldErrors.descripcion && (
              <p className="text-error text-xs mt-1">
                {fieldErrors.descripcion}
              </p>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Categoría</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIAS.map((cat) => {
                const seleccionada = form.categoria === cat.name;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => update("categoria", cat.name)}
                    className={`badge ${cat.badge} ${
                      seleccionada ? "" : "badge-outline opacity-60"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>
            {fieldErrors.categoria && (
              <p className="text-error text-xs mt-1">{fieldErrors.categoria}</p>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Fecha</label>
            <input
              type="datetime-local"
              className="input w-full"
              value={form.fecha}
              onChange={(e) => update("fecha", e.target.value)}
            />
            {fieldErrors.fecha && (
              <p className="text-error text-xs mt-1">{fieldErrors.fecha}</p>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <label className="label">Ubicación</label>
            <input
              type="text"
              className="input w-full"
              placeholder="¿Dónde?"
              value={form.ubicacion}
              onChange={(e) => update("ubicacion", e.target.value)}
            />
            {fieldErrors.ubicacion && (
              <p className="text-error text-xs mt-1">{fieldErrors.ubicacion}</p>
            )}
            <p className="text-xs text-neutral/60 mt-1 flex items-center gap-2">
              * Pronto podrás elegir la ubicación directamente desde un mapa.
              <span className="badge badge-xs badge-neutral">Próximamente</span>
            </p>
          </fieldset>

          <fieldset className="fieldset">
            <div className="flex items-center justify-between">
              <label className="label">Aforo máximo</label>
              <span className="font-bold">{form.aforo_max}</span>
            </div>
            <input
              type="range"
              min={2}
              max={20}
              value={form.aforo_max}
              onChange={(e) => update("aforo_max", Number(e.target.value))}
              className="range range-sm w-full"
            />
            <p className="text-xs text-neutral/60 mt-1 flex items-center gap-2">
              * Con el plan Premium tendrás aforo ilimitado.
              <span className="badge badge-xs badge-neutral">Próximamente</span>
            </p>
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
