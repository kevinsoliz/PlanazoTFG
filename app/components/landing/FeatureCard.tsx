interface Props {
  titulo: string;
  descripcion: string;
  imagen?: string;
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
    <div
      className="card border w-full max-w-3xl"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderColor: textColor,
        boxShadow: `6px 6px 0px ${textColor}`,
        borderWidth: "2px",
      }}
    >
      <div
        className={`card-body flex flex-col md:flex-row ${invertido ? "md:flex-row-reverse" : ""} gap-8 items-center`}
      >
        {/* Imagen */}
        <div className="w-full md:w-1/2">
          {imagen ? (
            <img src={imagen} alt={titulo} className="w-full rounded-xl" />
          ) : (
            <div className="w-full h-64 bg-base-200 rounded-xl flex items-center justify-center">
              <span className="text-sm opacity-40">Imagen placeholder</span>
            </div>
          )}
        </div>

        {/* Texto */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h3 className="card-title text-3xl">{titulo}</h3>
          <p className="text-lg opacity-70">{descripcion}</p>
          <a href="#" className="link font-semibold">
            Saber más →
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
