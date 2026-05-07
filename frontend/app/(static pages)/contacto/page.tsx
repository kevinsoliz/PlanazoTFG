export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-base-100 py-20 px-6">
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
        <section className="grid md:grid-cols-3 gap-6">
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl">Email</h2>
              <p>contacto@planazo.com</p>
            </div>
          </div>

          <div className="card bg-secondary text-secondary-content shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl">Teléfono</h2>
              <p>+34 600 123 456</p>
            </div>
          </div>

          <div className="card bg-accent text-accent-content shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl">Ubicación</h2>
              <p>Murcia, España</p>
            </div>
          </div>
        </section>

        {/* Formulario visual */}
        <section className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="text-3xl font-bold mb-4">Envíanos un mensaje</h2>

            <div className="grid gap-4">
              <input
                type="text"
                placeholder="Tu nombre"
                className="input input-bordered w-full"
              />

              <input
                type="email"
                placeholder="Tu email"
                className="input input-bordered w-full"
              />

              <textarea
                placeholder="Escribe tu mensaje..."
                className="textarea textarea-bordered w-full h-32"
              />

              <button className="btn btn-primary w-fit">
                Enviar mensaje
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}