import { getPerfil } from "../services/auth.server";
import NavbarApp from "../components/layout/NavbarApp";

const AppLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <NavbarApp/>
      <div className="flex flex-col h-screen w-screen bg-indigo-500">

        {/* div invisible para compensar el navbar fixed, con sticky daba problemas*/}
        <div className="w-full shrink-0 h-16.5">
        </div>


        {children}

      </div>
    </>
  );
};

export default AppLayout;
