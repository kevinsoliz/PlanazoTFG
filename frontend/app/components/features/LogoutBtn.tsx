"use client";

import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

const LogoutBtn = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      //pase lo que pase hay que mandar al usuario a fuera
      router.push("/");

    } catch {
      router.push("/");
    }
  };
  return (
    <>
      <FiLogOut size={22} />
      <button className="font-bold hover:cursor-pointer" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default LogoutBtn;
