import { TiHome } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import LogoutBtn from "../features/LogoutBtn";
import { UserProfile } from "@/app/types/user";

interface Props {
  perfil: UserProfile | null
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
      <article className=" flex w-full justify-between">
        <div className="flex flex-col items-center">
          <p className="font-bold">472</p>
          <p className="text-xs">Planes</p>
        </div>
        <p>|</p>
        <div className="flex flex-col items-center">
          <p className="font-bold">12.4k</p>
          <p className="text-xs">Followers</p>
        </div>
        <p>|</p>
        <div className="flex flex-col items-center">
          <p className="font-bold">228</p>
          <p className="text-xs">Following</p>
        </div>
      </article>
      <article className=" flex flex-wrap justify-center w-full gap-3">
        <span className="badge badge-sm badge-primary">Aventura</span>
        <span className="badge badge-sm badge-secondary">Cultura</span>
        <span className="badge badge-sm badge-accent">Deporte</span>
        <span className="badge badge-sm badge-neutral">Música</span>
        <span className="badge badge-sm badge-outline">Gastronomía</span>
      </article>
      <article className=" w-full">
        <legend className="text-sm font-bold mb-1">Story Higlights</legend>
        <div className="flex max-w-full overflow-x-auto scrollbar-hide gap-3">
          <section className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-neutral/80 flex justify-center items-center mt-2 text-neutral-content">
              K
            </div>
            <p className="text-center text-xs mt-1">Palabra</p>
          </section>
          <section className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-neutral/80 flex justify-center items-center mt-2 text-neutral-content">
              K
            </div>
            <p className="text-center text-xs mt-1">Palabra</p>
          </section>
          <section className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-neutral/80 flex justify-center items-center mt-2 text-neutral-content">
              K
            </div>
            <p className="text-center text-xs mt-1">Palabr</p>
          </section>
          <section className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-neutral/80 flex justify-center items-center mt-2 text-neutral-content">
              K
            </div>
            <p className="text-center text-xs mt-1">Palabra</p>
          </section>
          <section className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-neutral/80 flex justify-center items-center mt-2 text-neutral-content">
              K
            </div>
            <p className="text-center text-xs mt-1">Palabra</p>
          </section>
        </div>
      </article>
      <article className=" flex-1 flex flex-col gap-3 self-start">
        <div className=" flex items-center gap-2">
          <TiHome size={22} />
          <p className="font-bold">Feed</p>
        </div>
        <div className=" flex items-center gap-2">
          <IoSettingsOutline size={22}/>
          <p className="font-bold">Settings</p>
        </div>
        <div className="  flex items-center gap-2 mt-auto">
          <LogoutBtn/>
        </div>
      </article>
    </section>
  );
};

export default Sidebar;
