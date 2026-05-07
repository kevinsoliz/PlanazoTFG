export default function CreaPlanPage() {
  return (
    <main className="min-h-screen bg-base-100 py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <h1 className="text-5xl font-bold">Crea tu propio plan</h1>

        <p className="text-lg text-base-content/70">
          ¿Tienes una idea? Publícala y encuentra personas que quieran vivirla contigo.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card bg-success text-success-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Publica</h2>
              <p>Crea tu evento en pocos pasos.</p>
            </div>
          </div>

          <div className="card bg-info text-info-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Comparte</h2>
              <p>Haz que otros usuarios puedan unirse.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}