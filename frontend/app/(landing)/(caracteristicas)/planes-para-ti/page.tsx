import BaseCard from "@/app/components/ui/BaseCard";

export default function PlanesParaTiPage() {
  return (
    <main className="min-h-screen bg-base-100 py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">

        {/* Hero */}
        <section className="flex flex-col gap-6">
          <h1 className="text-5xl font-bold">
            Planes que encajan contigo
          </h1>

          <p className="text-lg text-base-content/70 max-w-3xl">
            Descubre actividades adaptadas a tus gustos, intereses y estilo
            de vida. Desde deporte hasta cultura, siempre habrá algo para ti.
          </p>
        </section>

        {/* Ventajas */}
        <section className="grid md:grid-cols-3 gap-6">

          <BaseCard bgColor="#928EF5">
            <div className="card-body">
              <h2 className="card-title text-2xl">Personalización</h2>
              <p>
                Encuentra recomendaciones basadas en tus intereses y actividades favoritas.
              </p>
            </div>
          </BaseCard>

          <BaseCard bgColor="#FCD665">
            <div className="card-body">
              <h2 className="card-title text-2xl">Planes cercanos</h2>
              <p>
                Descubre eventos y actividades organizadas cerca de tu ubicación.
              </p>
            </div>
          </BaseCard>

          <BaseCard bgColor="#47CEBA">
            <div className="card-body">
              <h2 className="card-title text-2xl">Experiencias reales</h2>
              <p>
                Conecta con personas con intereses similares y comparte experiencias auténticas.
              </p>
            </div>
          </BaseCard>

        </section>

        {/* Categorias */}
        <section className="card bg-base-200 shadow-xl">
          <BaseCard>
            <div className="card-body">
              <h2 className="text-3xl font-bold mb-4">
                Categorías disponibles
              </h2>

              <div className="flex flex-wrap gap-3">
                <div className="badge badge-primary badge-lg">Deporte</div>
                <div className="badge badge-secondary badge-lg">Cultura</div>
                <div className="badge badge-accent badge-lg">Música</div>
                <div className="badge badge-success badge-lg">Viajes</div>
                <div className="badge badge-warning badge-lg">Naturaleza</div>
                <div className="badge badge-info badge-lg">Gaming</div>
              </div>
            </div>
          </BaseCard>
        </section>

      </div>
    </main>
  );
}