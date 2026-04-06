import { TiHome } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import LogoutBtn from "../features/LogoutBtn";
import { UserProfile } from "@/app/types/user";

interface Props {
  perfil: UserProfile | null;
}

const Sidebar = ({ perfil }: Props) => {
  return (
    <section className="flex-1 flex flex-col items-center py-4 pl-5 pr-9 gap-7">
      <header className=" flex flex-col items-center gap-1">
        <div className="w-20 h-20 rounded-full bg-neutral/80 flex justify-center items-center mt-8 text-neutral-content">
          K
        </div>
        <span>
          <p className="text-md text-center font-bold">Kevin Soliz</p>
          <p className="text-xs text-center text-neutral/50">@kevin_soliz</p>
        </span>
      </header>

      <article className=" flex flex-wrap justify-center w-full gap-3">
        <span className="badge badge-sm badge-primary">Aventura</span>
        <span className="badge badge-sm badge-secondary">Cultura</span>
        <span className="badge badge-sm badge-accent">Deporte</span>
        <span className="badge badge-sm badge-neutral">Música</span>
        <span className="badge badge-sm badge-outline">Gastronomía</span>
      </article>
      <article className="flex w-full">
        <p className="text-sm">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam
          molestias assumenda sequi ipsam nisi accusamus doloremque, earum est
          veritatis repellendus fugit iure eum molestiae, numquam quasi.
        </p>
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
