import React from "react";

const PublicLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <div className="min-h-screen flex">
        <div className="flex-1 flex flex-col p-8">
          <p className="text-2xl">LOGO</p>
          <div className="flex-1 flex items-center justify-center">
            {children}
          </div>
        </div>

        <div className="hidden lg:flex flex-1/4 bg-primary items-center justify-center">
          <img src="/images/auth/amigos12.png" className="w-3/5" alt="" />
        </div>
      </div>
    </>
  );
};

export default PublicLayout;
