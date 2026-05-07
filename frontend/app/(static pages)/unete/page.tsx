export default function UnetePage() {
  return (
    <main className="min-h-screen bg-base-100 py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <h1 className="text-5xl font-bold">Únete en un click</h1>

        <p className="text-lg text-base-content/70">
          Ver un plan interesante y apuntarte es rápido, sencillo y sin complicaciones.
        </p>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <ul className="space-y-3 text-lg">
              <li>✅ Busca un plan</li>
              <li>✅ Consulta fecha y lugar</li>
              <li>✅ Pulsa "Unirme"</li>
              <li>✅ Conoce gente nueva</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}