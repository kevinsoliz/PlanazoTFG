interface Props {
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  className?: string;
  boxShadow?: string;
}

// Tarjeta base con borde y sombra desplazada. Reutilizable por las features (planes, valoraciones, etc.).
const BaseCard = ({ children, bgColor, textColor = "#171718", boxShadow = "6px 6px 0px", className = "" }: Props) => {
  return (
    <div
      className={`card w-full  mx-auto ${className}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderColor: textColor,
        borderWidth: "1px",
        boxShadow: `${boxShadow} ${textColor}`,
      }}
    >
      {children}
    </div>
  );
};

export default BaseCard;