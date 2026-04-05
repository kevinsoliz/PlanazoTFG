"use client";
import useRegistro from "@/app/hooks/useRegistro";
import { FormEvent, useState } from "react";

const Registro = () => {
  const [newUser, setNewUser] = useState({
    nombre: "",
    email: "",
    password: "",
  });

 const {registrar, error} = useRegistro();

  const handleRegistro = async (event: FormEvent) => {
    event.preventDefault();
    registrar(newUser);
  };

  return (
    <form onSubmit={handleRegistro} className="w-3/5">
      <fieldset className="fieldset">
        <div className="pb-10">
          <legend className="text-4xl pb-2">Bienvenido</legend>
          <p className="text-sm text-neutral/70">Crea tu cuenta y únete a Planazo</p>
        </div>
        <label className="label">
          <input
            onChange={(event) =>
              setNewUser({ ...newUser, nombre: event.target.value })
            }
            type="text"
            className="input w-full"
            placeholder="Tu nombre"
          />
        </label>

        <label className="label">Email</label>
        <input
          onChange={(event) =>
            setNewUser({ ...newUser, email: event.target.value })
          }
          type="email"
          className="input w-full"
          placeholder="tu@email.com"
        />

        <label className="label">Password</label>
        <input
          onChange={(event) =>
            setNewUser({ ...newUser, password: event.target.value })
          }
          type="password"
          className="input w-full"
          placeholder="••••••••"
        />

        {error && <p className="text-error text-center">{error}</p>}
        <button className="btn btn-neutral mt-4">Registrarse</button>
      </fieldset>
    </form>
  );
};

export default Registro;
