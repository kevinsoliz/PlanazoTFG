import Link from "next/link";

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-base-100 py-20 px-6">
      <div className="max-w-6xl mx-auto mb-8">
        <Link href="/" className="btn btn-outline">
          ← Volver al inicio
        </Link>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Título */}
        <section className="text-center">
          <h1 className="text-5xl font-bold mb-4">Contacto</h1>

          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            ¿Tienes alguna duda, sugerencia o propuesta para mejorar Planazo?
            Puedes ponerte en contacto con nosotros.
          </p>
        </section>

        {/* Tarjetas de contacto */}
        <section className="grid md:grid-cols-2 gap-6">
          <div
            className="card text-[#ff6b5a] rounded-2xl border border-[#ff6b5a] shadow-[10px_10px_0px_#ff6b5a]"
            style={{ backgroundColor: "#171718" }}
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl">Email</h2>
              <p>hello.planazo@gmail.com</p>
            </div>
          </div>

          <div
            className="card text-white rounded-2xl border border-black shadow-[10px_10px_0px_#111]"
            style={{ backgroundColor: "#7e7af3" }}
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl">Ubicación</h2>
              <p>Murcia, España</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}