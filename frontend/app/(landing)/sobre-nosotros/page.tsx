import Link from "next/link";
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-base-100 py-20 px-6">

      <div className="max-w-6xl mx-auto mb-8">
        <Link href="/" className="btn btn-outline">
          ← Volver al inicio
        </Link>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-20">

        {/* HERO */}
        <section className="text-center flex flex-col gap-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            Sobre Planazo
          </h1>

          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            Planazo nace con la idea de ayudar a las personas a descubrir
            actividades, compartir experiencias y conectar con gente con
            intereses similares de una forma sencilla y cercana.
          </p>
        </section>

        {/* HISTORIA */}
        <section className="flex flex-col gap-8">
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Historia del proyecto
            </h2>

            <p className="text-base-content/80 leading-relaxed text-lg">
              Planazo surgió como una idea dentro del desarrollo
              de nuestro Trabajo de Fin de Grado. Detectamos que muchas personas
              quieren conocer gente nueva o realizar actividades diferentes,
              pero no saben dónde encontrar planes compatibles con sus gustos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
          <div
            className="card text-dark rounded-2xl border border-black shadow-[10px_10px_0px_#111]"
            style={{ backgroundColor: "#7e7af3" }}
          >             
            <div className="card-body">
                <h3 className="card-title text-2xl">
                  Cómo nació
                </h3>

                <p>
                  La idea comenzó buscando una forma más sencilla y cercana
                  de organizar planes entre personas con intereses comunes.
                </p>
              </div>
            </div>

            <div
              className="card rounded-2xl border border-black shadow-[10px_10px_0px_#111]"
              style={{ backgroundColor: "#FCD665" }}
            >
              <div className="card-body">
                <h3 className="card-title text-2xl">
                  El problema
                </h3>

                <p>
                  Muchas plataformas conectan personas digitalmente,
                  pero pocas fomentan experiencias reales fuera de la pantalla.
                </p>
              </div>
            </div>

            <div
              className="card rounded-2xl border border-black shadow-[10px_10px_0px_#111]"
              style={{ backgroundColor: "#47CEBA" }}
            >
              <div className="card-body">
                <h3 className="card-title text-2xl">
                  Evolución
                </h3>

                <p>
                  El proyecto fue creciendo desde una idea inicial hasta una
                  aplicación web moderna desarrollada con tecnologías actuales.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* EQUIPO */}
        <section className="flex flex-col gap-10">
          <h2 className="text-4xl font-bold text-center">
            Quiénes somos
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Kevin */}
            <div
              className="card rounded-2xl border border-black shadow-[10px_10px_0px_#111]"
            >
              <div className="card-body items-center text-center">
                <div className="avatar placeholder">
                  <div style={{ backgroundColor: "#928EF5" }} className="text-white rounded-full w-20">
                    <span className="text-2xl">K</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold">
                  Kevin
                </h3>

                <p className="font-semibold opacity-70">
                  Full Stack Developer
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                  <div className="badge" style={{ backgroundColor: "#928EF5", color: "white" }}>Frontend</div>
                  <div className="badge" style={{ backgroundColor: "#FCD665" }}>Backend</div>
                  <div className="badge" style={{ backgroundColor: "#47CEBA" }}>UI/UX</div>
                </div>

                <p className="text-sm opacity-70">
                  Participó en distintas áreas del proyecto, colaborando tanto en frontend
                  como backend y diseño general de la aplicación.
                </p>
              </div>
            </div>

            {/* Sergio */}
            <div
              className="card rounded-2xl border border-black shadow-[10px_10px_0px_#111]"
            >
              <div className="card-body items-center text-center">
                <div className="avatar placeholder">
                  <div style={{ backgroundColor: "#FCD665" }} className="rounded-full w-20">
                    <span className="text-2xl text-black">S</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold">
                  Sergio
                </h3>

                <p className="font-semibold opacity-70">
                  Full Stack Developer
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                  <div className="badge" style={{ backgroundColor: "#928EF5", color: "white" }}>Node.js</div>
                  <div className="badge" style={{ backgroundColor: "#FCD665" }}>React</div>
                  <div className="badge" style={{ backgroundColor: "#47CEBA" }}>TypeScript</div>
                </div>

                <p className="text-sm opacity-70">
                  Colaboró en parte del desarrollo de la plataforma, trabajando en múltiples
                  partes del proyecto.
                </p>
              </div>
            </div>

            {/* Thomas */}
            <div
              className="card rounded-2xl border border-black shadow-[10px_10px_0px_#111]"
            >
              <div className="card-body items-center text-center">
                <div className="avatar placeholder">
                  <div style={{ backgroundColor: "#47CEBA" }} className="rounded-full w-20">
                    <span className="text-2xl text-black">T</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold">
                  Thomas
                </h3>

                <p className="font-semibold opacity-70">
                  Full Stack Developer
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                  <div className="badge" style={{ backgroundColor: "#928EF5", color: "white" }}>Node.js</div>
                  <div className="badge" style={{ backgroundColor: "#FCD665" }}>React</div>
                  <div className="badge" style={{ backgroundColor: "#47CEBA" }}>TypeScript</div>
                </div>

                <p className="text-sm opacity-70">
                  Participó en distintas tareas técnicas del proyecto, ayudando en el
                  desarrollo de la aplicación.
                </p>
              </div>
            </div>

            {/* Jaime */}
            <div
              className="card rounded-2xl border border-black shadow-[10px_10px_0px_#111]"
            >
              <div className="card-body items-center text-center">
                <div className="avatar placeholder">
                  <div style={{ backgroundColor: "#171718" }} className="rounded-full  w-20 text-white">
                    <span className="text-2xl">J</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold">
                  Jaime
                </h3>

                <p className="font-semibold opacity-70">
                  Frontend Developer
                </p>

                <div className="flex flex-wrap justify-center gap-2">
                  <div className="badge" style={{ backgroundColor: "#928EF5", color: "white" }}>React</div>
                  <div className="badge" style={{ backgroundColor: "#FCD665" }}>Next.js</div>
                  <div className="badge" style={{ backgroundColor: "#47CEBA" }}>Tailwind</div>
                </div>

                <p className="text-sm opacity-70">
                  Colaboró en el desarrollo frontend y de la experiencia visual
                  de la aplicación.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* FILOSOFÍA */}
        <section className="rounded-2xl border border-black shadow-[10px_10px_0px_#111]">
          <div className="card-body flex flex-col gap-6">
            <h2 className="text-4xl font-bold">
              Nuestra filosofía
            </h2>

            <p className="text-lg leading-relaxed text-base-content/80">
              Creemos que la tecnología debe servir para acercar a las personas,
              no para alejarlas. Planazo busca unir conexiones reales,
              experiencias auténticas y momentos compartidos fuera de la rutina
              digital.
            </p>

            <p className="text-lg leading-relaxed text-base-content/80">
              Nuestro objetivo es ayudar a reducir el aislamiento social y
              facilitar que cualquier persona pueda encontrar actividades,
              amistades y experiencias que realmente encajen con sus intereses.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}