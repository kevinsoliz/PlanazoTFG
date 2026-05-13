import Link from "next/link";
import BaseCard from "../ui/BaseCard";

interface Props {
  titulo: string;
  descripcion: string;
  imagen: string;
  ruta: string;
  invertido?: boolean;
  bgColor?: string;
  textColor?: string;
}

// Tarjeta de una de las features de la landing: imagen + título + descripción + enlace.
const FeatureCard = ({
  titulo,
  descripcion,
  imagen,
  ruta,
  invertido = false,
  bgColor,
  textColor,
}: Props) => {
  return (
    <BaseCard bgColor={bgColor} textColor={textColor}>
      <div
        className={`card-body flex flex-col md:flex-row ${
          invertido ? "md:flex-row-reverse" : ""
        } gap-4 items-center justify-center`}
      >
        <div className="w-40 shrink-0">
          <img src={imagen} alt={titulo} className="w-full h-auto" />
        </div>

        <div className="w-full md:flex-1 flex flex-col gap-4">
          <h3 className="card-title text-3xl">{titulo}</h3>
          <p className="text-sm opacity-70">{descripcion}</p>

          <Link href={ruta} className="link font-semibold">
            Saber más →
          </Link>
        </div>
      </div>
    </BaseCard>
  );
};

export default FeatureCard;