import BaseCard from "@/app/components/ui/BaseCard";

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-base-100 py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
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
          <BaseCard bgColor="#171718" textColor="#ff6b5a" className="rounded-2xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-2xl">Email</h2>
              <p>hello.planazo@gmail.com</p>
            </div>
          </BaseCard>

          <BaseCard bgColor="#7e7af3" className="rounded-2xl">
            <div className="card-body items-center text-center text-white">
              <h2 className="card-title text-2xl">Ubicación</h2>
              <p>Murcia, España</p>
            </div>
          </BaseCard>
        </section>
      </div>
    </main>
  );
}