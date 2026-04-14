import { TiHome } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import LogoutBtn from "../features/LogoutBtn";
import { UserProfile } from "@/app/types/user";
import Perfil from "@/app/(app)/perfil/page";

interface Props {
  perfil: UserProfile;
}

const Sidebar = ({ perfil }: Props) => {

  return (
    <section className="flex-1 flex flex-col items-center py-4  pr-5 gap-7">
      <Perfil/>
      <article className=" flex-1 flex flex-col gap-3 self-start">
        <div className=" flex items-center gap-2">
          <TiHome size={22} className="text-base-100"/>
          <p className="font-bold text-base-100">Feed</p>
        </div>
        <div className=" flex items-center gap-2">
          <IoSettingsOutline size={22} className="text-base-100"/>
          <p className="font-bold text-base-100">Settings</p>
        </div>
        <div className="  flex items-center gap-2 mt-auto">
          <LogoutBtn />
        </div>
      </article>
    </section>
  );
};

export default Sidebar;
