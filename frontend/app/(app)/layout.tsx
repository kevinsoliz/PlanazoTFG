'use client'
import React, { useEffect, useState } from "react";
import Logo from "../components/ui/Logo";
import Sidebar from "../components/layout/Sidebar";
import { useRouter } from "next/navigation";

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const autenticar = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { credentials: "include"});
        
        if (!response.ok) {
          router.push("/login");
          return;
        }
        setLoading(false);

      } catch {
        router.push("/login");
      }
    };

    autenticar();
  }, [router]) //Gracias a esta dependencia cuando el componente se monte por primera vez y si router llegara a cambiar, el efecto se ejecuta una sola vez.

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-spinne loading-lg"></span>
      </div>
    )
  }

  return (
    <div className="h-screen flex p-4">
      <div className=" flex flex-col w-75">
        <Logo />
        <Sidebar/>
      </div>
      <div className="flex-2 flex bg-amber-600/15 rounded-4xl">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
