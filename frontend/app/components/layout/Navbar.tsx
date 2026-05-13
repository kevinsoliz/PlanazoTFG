import Link from "next/link";
import { FiMenu } from "react-icons/fi";

// Navbar de las páginas públicas (landing, planes, contacto). Lleva el botón de Login.
const Navbar = () => {
  return (
    <div className="navbar bg-base-100 border-b border-neutral relative z-50">

      <div className="max-w-7xl mx-auto w-full flex">
          {/* Logo */}
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-neutral btn-sm btn-outline md:hidden mr-6">
                <FiMenu className="h-5 w-5" />
              </div>
              <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow border border-neutral">
                <li><Link href="/planes">Planes</Link></li>
                <li><Link href="/sobre-nosotros">Sobre nosotros</Link></li>
                <li><Link href="/contacto">Contacto</Link></li>
              </ul>
            </div>
            <Link href="/" className="text-4xl font-(family-name:--font-bagel-fat-one)">Planazo</Link>
          </div>
          {/* Links centro */}
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal px-1">
              <li><Link href="/planes">Planes</Link></li>
              <li><Link href="/sobre-nosotros">Sobre nosotros</Link></li>
              <li><Link href="/contacto">Contacto</Link></li>
            </ul>
          </div>
          {/* Login */}
          <div className="navbar-end">
            <Link href="/login" className="btn btn-neutral btn-outline">Login</Link>
          </div>
      </div>

    </div>
  );
};

export default Navbar;