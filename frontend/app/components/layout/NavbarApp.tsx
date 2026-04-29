import Logo from "../ui/Logo";
import LogoutBtn from "../features/auth/LogoutBtn";
import Link from "next/link";
import { FiPlus, FiMenu } from "react-icons/fi";

const NavbarApp = () => {
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
          <ul className="menu bg-primary menu-horizontal rounded-box">
            <li>
              <a>
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Inbox
                <span className="badge badge-xs">99+</span>
              </a>
            </li>
            <li>
              <a>
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Updates
                <span className="badge badge-xs badge-warning">NEW</span>
              </a>
            </li>
            <li>
              <a>
                Stats
                <span className="badge badge-xs badge-info"></span>
              </a>
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
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box  mt-3 w-52 p-2 shadow border border-outline"
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
