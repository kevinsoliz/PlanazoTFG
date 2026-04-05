"use client";
import React, { useEffect, useState } from "react";
import Logo from "../components/ui/Logo";
import Sidebar from "../components/layout/Sidebar";
import { useRouter } from "next/navigation";
import authService from "../services/auth-service";
import perfilesService from "../services/perfiles-service";
import { UserProfile } from "../types/user";

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [perfil, setPerfil] = useState<UserProfile | null>(null);

  useEffect(() => {
    authService.me()
      .then(res => perfilesService.get<{ perfil: UserProfile }>(res.data.user.id))
      .then(res => {
        setPerfil(res.data.perfil);
        setLoading(false);
      })
      .catch(() => router.push('/login'));

  }, [router]); //Gracias a esta dependencia cuando el componente se monte por primera vez y si router llegara a cambiar, el efecto se ejecuta una sola vez.

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-spinne loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="h-screen flex p-4">
      <div className=" flex flex-col w-75">
        <Logo />
        <Sidebar perfil={perfil}/>
      </div>
      <div className="flex-2 flex bg-amber-600/15 rounded-4xl">{children}</div>
    </div>
  );
};

export default AppLayout;
