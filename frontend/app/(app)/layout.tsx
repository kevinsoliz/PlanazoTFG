import { getPerfil } from "../services/auth.server";
import NavbarApp from "../components/layout/NavbarApp";

const AppLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {


  return (
    <>
    <NavbarApp/>
    <div className="min-h-screen">
     {children}
    </div>
    </>
  );
};

export default AppLayout;
