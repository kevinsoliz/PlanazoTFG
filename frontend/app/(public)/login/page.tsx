"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      router.push("/home");
    } catch {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <form onSubmit={handleLogin} className="w-3/5">
      <fieldset className="fieldset">
        <div className="pb-10">
          <legend className="text-4xl pb-2">Hola de nuevo</legend>
          <p className="text-sm text-neutral/70">Tu próximo plan te espera</p>
        </div>
        
        <label className="label">Email</label>
        <input
          onChange={(event) =>
            setUser({ ...user, email: event.target.value })
          }
          type="email"
          className="input w-full"
          placeholder="tu@email.com"
        />

        <label className="label">Password</label>
        <input
          onChange={(event) =>
            setUser({ ...user, password: event.target.value })
          }
          type="password"
          className="input w-full"
          placeholder="••••••••"
        />

        {error && <p className="text-error text-center">{error}</p>}
        <button className="btn btn-neutral mt-4 mb-8">Login</button>
        <span>
            <p className="text-center text-sm text-neutral/70">No tienes una cuenta? { }
            <Link href="/registro" className="link link-neutral hover:text-neutral/70">Apúntate</Link>
            </p>
        </span>
      </fieldset>
    </form>
  );
};

export default Login;
