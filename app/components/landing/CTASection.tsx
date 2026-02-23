import Link from "next/link";

const CTASection = () => {
  return (
    <section className="w-full bg-primary py-20 pb-0">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6 text-center">
        <h2 className="text-4xl font-bold text-primary-content">
          ¿Tus amigos no pueden? No pasa nada!
        </h2>
        <p className="text-lg text-primary-content/80 max-w-md">
          Crea tu plan, compártelo y encuentra gente con tus mismos gustos.
          Siempre hay alguien con ganas de lo mismo que tú.
        </p>
        <Link href="/login" className="btn btn-neutral btn-lg">
          Empezar ahora
        </Link>
      </div>
      <img src="/images/amigosCTA.png" alt="" className="w-full block mt-10" />
    </section>
  );
};

export default CTASection;
