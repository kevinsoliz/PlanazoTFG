import React from "react";
import Logo from "../components/ui/Logo";

const AppLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="min-h-screen flex p-4">
      <div className=" w-80">
        <Logo />
      </div>
      <div className="flex-2 bg-base-100 rounded-xl border-2">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
