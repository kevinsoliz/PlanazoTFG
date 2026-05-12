import { FaMapMarkerAlt, FaClock, FaPen, FaBullseye } from "react-icons/fa";
import Link from "next/link";
export default function CreaPlanPage() {
  return (
    <main className="min-h-screen bg-base-100 py-20 px-6">
      <div className="max-w-6xl mx-auto mb-8">
        <Link href="/" className="btn btn-outline">
          ← Volver al inicio
        </Link>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-14">

        <section>
          <h1 className="text-5xl font-bold mb-6">
            Crea tu propio plan
          </h1>

          <p className="text-lg text-base-content/70 max-w-3xl">
            Organiza actividades fácilmente y encuentra personas interesadas
            en compartir la experiencia contigo.
          </p>
        </section>

        {/* Cards */}
        <section className="grid md:grid-cols-2 gap-8">

          <div
            className="card text-dark rounded-2xl border border-black shadow-[10px_10px_0px_#111]"
            style={{ backgroundColor: "#7e7af3" }}
          >
            <div className="card-body">
              <h2 className="card-title text-3xl">
                Publica tu idea
              </h2>

              <p>
                Añade título, descripción, ubicación y fecha para crear un nuevo plan.
              </p>
            </div>
          </div>

          <div
              className="card rounded-2xl border border-black shadow-[10px_10px_0px_#111]"
              style={{ backgroundColor: "#FCD665" }}
            >
            <div className="card-body">
              <h2 className="card-title text-3xl">
                Encuentra participantes
              </h2>

              <p>
                Otros usuarios podrán descubrir tu plan y unirse rápidamente.
              </p>
            </div>
          </div>

        </section>

        {/* Consejos */}
        <section className="card bg-base-200 shadow-xl">
          <div
              className="card rounded-2xl border border-black shadow-[10px_10px_0px_#111]"
            >
          <div className="card-body">
            <h2 className="text-3xl font-bold mb-4">
              Consejos para crear un buen plan
            </h2>

            <ul className="space-y-3 text-lg">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-violet-500" />
                Escoge una ubicación clara
              </li>

              <li className="flex items-center gap-2">
                <FaClock className="text-violet-500" />
                Define fecha y hora
              </li>

              <li className="flex items-center gap-2">
                <FaPen className="text-violet-500" />
                Describe bien la actividad
              </li>

              <li className="flex items-center gap-2">
                <FaBullseye className="text-violet-500" />
                Indica el tipo de experiencia
              </li>
            </ul>
          </div>
          </div>
        </section>

      </div>
    </main>
  );
}