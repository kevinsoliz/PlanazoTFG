"use client";

import authService from "@/app/services/auth-service";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

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
