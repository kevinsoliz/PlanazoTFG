import { cookies } from 'next/headers';

export async function fetchServer(path: string) {
    const cookieStore = await cookies();

    const backendUrl = process.env.Backend_URL || "http://backend:4000";

    const res = await fetch(`${backendUrl}${path}`, {
        headers: { Cookie: cookieStore.toString() }
    });


    if(!res.ok) return null;

    return res.json();

}