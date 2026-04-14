
import { AuthUser } from "../types/user";
import apiClient from "../lib/api-client";


class AuthService {
    login(user: { email: string, password: string }) {
        return apiClient.post<{user: AuthUser}>("/auth/login", user);
    }

    registro(user: { nombre: string, email: string, password: string }) {
        return apiClient.post<{user: AuthUser}>("/auth/registro", user);
    }

    logout() {
        return apiClient.post<{user: AuthUser}>("/auth/logout");
    }

    me() {
        return apiClient.get<{user: AuthUser}>("/auth/me")
    }
}

export default new AuthService();