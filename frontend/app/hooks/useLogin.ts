import { useRouter } from "next/navigation";
import authService from "../services/auth-service";
import axios from "axios";
import { useState } from "react";

const useLogin = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const login = (user: { email: string; password: string }) => authService
    .login(user)
    .then((res) => {
      console.log("Este es el response:", res.data.user);
      router.push("/home");
    })
    .catch((err) => {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error ?? "Error desconocido");
      } else {
        setError("Error de conexión con el servidor");
      }
    });

  return {login, error};
};

export default useLogin;
