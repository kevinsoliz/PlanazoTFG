export default function PlanesParaTiPage() {
  return (
    <main className="min-h-screen bg-base-100 py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <h1 className="text-5xl font-bold">Planes que encajan contigo</h1>

        <p className="text-lg text-base-content/70">
          Descubre actividades adaptadas a tus gustos, intereses y estilo de vida.
          Desde deporte hasta cultura, siempre habrá un plan para ti.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Personalizado</h2>
              <p>Recomendaciones según tus intereses.</p>
            </div>
          </div>

          <div className="card bg-secondary text-secondary-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Cerca de ti</h2>
              <p>Encuentra planes en tu ciudad.</p>
            </div>
          </div>

          <div className="card bg-accent text-accent-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Siempre actualizado</h2>
              <p>Nuevos planes cada día.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}