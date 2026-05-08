"use client";

import authService from "@/app/services/auth-service";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/context/ToastContext"; 

const LogoutBtn = () => {
  const router = useRouter();
  const { showToast } = useToast(); 

  const handleLogout = async () => {
    try {
      await authService.logout();
      showToast("Sesión cerrada correctamente", "success");
      router.push("/"); // Redirección tras éxito
    } catch  {
      showToast("Error al cerrar sesión", "error");
      router.push("/");
    }
  };

  return (
    <button className="font-bold hover:cursor-pointer text-error" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutBtn;