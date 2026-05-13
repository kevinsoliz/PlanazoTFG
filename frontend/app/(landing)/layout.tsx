import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Layout para las páginas públicas (landing, contacto, etc.): navbar + contenido + footer.
const LandingLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default LandingLayout;
