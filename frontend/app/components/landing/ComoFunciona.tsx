// Sección "Cómo funciona" — 3 mockup-phone con capturas mobile
// que ilustran el flujo de uso de la app.

import Image from "next/image";
import Logo from "../ui/Logo";

type Paso = {
  titulo: string;
  descripcion: string;
  imagen: string | null;
};

const PASOS: Paso[] = [
  {
    titulo: "Descubre planes",
    descripcion:
      "Mira qué se cuece cerca de ti. Filtra por categoría y encuentra lo que te apetece.",
    imagen: "/images/landing/como-funciona/paso1.png",
  },
  {
    titulo: "Únete o crea el tuyo",
    descripcion:
      "Apúntate a un plan con un click o monta el tuyo en menos de un minuto.",
    imagen: "/images/landing/como-funciona/paso2.png",
  },
  {
    titulo: "Vive el plan",
    descripcion:
      "Conecta con gente que comparte tus intereses. Lo importante pasa fuera de la pantalla.",
    imagen: "/images/landing/como-funciona/paso3.png",
  },
];

const ComoFunciona = () => {
  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-12">
        <h2 className="text-4xl font-bold text-center flex flex-wrap justify-center items-baseline gap-x-3">
          Así de fácil es montar un <Logo color="text-neutral" />
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 place-items-center">
          {PASOS.map((paso, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 max-w-xs"
            >
              <div className="mockup-phone scale-75 origin-top -mb-36">
                <div className="mockup-phone-camera"></div>
                <div className="mockup-phone-display bg-base-100">
                  {paso.imagen ? (
                    <Image
                      src={paso.imagen}
                      alt={paso.titulo}
                      width={320}
                      height={568}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="grid place-content-center h-full text-base-content/40 text-sm">
                      Captura {i + 1}
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-bold text-center">{paso.titulo}</h3>
              <p className="text-center text-base-content/70">
                {paso.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComoFunciona;
