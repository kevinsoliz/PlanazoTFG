"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import apiClient from "../../services/api-client";
import authService from "@/app/services/auth-service";
import useLogin from "@/app/hooks/useLogin";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const {login, error} = useLogin()
  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    login(user);
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
          onChange={(event) => setUser({ ...user, email: event.target.value })}
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
          <p className="text-center text-sm text-neutral/70">
            No tienes una cuenta? {}
            <Link
              href="/registro"
              className="link link-neutral hover:text-neutral/70"
            >
              Apúntate
            </Link>
          </p>
        </span>
      </fieldset>
    </form>
  );
};

export default Login;
