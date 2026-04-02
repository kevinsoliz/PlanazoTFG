import React from "react";
import Logo from "../components/ui/Logo";
import Sidebar from "../components/layout/Sidebar";

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="min-h-screen flex p-4">
      <div className=" flex flex-col w-75">
        <Logo />
        <Sidebar/>
      </div>
      <div className="flex-2 bg-amber-600/15 rounded-4xl ">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
