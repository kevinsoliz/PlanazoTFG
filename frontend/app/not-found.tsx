import BaseCard from "./components/ui/BaseCard";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative">
        <img
          src="/images/status-code/amigo-sentado.png"
          className="hidden lg:block absolute bottom-20 -left-44  w-80 z-10"
          alt=""
          loading="lazy"
        />
        <BaseCard>
          <div className="card-body items-center text-center">
            <h1 className="text-4xl font-bold">Página no encontrada</h1>
            <p>La página que buscas no existe o fue movida</p>
            <Link href="/" className="btn btn-primary mt-4">
              Volver al inicio
            </Link>
          </div>
        </BaseCard>
      </div>
    </div>
  );
};

export default NotFound;
