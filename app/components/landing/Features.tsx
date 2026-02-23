import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-8">
        <h2 className="text-4xl font-bold text-center">
          ¿Qué puedes hacer en Planazo?
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FeatureCard
            titulo="Planes que encajan contigo"
            descripcion="Descubre planes y personas según tus intereses. Menos buscar, más disfrutar."
            bgColor="#928EF5"
            imagen="/images/amigo1.png"
          />

          <FeatureCard
            titulo="Únete en un click"
            descripcion="Ver un plan que te mola y unirte es así de fácil. Sin formularios, sin complicaciones."
            bgColor="#FCD665"
            imagen="/images/amigo2.png"
            invertido
          />

          <FeatureCard
            titulo="Crea tu propio plan"
            descripcion="¿Tienes una idea? Compártela con la comunidad y encuentra gente con ganas de vivir lo mismo."
            bgColor="#47CEBA"
            imagen="/images/amigo3.png"
            invertido
          />
          <FeatureCard
            titulo="Encuentra lo que te interesa"
            descripcion="Filtra planes por categoría, fecha o ubicación. Encuentra exactamente lo que buscas sin perder tiempo."
            bgColor="#171718"
            textColor="#E0604D"
            imagen="/images/amigo4.png"
            invertido
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
