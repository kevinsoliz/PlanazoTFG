"use client";
import useRegistro from "@/app/hooks/useRegistro";
import { registroSchema } from "@/app/schemas/auth.schema";
import { FormEvent, useState } from "react";

type Campo = "nombre" | "email" | "password" | "website";

const Registro = () => {
  const [newUser, setNewUser] = useState({
    nombre: "",
    email: "",
    password: "",
    // Honeypot: campo trampa para bots. Los humanos no lo ven (lo
    // ocultamos fuera de pantalla más abajo) pero los bots automáticos
    // que parsean el HTML lo rellenan. El backend rechaza el registro
    // si llega con cualquier valor distinto de "".
    website: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<Campo, string>>>({});

  const { registrar, error } = useRegistro();

  const handleChange = (campo: Campo, valor: string) => {
    setNewUser({ ...newUser, [campo]: valor });
    // limpiamos el error del campo en cuanto el usuario empieza a corregirlo
    if (fieldErrors[campo]) {
      setFieldErrors({ ...fieldErrors, [campo]: undefined });
    }
  };

  const handleRegistro = async (event: FormEvent) => {
    event.preventDefault();

    const result = registroSchema.safeParse(newUser);
    if (!result.success) {
      // flatten().fieldErrors devuelve { nombre: [...], email: [...], ... }
      // Cogemos solo el primer mensaje de cada campo.
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        nombre: errors.nombre?.[0],
        email: errors.email?.[0],
        password: errors.password?.[0],
      });
      return;
    }

    setFieldErrors({});
    registrar(newUser);
  };

  return (
    <form onSubmit={handleRegistro} className="w-3/5">
      <fieldset className="fieldset">
        <div className="pb-10">
          <legend className="text-4xl pb-2">Bienvenido</legend>
          <p className="text-sm text-neutral/70">
            Crea tu cuenta y únete a Planazo
          </p>
        </div>

        <label className="label">
          <input
            onChange={(e) => handleChange("nombre", e.target.value)}
            type="text"
            className="input w-full"
            placeholder="Tu nombre"
          />
        </label>
        {fieldErrors.nombre && (
          <p className="text-error text-xs mt-1">{fieldErrors.nombre}</p>
        )}

        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={newUser.website}
          onChange={(e) => handleChange("website", e.target.value)}
          style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px" }}
        />

        <label className="label">Email</label>
        <input
          onChange={(e) => handleChange("email", e.target.value)}
          type="email"
          className="input w-full"
          placeholder="tu@email.com"
        />
        {fieldErrors.email && (
          <p className="text-error text-xs mt-1">{fieldErrors.email}</p>
        )}

        <label className="label">Password</label>
        <input
          onChange={(e) => handleChange("password", e.target.value)}
          type="password"
          className="input w-full"
          placeholder="••••••••"
        />
        {fieldErrors.password ? (
          <p className="text-error text-xs mt-1">{fieldErrors.password}</p>
        ) : (
          <p className="text-neutral/70 text-xs mt-1">* Mínimo 8 caracteres</p>
        )}

        {error && <p className="text-error text-center">{error}</p>}
        <button className="btn btn-neutral mt-4">Registrarse</button>
      </fieldset>
    </form>
  );
};

export default Registro;
