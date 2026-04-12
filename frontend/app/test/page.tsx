import { fetchServer } from '@/app/lib/api-server'
import { getPerfil } from '../services/auth.server';

export default async function TestPage() {
    const data = await getPerfil();
    console.log("Perfil en la data:", data);

    return <pre>{JSON.stringify(data, null, 2)}</pre>
}