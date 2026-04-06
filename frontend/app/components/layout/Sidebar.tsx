import { TiHome } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import LogoutBtn from "../features/LogoutBtn";
import { UserProfile } from "@/app/types/user";
import { CATEGORIAS } from "@/app/constants/categorias";

interface Props {
  perfil: UserProfile;
}

const Sidebar = ({ perfil }: Props) => {
  const userCategorias = perfil.categorias ? perfil.categorias.split(",") : [];
  return (
    <section className="flex-1 flex flex-col items-center py-4 pl-5 pr-9 gap-7">
      <header className=" flex flex-col items-center gap-1">
        <div className="w-20 h-20 rounded-full bg-neutral/80 flex justify-center items-center mt-8 text-neutral-content">
          K
        </div>
        <span>
          <p className="text-md text-center font-bold">{perfil.nombre}</p>
          <p className="text-xs text-center text-neutral/50">{`@${perfil.username}`}</p>
        </span>
      </header>

      <article className=" flex flex-wrap justify-center w-full gap-3">
        {CATEGORIAS
        .filter((cat) => userCategorias.includes(cat.name))
        .map(
          (cat) => (
            <span key={cat.name} className={`badge badge-sm ${cat.badge}`}>
              {cat.name}
            </span>
          ),
        )}
      </article>
      <article className="flex w-full">
        <p className="text-sm">{perfil.descripcion}</p>
      </article>

      <article className=" flex-1 flex flex-col gap-3 self-start">
        <div className=" flex items-center gap-2">
          <TiHome size={22} />
          <p className="font-bold">Feed</p>
        </div>
        <div className=" flex items-center gap-2">
          <IoSettingsOutline size={22} />
          <p className="font-bold">Settings</p>
        </div>
        <div className="  flex items-center gap-2 mt-auto">
          <LogoutBtn />
        </div>
      </article>
    </section>
  );
};

export default Sidebar;
