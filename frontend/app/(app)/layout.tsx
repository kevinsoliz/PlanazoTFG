import React from "react";
import Logo from "../components/ui/Logo";

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="min-h-screen flex p-4 bg-primary">
      <div className=" w-80">
        <Logo/>
        {children}</div>
      <div className="flex-2 bg-base-100 rounded-2xl"></div>
    </div>
  );
};

export default AppLayout;
