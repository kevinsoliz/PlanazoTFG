"use client";

import { use, useState } from "react";

interface Props {
    nombre: string,
    apellido?: string,
    edad?: number
}

const Boton1 = ({nombre, apellido, edad = 30}: Props) => {
  const [contador, setContador] = useState(0)
  const [color, setColor] = useState("primary")
  

  const handleClick = () => {
    setContador(contador + 1)
    setColor("success")
  };
  return (
    <div className="flex justify-center">
      <button className={`btn btn-${color}`} onClick={handleClick}>
        Contador {contador}
      </button>
      <p>Hola {nombre} {apellido} tienes {edad}!</p>

    </div>
  );
};

export default Boton1;
