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
    website: string;
  }) => {
    authService
      .registro(user)
      .then((res) => {
        router.push("/home");
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            // El backend respondió con un error (4xx, 5xx)
            setError(err.response.data?.error ?? "Error desconocido");
          } else {
            // La petición salió pero no hubo respuesta: server caído,
            // red sin internet, timeout, CORS bloqueado.
            setError("Error de conexión con el servidor");
          }
        } else {
          setError("Error desconocido");
        }
      });
  };
  return { registrar, error };
};

export default useRegistro;
