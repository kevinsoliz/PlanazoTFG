import Logo from "../components/ui/Logo";
import Sidebar from "../components/layout/Sidebar";
import { getPerfil } from "../services/auth.server";

const AppLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
const perfil = await getPerfil();

  return (
    <div className="bg-indigo-500 h-screen flex p-4">
      <div className=" flex flex-col w-75">
        <Logo color="text-amber-500" />
        {perfil && <Sidebar perfil={perfil}/>}
      </div>
      <div className="flex-2 flex bg-base-100 rounded-xl">{children}</div>
    </div>
  );
};

export default AppLayout;
