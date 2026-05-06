import Link from "next/link";
import Avatar from "../../ui/Avatar";

type Props = {
  userId: number;
  nombre: string;
  username: string;
  avatar_url: string | null;
  size?: "sm" | "md";
};

const UsuarioMini = ({
  userId,
  nombre,
  username,
  avatar_url,
  size = "md",
}: Props) => {
  const nombreClase =
    size === "md" ? "text-lg font-semibold" : "font-medium";
  const usernameClase =
    size === "md" ? "text-xs opacity-70" : "text-xs font-semibold opacity-60";

  return (
    <Link
      href={`/usuario/${userId}`}
      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
    >
      <Avatar nombre={nombre} url={avatar_url} size={size} />
      <div className="flex flex-col">
        <span className={nombreClase}>{nombre}</span>
        <span className={usernameClase}>{`@${username}`}</span>
      </div>
    </Link>
  );
};

export default UsuarioMini;
