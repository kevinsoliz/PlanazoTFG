import { AuthUser } from "../types/user";
/* Importamos el tipo AuthUser que representa la estructura de datos
   de un usuario autenticado, usado como tipo de retorno en todas las operaciones. */

import apiClient from "../lib/api-client";
/* Importamos el cliente HTTP configurado para el lado del cliente.
   A diferencia de fetchServer, este se usa en contextos del navegador
   y gestiona las cookies de sesión de forma automática. */

/* Clase que centraliza todas las operaciones de autenticación de la aplicación.
   Agrupa los métodos relacionados con login, registro, logout y obtención
   del usuario actual. */
class AuthService {

    /* Inicia sesión con las credenciales del usuario.
       Envía email y contraseña al endpoint de login y devuelve
       los datos del usuario autenticado si las credenciales son correctas. */
    login(user: { email: string, password: string }) {
        return apiClient.post<{user: AuthUser}>("/auth/login", user);
    }

    /* Registra un nuevo usuario en el sistema con sus datos personales.
       El campo "website" es el honey pot, para un humano es opcional, ni siquiera está
       a la vista en el form, pero un bot lo rellena sin dudarlo*/
    registro(user: { nombre: string, email: string, password: string, website: string }) {
        return apiClient.post<{user: AuthUser}>("/auth/registro", user);
    }

    /* Cierra la sesión del usuario actual.
       El servidor invalida la cookie de sesión activa en esta llamada. */
    logout() {
        return apiClient.post<{user: AuthUser}>("/auth/logout");
    }

    /* Obtiene los datos del usuario actualmente autenticado.
       Es útil para verificar si la sesión sigue activa o para
       recuperar información del usuario sin necesidad de un nuevo login. */
    me() {
        return apiClient.get<{user: AuthUser}>("/auth/me")
    }
}

export default new AuthService();
/* Exportamos una única instancia de la clase (patrón Singleton).
   Esto garantiza que toda la aplicación comparta el mismo objeto AuthService,
   evitando instancias duplicadas e inconsistencias en el estado. */