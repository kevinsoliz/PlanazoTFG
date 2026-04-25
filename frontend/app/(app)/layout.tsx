import { getPerfil } from "../services/auth.server";
import NavbarApp from "../components/layout/NavbarApp";

const AppLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {


  return (
    <>
    <NavbarApp/>
    <div className="min-h-screen">
      <div className="h-16.5"></div> {/* div invisible para compensar el navbar fixed, con sticky daba problemas*/}
     {children}
    </div>
    </>
  );
};

export default AppLayout;
