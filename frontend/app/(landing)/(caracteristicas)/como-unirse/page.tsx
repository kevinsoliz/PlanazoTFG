import { FaUsers, FaCompass, FaRegSmile, FaHeart } from "react-icons/fa";
import Link from "next/link";
export default function UnetePage() {
  return (
    <main className="min-h-screen bg-base-100 py-20 px-6">
      <div className="max-w-6xl mx-auto mb-8">
        <Link href="/" className="btn btn-outline">
          ← Volver al inicio
        </Link>
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-14">

        <section>
          <h1 className="text-5xl font-bold mb-6">
            Únete en un click
          </h1>

          <p className="text-lg text-base-content/70 max-w-3xl">
            Participar en un plan es rápido y sencillo. Nuestro objetivo es
            eliminar barreras y facilitar que cualquier persona pueda apuntarse
            fácilmente a nuevas experiencias.
          </p>
        </section>

        {/* Pasos */}
        <section className="grid md:grid-cols-4 gap-6">

          <div
            className="card text-dark rounded-2xl border border-black shadow-[10px_10px_0px_#111]"
            style={{ backgroundColor: "#7e7af3" }}
          >
            <div className="card-body items-center text-center">
              <h2 className="text-5xl font-bold">1</h2>
              <p>Explora planes</p>
            </div>
          </div>

          <div
              className="card rounded-2xl border border-black shadow-[10px_10px_0px_#111]"
              style={{ backgroundColor: "#FCD665" }}
            >
            <div className="card-body items-center text-center">
              <h2 className="text-5xl font-bold">2</h2>
              <p>Consulta detalles</p>
            </div>
          </div>

          <div
              className="card rounded-2xl border border-black shadow-[10px_10px_0px_#111]"
              style={{ backgroundColor: "#47CEBA" }}
            >
            <div className="card-body items-center text-center">
              <h2 className="text-5xl font-bold">3</h2>
              <p>Únete fácilmente</p>
            </div>
          </div>

          <div
            className="card text-[#ff6b5a] rounded-2xl border border-[#ff6b5a] shadow-[10px_10px_0px_#ff6b5a]"
            style={{ backgroundColor: "#171718" }}
          >
            <div className="card-body items-center text-center">
              <h2 className="text-5xl font-bold">4</h2>
              <p>Disfruta la experiencia</p>
            </div>
          </div>

        </section>

        {/* Beneficios */}
        <section className="card bg-base-200 shadow-xl">
          <div
              className="card rounded-2xl border border-black shadow-[10px_10px_0px_#111]"
            >
          <div className="card-body">
            <h2 className="text-3xl font-bold mb-4">
              ¿Por qué unirse?
            </h2>

            <ul className="space-y-3 text-lg">
              <li className="flex items-center gap-2">
                <FaUsers className="text-violet-500" />
                Conocer personas nuevas
              </li>

              <li className="flex items-center gap-2">
                <FaCompass className="text-violet-500" />
                Descubrir actividades diferentes
              </li>

              <li className="flex items-center gap-2">
                <FaRegSmile className="text-violet-500" />
                Salir de la rutina
              </li>

              <li className="flex items-center gap-2">
                <FaHeart className="text-violet-500" />
                Compartir intereses comunes
              </li>
            </ul>
          </div>
          </div>
        </section>

      </div>
    </main>
  );
}