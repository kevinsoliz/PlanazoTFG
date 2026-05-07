export default function AboutPage() {
  return (
    <main className="min-h-screen bg-base-100 py-20 px-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        {/* Título */}
        <section className="text-center">
          <h1 className="text-5xl font-bold mb-4">Sobre Planazo</h1>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            Planazo es una plataforma diseñada para ayudar a las personas a
            descubrir actividades, crear planes y conectar con gente que comparte
            sus mismos intereses.
          </p>
        </section>

        {/* Qué hacemos */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="card bg-primary text-primary-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl">Descubre</h2>
              <p>
                Encuentra planes adaptados a tus gustos: deporte, ocio, cultura,
                gastronomía y mucho más.
              </p>
            </div>
          </div>

          <div className="card bg-secondary text-secondary-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl">Conecta</h2>
              <p>
                Conoce personas con aficiones parecidas y crea nuevas amistades
                a través de experiencias compartidas.
              </p>
            </div>
          </div>

          <div className="card bg-accent text-accent-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl">Comparte</h2>
              <p>
                Organiza tus propios planes y haz que otros usuarios puedan
                unirse fácilmente.
              </p>
            </div>
          </div>
        </section>

        {/* Misión */}
        <section className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="text-3xl font-bold mb-2">Nuestra misión</h2>
            <p className="text-base-content/80 leading-relaxed">
              Queremos facilitar que las personas salgan de la rutina,
              descubran nuevas actividades y conecten con otras de forma
              sencilla, cercana y auténtica. Porque muchas veces, un buen plan
              empieza con conocer a la persona adecuada.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}