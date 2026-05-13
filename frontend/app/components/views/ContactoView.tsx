import BaseCard from "@/app/components/ui/BaseCard";
import { FiMail, FiMapPin, FiClock } from "react-icons/fi";

// Vista de contacto: la usan /contacto (landing) y /soporte (zona privada). Por eso vive en views/ y no en pages.
const ContactoView = () => {
  return (
    <main className="min-h-screen text-neutral py-20 px-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-16">

        {/* Título */}
        <section className="text-center flex flex-col gap-4">
          <h1 className="text-5xl md:text-6xl font-bold">
            Contacto
          </h1>

          <p className="text-lg opacity-70 max-w-xl mx-auto">
            ¿Tienes una duda o sugerencia? Estamos al otro lado.
          </p>
        </section>

        {/* Datos */}
        <section className="grid md:grid-cols-3 gap-6">

          <BaseCard>
            <div className="card-body items-center text-center gap-3">
              <FiMail size={32} />

              <p className="text-sm uppercase tracking-widest opacity-60">
                Email
              </p>

              <p className="font-semibold">
                hello.planazo@gmail.com
              </p>
            </div>
          </BaseCard>

          <BaseCard>
            <div className="card-body items-center text-center gap-3">
              <FiMapPin size={32} />

              <p className="text-sm uppercase tracking-widest opacity-60">
                Ubicación
              </p>

              <p className="font-semibold">
                Murcia, España
              </p>
            </div>
          </BaseCard>

          <BaseCard>
            <div className="card-body items-center text-center gap-3">
              <FiClock size={32} />

              <p className="text-sm uppercase tracking-widest opacity-60">
                Horario
              </p>

              <p className="font-semibold">
                L – V · 9 a 18h
              </p>
            </div>
          </BaseCard>

        </section>

      </div>
    </main>
  );
};

export default ContactoView;
