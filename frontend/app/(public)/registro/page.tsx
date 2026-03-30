"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Registro = () => {
  const [newUser, setNewUser] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const router = useRouter();

  const handleRegistro = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      router.push("/planes");
    } catch {
      setError("Error de conexión con el servidor");
    }
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
