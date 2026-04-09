import { cookies } from 'next/headers';

export async function fetchServer(path: string) {
    const cookieStore = await cookies();

    const backendUrl = process.env.Backend_URL || "http://backend:4000";

    const res = await fetch(`${backendUrl}${path}`, {
        headers: { Cookie: cookieStore.toString() } // puesto que este componente se ejecuta en el servidor las cookies no se envian automáticamente, hay que leerlas con cookies() y reenviarlas manualmente a express
    });


    if(!res.ok) return null;

    return res.json();

}