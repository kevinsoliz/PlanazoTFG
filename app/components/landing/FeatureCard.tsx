import BaseCard from "../ui/BaseCard";

interface Props {
  titulo: string;
  descripcion: string;
  imagen: string;
  invertido?: boolean;
  bgColor?: string;
  textColor?: string;
}

const FeatureCard = ({
  titulo,
  descripcion,
  imagen,
  invertido = false,
  bgColor,
  textColor,
}: Props) => {
  return (
    <BaseCard bgColor={bgColor} textColor={textColor}>
      <div
        className={`card-body flex flex-col md:flex-row ${invertido ? "md:flex-row-reverse" : ""} gap-4 items-center justify-center`}
      >
        <div className="w-40 shrink-0">
          <img src={imagen} alt={titulo} className="w-full h-auto" />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h3 className="card-title text-3xl">{titulo}</h3>
          <p className="text-sm opacity-70">{descripcion}</p>
          <a href="#" className="link font-semibold">
            Saber más →
          </a>
        </div>
      </div>
    </BaseCard>
  );
};

export default FeatureCard;
