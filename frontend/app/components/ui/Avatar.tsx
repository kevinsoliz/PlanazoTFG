type Props = {
  nombre: string;
  url: string | null;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "w-10 h-10 text-sm",
  md: "w-16 h-16 text-xl",
  lg: "w-24 h-24 text-3xl",
};

const Avatar = ({ nombre, url, size = "md" }: Props) => {
  const dimensiones = sizeClasses[size];

  if (url) {
    return (
      <img
        src={url}
        alt="Avatar"
        className={`${dimensiones} object-cover`}
      />
    );
  }

  return (
    <div
      className={`${dimensiones} bg-neutral/80 flex justify-center items-center font-bold text-neutral-content`}
    >
      {nombre[0]?.toUpperCase() ?? "?"}
    </div>
  );
};

export default Avatar;
