import { cookies } from "next/headers";

type Options = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
};

export async function fetchServer(path: string, options: Options = {}) {
  /* Este código se ejecuta en el servidor, así que las cookies no se envían
     automáticamente. Las leemos con cookies() y las reenviamos a mano al
     backend en la cabecera Cookie. */
  const cookieStore = await cookies();

  const backendUrl = process.env.BACKEND_URL || "http://backend:4000";

  const req = new Request(`${backendUrl}${path}`, {
    method: options.method ?? "GET",
    headers: {
      Cookie: cookieStore.toString(),
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const res = await fetch(req);

  const data = await res.json().catch(() => null);
  return { ok: res.ok, status: res.status, data };

}
