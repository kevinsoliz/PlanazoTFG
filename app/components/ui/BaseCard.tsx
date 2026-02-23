interface Props {
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const BaseCard = ({ children, bgColor, textColor = "#171718", className = "" }: Props) => {
  return (
    <div
      className={`card border w-full max-w-3xl ${className}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderColor: textColor,
        borderWidth: "2px",
        boxShadow: `6px 6px 0px ${textColor}`,
      }}
    >
      {children}
    </div>
  );
};

export default BaseCard;