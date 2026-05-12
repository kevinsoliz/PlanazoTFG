import BaseCard from "@/app/components/ui/BaseCard";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-primary text-primary-content py-20 px-6">

      <div className="max-w-7xl mx-auto flex flex-col gap-20">

        {/* HERO */}
        <section className="text-center flex flex-col gap-6">
          <h1 className="text-5xl md:text-6xl font-bold">
            Sobre Planazo
          </h1>

          <p className="text-lg opacity-80 max-w-3xl mx-auto">
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

            <p className="opacity-90 leading-relaxed text-lg">
              Planazo surgió como una idea dentro del desarrollo
              de nuestro Trabajo de Fin de Grado. Detectamos que muchas personas
              quieren conocer gente nueva o realizar actividades diferentes,
              pero no saben dónde encontrar planes compatibles con sus gustos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <BaseCard textColor="#ffffff">
              <div className="card-body">
                <h3 className="card-title text-2xl">
                  Cómo nació
                </h3>

                <p>
                  La idea comenzó buscando una forma más sencilla y cercana
                  de organizar planes entre personas con intereses comunes.
                </p>
              </div>
            </BaseCard>

            <BaseCard textColor="#ffffff">
              <div className="card-body">
                <h3 className="card-title text-2xl">
                  El problema
                </h3>

                <p>
                  Muchas plataformas conectan personas digitalmente,
                  pero pocas fomentan experiencias reales fuera de la pantalla.
                </p>
              </div>
            </BaseCard>

            <BaseCard textColor="#ffffff">
              <div className="card-body">
                <h3 className="card-title text-2xl">
                  Evolución
                </h3>

                <p>
                  El proyecto fue creciendo desde una idea inicial hasta una
                  aplicación web moderna desarrollada con tecnologías actuales.
                </p>
              </div>
            </BaseCard>
          </div>
        </section>

        {/* EQUIPO */}
        <section className="flex flex-col gap-10">
          <h2 className="text-4xl font-bold text-center">
            Quiénes somos
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Kevin */}
            <BaseCard textColor="#ffffff">
              <div className="card-body items-center text-center">
                <div className="avatar">
                  <div className="w-20 rounded-full">
                    <Image src="/images/avatars/avatar-kevin.png" alt="Kevin" width={80} height={80} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold">
                  Kevin
                </h3>

                <p className="font-semibold opacity-70">
                  Full Stack Developer
                </p>

                <p className="text-sm opacity-70">
                  Desarrollé el MVP completo de la plataforma, desde el modelo
                  de datos hasta la interfaz, sentando la arquitectura sobre la
                  que el resto del equipo construyó sus funcionalidades.
                </p>
              </div>
            </BaseCard>

            {/* Sergio */}
            <BaseCard textColor="#ffffff">
              <div className="card-body items-center text-center">
                <div className="avatar">
                  <div className="w-20 rounded-full">
                    <Image src="/images/avatars/avatar-8.png" alt="Sergio" width={80} height={80} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold">
                  Sergio
                </h3>

                <p className="font-semibold opacity-70">
                  Full Stack Developer
                </p>

                <p className="text-sm opacity-70">
                  Implementé el sistema de chat entre los participantes de un
                  plan, permitiendo coordinar los detalles del encuentro antes
                  de la actividad.
                </p>
              </div>
            </BaseCard>

            {/* Thomas */}
            <BaseCard textColor="#ffffff">
              <div className="card-body items-center text-center">
                <div className="avatar">
                  <div className="w-20 rounded-full">
                    <Image src="/images/avatars/avatar-6.png" alt="Thomas" width={80} height={80} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold">
                  Thomas
                </h3>

                <p className="font-semibold opacity-70">
                  Full Stack Developer
                </p>

                <p className="text-sm opacity-70">
                  Desarrollé el sistema de valoraciones, que permite a los
                  participantes puntuarse entre sí tras un plan y refleja la
                  reputación de cada usuario en su perfil.
                </p>
              </div>
            </BaseCard>

            {/* Jaime */}
            <BaseCard textColor="#ffffff">
              <div className="card-body items-center text-center">
                <div className="avatar">
                  <div className="w-20 rounded-full">
                    <Image src="/images/avatars/avatar-3.png" alt="Jaime" width={80} height={80} />
                  </div>
                </div>

                <h3 className="text-2xl font-bold">
                  Jaime
                </h3>

                <p className="font-semibold opacity-70">
                  Frontend Developer
                </p>

                <p className="text-sm opacity-70">
                  Implementé las vistas informativas del proyecto: las secciones
                  de características, sobre nosotros y contacto, que acompañan
                  a la página de inicio.
                </p>
              </div>
            </BaseCard>

          </div>
        </section>

        {/* FILOSOFÍA */}
        <section>
          
            <div className="card-body flex flex-col gap-6">
              <h2 className="text-4xl font-bold">
                Nuestra filosofía
              </h2>

              <p className="text-lg leading-relaxed opacity-90">
                Creemos que la tecnología debe servir para acercar a las personas,
                no para alejarlas. Planazo busca unir conexiones reales,
                experiencias auténticas y momentos compartidos fuera de la rutina
                digital.
              </p>

              <p className="text-lg leading-relaxed opacity-90">
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