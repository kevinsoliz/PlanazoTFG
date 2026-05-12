"use client";

import { useEffect, useState } from "react";

interface Props {
  targetDate: string;
}

interface Tiempo {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

const calcular = (target: number): Tiempo => {
  const diff = Math.max(0, target - Date.now());
  const sec = Math.floor(diff / 1000);
  return {
    dias: Math.floor(sec / 86400),
    horas: Math.floor((sec % 86400) / 3600),
    minutos: Math.floor((sec % 3600) / 60),
    segundos: sec % 60,
  };
};

const Countdown = ({ targetDate }: Props) => {
  const target = new Date(targetDate).getTime();
  const [tiempo, setTiempo] = useState<Tiempo>({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    setTiempo(calcular(target));
    const id = setInterval(() => setTiempo(calcular(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="flex gap-3 md:gap-5">
      <Bloque valor={tiempo.dias} etiqueta="días" />
      <Bloque valor={tiempo.horas} etiqueta="horas" />
      <Bloque valor={tiempo.minutos} etiqueta="min" />
      <Bloque valor={tiempo.segundos} etiqueta="seg" />
    </div>
  );
};

interface BloqueProps {
  valor: number;
  etiqueta: string;
}

const Bloque = ({ valor, etiqueta }: BloqueProps) => (
  <div className="flex flex-col items-center justify-center bg-neutral text-neutral-content rounded-md px-4 py-3 min-w-20">
    <span className="font-(family-name:--font-bagel-fat-one) text-4xl md:text-5xl tabular-nums leading-none">
      {String(valor).padStart(2, "0")}
    </span>
    <span className="text-xs uppercase opacity-70 mt-1">{etiqueta}</span>
  </div>
);

export default Countdown;
