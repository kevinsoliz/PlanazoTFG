import BaseCard from "@/app/components/ui/BaseCard";
export default function DescubrePage() {
  return (
    <main className="min-h-screen bg-base-100 py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-14">

        <section>
          <h1 className="text-5xl font-bold mb-6">
            Encuentra lo que te interesa
          </h1>

          <p className="text-lg text-base-content/70 max-w-3xl">
            Utiliza filtros y categorías para encontrar actividades adaptadas
            a tus gustos y preferencias.
          </p>
        </section>

        {/* Filtros */}
        <section className="grid md:grid-cols-3 gap-6">

          <BaseCard bgColor="#7e7af3" className="rounded-2xl">
            <div className="card-body">
              <h2 className="card-title">Categorías</h2>
              <p>Filtra por deporte, cultura, ocio y más.</p>
            </div>
          </BaseCard>

          <BaseCard bgColor="#FCD665" className="rounded-2xl">
            <div className="card-body">
              <h2 className="card-title">Ubicación</h2>
              <p>Encuentra planes cerca de tu zona.</p>
            </div>
          </BaseCard>

          <BaseCard bgColor="#47CEBA" className="rounded-2xl">
            <div className="card-body">
              <h2 className="card-title">Fecha</h2>
              <p>Busca actividades según el día disponible.</p>
            </div>
          </BaseCard>

        </section>

        {/* Tags */}
        <section className="card bg-base-200 shadow-xl">
          <BaseCard className="rounded-2xl">
            <div className="card-body">
              <h2 className="text-3xl font-bold mb-4">
                Actividades populares
              </h2>

              <div className="flex flex-wrap gap-3">
                <div className="badge badge-primary badge-lg">Aventura</div>
                <div className="badge badge-secondary badge-lg">Cultura</div>
                <div className="badge badge-accent badge-lg">Deporte</div>
                <div className="badge badge-success badge-lg">Música</div>
                <div className="badge badge-warning badge-lg">Viajes</div>
                <div className="badge badge-outline badge-lg">Escapadas</div>
                <div className="badge badge-warning badge-outline badge-lg">Naturaleza</div>
                <div className="badge badge-neutral badge-lg">Tecnología</div>
                <div className="badge badge-error badge-outline badge-lg">Cine</div>
              </div>
            </div>
          </BaseCard>
        </section>
      </div>
    </main>
  );
}