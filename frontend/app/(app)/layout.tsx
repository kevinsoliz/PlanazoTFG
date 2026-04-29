import NavbarApp from "../components/layout/NavbarApp";

const AppLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <NavbarApp/>
      {/* Patrón de puntos repetido como background. Tamaño 24px, los
          puntos son círculos de 1.5px en color neutral con 7% de opacidad.
          Subliminal: refuerza la sensación táctil sin distraer. */}
      <div
        className="flex flex-col h-screen w-screen "
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(23,23,24,0.07) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      >

        {/* div invisible para compensar el navbar fixed, con sticky daba problemas*/}
        <div className="w-full shrink-0 h-16.5">
        </div>


        {children}

      </div>
    </>
  );
};

export default AppLayout;
