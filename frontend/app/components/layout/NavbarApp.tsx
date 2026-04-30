import Logo from "../ui/Logo";
import Avatar from "../ui/Avatar";
import LogoutBtn from "../features/auth/LogoutBtn";
import Link from "next/link";
import { FiPlus, FiMenu, FiCalendar, FiBookmark, FiMail } from "react-icons/fi";
import { getPerfil } from "@/app/services/perfiles";
import { getPlanesCreados, getPlanesApuntados } from "@/app/services/planes";

const NavbarApp = async () => {
  const perfil = await getPerfil();
  const creados = await getPlanesCreados();
  const apuntados = await getPlanesApuntados();
  const totalMisPlanes = creados.length + apuntados.length;

  return (
    <div className="navbar border-b border-neutral fixed top-0  z-50 shadow-md  backdrop-blur-md bg-base-100">
      <div className="max-w-6xl mx-auto w-full flex">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-primary btn-sm btn-outline md:hidden mr-6"
            >
              <FiMenu className="h-5 w-5" />
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box  mt-3 w-52 p-2 shadow border border-neutral"
            >
              <li>
                <Link href="/home">Planes</Link>
              </li>
              <li>
                <Link href="/mis-planes">Mis planes</Link>
              </li>
              <li>
                <Link href="/contacto">Contacto</Link>
              </li>
            </ul>
          </div>
          <Link href="/home">
            <Logo color="text-primary" />
          </Link>
        </div>
        {/* Links centro Desktop */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu bg-primary menu-horizontal rounded-box text-primary-content">
            <li>
              <Link href="/home">
                <FiCalendar className="h-5 w-5" />
                Planes
              </Link>
            </li>
            <li>
              <Link href="/mis-planes">
                <FiBookmark className="h-5 w-5" />
                Mis planes
                {totalMisPlanes > 0 && (
                  <span className="badge badge-xs badge-error">
                    {totalMisPlanes}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link href="/contacto">
                <FiMail className="h-5 w-5" />
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        {/* Login */}
        <div className="navbar-end gap-5">
          <Link
            href="/crear-plan"
            className="btn btn-primary btn-outline btn-sm"
          >
            <span className="hidden md:inline">Crear plan</span>
            <FiPlus className="md:hidden" />
          </Link>
          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <Avatar
                nombre={perfil?.nombre ?? ""}
                url={perfil?.avatar_url ?? null}
                size="sm"
              />
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box  mt-3 w-52 p-2 shadow border border-outline"
            >
              <li>
                <Link href="/perfil" className="justify-between">
                  Mi perfil
                </Link>
              </li>
              <li>
                <LogoutBtn />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarApp;
