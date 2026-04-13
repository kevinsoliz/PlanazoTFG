import React from "react";
import Logo from "../ui/Logo";
import LogoutBtn from "../features/LogoutBtn";
import { FaBell } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import Link from "next/link";

const NavbarApp = () => {
  return (
    <div className="navbar bg-base-100 border-b border-neutral">
      <div className=" w-full flex">
        {/* Logo */}
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
                <Link href="/planes">Planes</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contacto">Contacto</Link>
              </li>
            </ul>
          </div>
          <Link
            href="/home"
          >
           <Logo/>
          </Link>
        </div>
        {/* Links centro */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-3">
            <li>
              <Link href="/home" >Planes</Link>
            </li>
            <li>
              <Link href="/mis-planes" >Mis planes</Link>
            </li>
            <li>
              <Link href="/contacto" >Contacto</Link>
            </li>
          </ul>
        </div>
        {/* Login */}
        <div className="navbar-end">
          <Link href="/crear-plan" className="btn btn-neutral">
            Crear plan
          </Link>
          <div className="dropdown dropdown-end">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarApp;
