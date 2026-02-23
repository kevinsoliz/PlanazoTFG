import BaseCard from "../ui/BaseCard";

interface Props {
  titulo: string;
  descripcion: string;
  imagen?: string;
  invertido?: boolean;
}

const FeatureCard = ({ titulo, descripcion, imagen, invertido = false }: Props) => {
  return (
    <BaseCard bgColor="var(--color-neutral)" textColor="#E0604D">
      <div className={`card-body flex flex-col md:flex-row ${invertido ? "md:flex-row-reverse" : ""} gap-8 items-center`}>
        <div className="w-full md:w-1/2">
          {imagen ? (
            <img src={imagen} alt={titulo} className="w-full rounded-xl" />
          ) : (
            <div className="w-full h-64 bg-base-200 rounded-xl flex items-center justify-center">
              <span className="text-sm opacity-40">Imagen placeholder</span>
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h3 className="card-title text-3xl">{titulo}</h3>
          <p className="text-lg opacity-70">{descripcion}</p>
          <a href="#" className="link font-semibold">Saber más →</a>
        </div>
      </div>
    </BaseCard>
  );
};

export default FeatureCard;
