import { AuthUser } from "../types/user";
import apiClient from "../lib/api-client";

// Llamadas de auth desde el navegador.
class AuthService {

    login(user: { email: string, password: string }) {
        return apiClient.post<{user: AuthUser}>("/auth/login", user);
    }

    /* El campo "website" es el honeypot: para un humano es opcional y ni
       siquiera se ve en el form, pero un bot lo rellena sin dudarlo. */
    registro(user: { nombre: string, email: string, password: string, website: string }) {
        return apiClient.post<{user: AuthUser}>("/auth/registro", user);
    }

    logout() {
        return apiClient.post<{user: AuthUser}>("/auth/logout");
    }

    me() {
        return apiClient.get<{user: AuthUser}>("/auth/me")
    }
}

// Exportamos una única instancia para que toda la app comparta el mismo objeto.
export default new AuthService();
