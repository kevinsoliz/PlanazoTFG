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
      <FiLogOut size={22} className="text-base-100"/>
      <button className="font-bold hover:cursor-pointer text-base-100" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default LogoutBtn;
