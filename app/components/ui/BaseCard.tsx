interface Props {
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const BaseCard = ({ children, bgColor, textColor = "#171718", className = "" }: Props) => {
  return (
    <div
      className={`card w-full max-w-md mx-auto ${className}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderColor: textColor,
        borderWidth: "1px",
        boxShadow: `6px 6px 0px ${textColor}`,
      }}
    >
      {children}
    </div>
  );
};

export default BaseCard;