import { useRouter } from "next/navigation";
import { useState } from "react";
import authService from "../services/auth-service";
import axios from "axios";

const useRegistro = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const registrar = (user: {
    nombre: string;
    email: string;
    password: string;
  }) => {
    authService
      .registro(user)
      .then((res) => {
        router.push("/home");
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.err ?? "Error desconocido");
        } else {
          setError("Error de conexión con el servidor");
        }
      });
  };
  return { registrar, error };
};

export default useRegistro;
