"use client";

import BaseCard from "./components/ui/BaseCard";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative pt-40">
        <img
          src="/images/status-code/amigo-ruedas.png"
          className="hidden lg:block absolute bottom-55.5 left-6  w-80 z-10"
          alt=""
        />
        <BaseCard className="px-10 py-5">
          <div className="card-body items-center text-center">
            <h1 className="text-4xl font-bold">Algo salió mal...</h1>
            <p>Ha ocurrido un error inesperado</p>
            <button onClick={reset} className="btn btn-neutral mt-4">
              Intentar de nuevo
            </button>
          </div>
        </BaseCard>
      </div>
    </div>
  );
};

export default Error;
