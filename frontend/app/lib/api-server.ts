import { cookies } from "next/headers";

type Options = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
};

export async function fetchServer(path: string, options: Options = {}) {
  const cookieStore = await cookies();

  const backendUrl = process.env.BACKEND_URL || "http://backend:4000";

  // la petición que por lo general va inline:
  const req = new Request(`${backendUrl}${path}`, {
    method: options.method ?? "GET", // Get por defecto
    headers: {
      Cookie: cookieStore.toString(),
      "Content-Type": "application/json",
    }, // puesto que este componente se ejecuta en el servidor las cookies no se envian automáticamente, hay que leerlas con cookies() y reenviarlas manualmente a express
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const res = await fetch(req);

  const data = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data };

}
