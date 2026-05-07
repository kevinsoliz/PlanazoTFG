export default function DescubrePage() {
  return (
    <main className="min-h-screen bg-base-100 py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <h1 className="text-5xl font-bold">Encuentra lo que te interesa</h1>

        <p className="text-lg text-base-content/70">
          Filtra planes por categoría, fecha o ubicación para encontrar exactamente
          lo que buscas.
        </p>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <div className="flex flex-wrap gap-3">
              <span className="badge badge-primary badge-lg">Deporte</span>
              <span className="badge badge-secondary badge-lg">Cultura</span>
              <span className="badge badge-accent badge-lg">Música</span>
              <span className="badge badge-success badge-lg">Viajes</span>
              <span className="badge badge-warning badge-lg">Naturaleza</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}