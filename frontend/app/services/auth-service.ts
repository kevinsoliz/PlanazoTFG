
import apiClient from "./api-client";
import create from "./http-service";

class AuthService {
    login(user: { email: string, password: string }) {
        return apiClient.post("/auth/login", user);
    }

    registro(user: { nombre: string, email: string, password: string }) {
        return apiClient.post("/auth/registro", user);
    }

    logout() {
        return apiClient.post("/auth/logout");
    }

    me() {
        return apiClient.get("/auth/me")
    }
}

export default new AuthService();