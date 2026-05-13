"use client";

import authService from "@/app/services/auth-service";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

// Botón que cierra la sesión y vuelve a la portada (también si la llamada falla, para no dejar al usuario atascado).
const LogoutBtn = () => {
  const router = useRouter();
  const handleLogout = () => {
    authService
      .logout()
      .then(() => router.push("/"))
      .catch(() => router.push("/"));
  };
  return (
    <>
      <button className="font-bold hover:cursor-pointer" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default LogoutBtn;
