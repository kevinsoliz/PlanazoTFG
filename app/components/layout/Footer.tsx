import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-neutral text-[#E0604D] p-8 gap-3">
       {/* Links */}
      <nav className="grid grid-flow-col gap-4 font-bold text-lg">
        <Link href="/about" className="link link-hover">About</Link>
        <Link href="/contacto" className="link link-hover">Contacto</Link>
        <Link href="/planes" className="link link-hover">Planes</Link>
      </nav>
      {/* Logo */}
      <aside>
        <span className="text-3xl font-(family-name:--font-bagel-fat-one)">
          Planazo
        </span>
      </aside>

     

      {/* Copyright */}
      <aside>
        <p className="text-xs">Copyright © {new Date().getFullYear()} - Planazo. Todos los derechos reservados.</p>
      </aside>

    </footer>
  );
};

export default Footer;