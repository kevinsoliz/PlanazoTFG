interface Props {
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
  className?: string;
  boxShadow?: string;
}

const BaseCard = ({ children, bgColor, textColor = "#171718", boxShadow = "6px 6px 0px", className = "" }: Props) => {
  return (
    <div
      className={`card w-full max-w-md mx-auto ${className}`}
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