"use client";

import { editarPlan } from "@/app/actions/planes";
import { CATEGORIAS } from "@/app/constants/categorias";
import { planInputSchema } from "@/app/schemas/plan.schema";
import { Plan } from "@/app/types/plan";
import { useRef, useState } from "react";

type FormData = {
  titulo: string;
  categoria: string;
  descripcion: string;
  fecha: string;
  ubicacion: string;
  aforo_max: number;
};

type Campo = keyof FormData;

// Botón que abre un modal con el formulario para editar el plan. Valida con zod antes de mandar el PUT.
const EditBtn = ({ plan }: { plan: Plan }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  /* Estado inicializado con los valores actuales del plan. Los campos
     que pueden ser null (descripcion, ubicacion) se convierten a ""
     porque los inputs de React no pueden tener value={null}. */
  const [form, setForm] = useState<FormData>({
    titulo: plan.titulo,
    categoria: plan.categoria,
    descripcion: plan.descripcion ?? "",
    fecha: plan.fecha.slice(0, 16),
    ubicacion: plan.ubicacion ?? "",
    aforo_max: plan.aforo_max,
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<Campo, string>>>(
    {},
  );

  const update = <K extends Campo>(campo: K, valor: FormData[K]) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    if (fieldErrors[campo]) {
      setFieldErrors((prev) => ({ ...prev, [campo]: undefined }));
    }
  };

  const handleClick = () => {
    dialogRef.current?.showModal();
  };

  const handleSubmit = async () => {
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
    const result = await editarPlan(plan.id, form);
    if (result && "ok" in result) {
      dialogRef.current?.close();
    }
  };

  return (
    <>
      {/* DaisyUI recomienda abrir el modal con document.getElementById, pero usamos useRef para mantener la referencia tipada. */}
      <button
        className="btn btn-success btn-soft btn-xs"
        onClick={handleClick}
      >
        Editar
      </button>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box max-w-md bg-base-100 p-8 scrollbar-hide">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <form
            className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
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
                * Con el plan Premium tendrás aforo ilimitado
                <span className="badge badge-xs badge-neutral">Próximamente</span>
              </p>
            </fieldset>

            <button type="submit" className="btn btn-success mt-4 w-full">
              Guardar
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default EditBtn;
