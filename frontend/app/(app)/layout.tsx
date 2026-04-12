import { getPerfil } from "../services/auth.server";
import NavbarApp from "../components/layout/NavbarApp";

const AppLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
const perfil = await getPerfil();

  return (
    <>
    <NavbarApp/>
    <div className="p-4">
     {children}
    </div>
    </>
  );
};

export default AppLayout;
