import { FaUsers, FaCompass, FaRegSmile, FaHeart } from "react-icons/fa";
import BaseCard from "@/app/components/ui/BaseCard";
export default function UnetePage() {
  return (
    <main className="min-h-screen bg-base-100 py-20 px-6">
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

          <BaseCard bgColor="#7e7af3" className="rounded-2xl">
            <div className="card-body items-center text-center">
              <h2 className="text-5xl font-bold">1</h2>
              <p>Explora planes</p>
            </div>
          </BaseCard>

          <BaseCard bgColor="#FCD665" className="rounded-2xl">
            <div className="card-body items-center text-center">
              <h2 className="text-5xl font-bold">2</h2>
              <p>Consulta detalles</p>
            </div>
          </BaseCard>

          <BaseCard bgColor="#47CEBA" className="rounded-2xl">
            <div className="card-body items-center text-center">
              <h2 className="text-5xl font-bold">3</h2>
              <p>Únete fácilmente</p>
            </div>
          </BaseCard>

          <BaseCard bgColor="#171718" textColor="#ff6b5a" className="rounded-2xl">
            <div className="card-body items-center text-center">
              <h2 className="text-5xl font-bold">4</h2>
              <p>Disfruta la experiencia</p>
            </div>
          </BaseCard>

        </section>

        {/* Beneficios */}
        <section className="card bg-base-200 shadow-xl">
          <BaseCard className="rounded-2xl">
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
          </BaseCard>
        </section>

      </div>
    </main>
  );
}