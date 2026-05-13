import axios from "axios";

// Cliente axios para llamadas desde el navegador (contraparte de fetchServer
// para componentes que se ejecutan en el servidor). withCredentials envía la cookie de sesión.
export default axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
});
