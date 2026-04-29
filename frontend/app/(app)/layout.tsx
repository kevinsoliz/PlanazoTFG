import NavbarApp from "../components/layout/NavbarApp";

const AppLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(23,23,24,0.07) 1.5px, transparent 1.5px)",
        backgroundSize: "24px 24px",
      }}
    >
      <NavbarApp />
      <main className="max-w-6xl mx-auto w-full pt-16.5">{children}</main>
    </div>
  );
};

export default AppLayout;
