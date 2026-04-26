import Logo from "../ui/Logo";
import LogoutBtn from "../features/auth/LogoutBtn";
import Link from "next/link";

const NavbarApp = () => {
  return (
    <div className="navbar border-b border-neutral fixed top-0  z-10 shadow-md bg-neutral">
      <div className=" w-full flex mx-3">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow border border-neutral"
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
            <Logo color="text-[#f06e6e]" />
          </Link>
        </div>
        {/* Links centro */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-3">
            <li>
              <Link href="/home" className="text-white font-bold">
                Planes
              </Link>
            </li>
            <li>
              <Link href="/mis-planes" className="text-white font-bold">
                Mis planes
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="text-white font-bold">
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        {/* Login */}
        <div className="navbar-end gap-5">
          <Link href="/crear-plan" className="btn btn-success btn-sm">
            Crear plan
          </Link>
          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow border border-outline"
            >
              <li>
                <Link href="/perfil" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
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
