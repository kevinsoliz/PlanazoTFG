import React from 'react'
import FeatureCard from '../components/landing/FeatureCard';

const BasicosPage = () => {
  return (
      <div className="min-h-screen bg-base-100 p-10 flex flex-col gap-10">
      {/* Tipografía */}
      <section className="flex flex-col gap-2">
        <h1 className="text-5xl font-bold">Planazo — Heading 1</h1>
        <h2 className="text-3xl font-bold">Subtítulo — Heading 2</h2>
        <h3 className="text-xl font-semibold">Sección — Heading 3</h3>
        <p className="text-base">
          Texto normal. Planes sencillos, gente cercana.
        </p>
        <p className="text-sm text-base-content/60">
          Texto secundario / descripción corta.
        </p>
      </section>

      {/* Botones */}
      <section className="flex flex-wrap gap-3">
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-accent">Accent</button>
        <button className="btn btn-neutral">Neutral</button>
        <button className="btn btn-outline btn-primary">Outline Primary</button>
        <button className="btn btn-outline btn-secondary">
          Outline Secondary
        </button>
        <button className="btn btn-ghost">Ghost</button>
        <button className="btn btn-error">Error</button>
      </section>

      {/* Badges */}
      <section className="flex flex-wrap gap-3">
        <span className="badge badge-primary">Aventura</span>
        <span className="badge badge-secondary">Cultura</span>
        <span className="badge badge-accent">Deporte</span>
        <span className="badge badge-neutral">Música</span>
        <span className="badge badge-outline">Gastronomía</span>
      </section>

      {/* Cards */}
      <section className="flex flex-wrap gap-6">
        {/* Card plan */}
        <div className="card bg-base-100 w-72 border border-base-300 shadow-[6px_6px_0px_#171718]">
          <div className="card-body">
            <h2 className="card-title">Ruta por la montaña</h2>
            <p className="text-sm text-base-content/70">
              Una ruta de senderismo por la Sierra de Tramuntana. Nivel medio.
            </p>
            <div className="flex gap-2 mt-2">
              <span className="badge badge-primary">Aventura</span>
              <span className="badge badge-outline">4 plazas</span>
            </div>
            <div className="card-actions mt-4">
              <button className="btn btn-primary btn-sm w-full">Unirme</button>
            </div>
          </div>
        </div>

        {/* Card usuario */}
        <div className="card bg-base-100 w-72 border border-base-300 shadow-[6px_6px_0px_#171718]">
          <div className="card-body items-center text-center">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-16">
                <span className="text-2xl">K</span>
              </div>
            </div>
            <h2 className="card-title">Kevin</h2>
            <p className="text-sm text-base-content/70">
              Le encanta el senderismo y la fotografía.
            </p>
            <div className="flex gap-2 mt-2">
              <span className="badge badge-secondary">Aventura</span>
              <span className="badge badge-accent">Foto</span>
            </div>
          </div>
        </div>
      </section>

      {/* Alert */}
      <section className="flex flex-col gap-3 max-w-md">
        <div role="alert" className="alert alert-success">
          <span>Plan creado correctamente.</span>
        </div>
        <div role="alert" className="alert alert-error">
          <span>No tienes permiso para editar este plan.</span>
        </div>
        <div role="alert" className="alert alert-warning">
          <span>Este plan caduca en 2 días.</span>
        </div>
      </section>

      {/* Input */}
      <section className="flex flex-col gap-3 max-w-md">
        <input
          type="text"
          placeholder="Buscar planes..."
          className="input input-bordered w-full"
        />
        <textarea
          placeholder="Describe tu plan..."
          className="textarea textarea-bordered w-full"
          rows={3}
        ></textarea>
      </section>

      <FeatureCard
        titulo="Planes que encajan contigo"
        descripcion="Descubre planes y personas según tus intereses."
      />
    </div>
  )
}

export default BasicosPage;