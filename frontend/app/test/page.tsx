import { fetchServer } from '@/app/lib/api-server'
import { getPlanes } from '../services/planes.server';

export default async function TestPage() {
    const data = await getPlanes();
    console.log("Data recibiiiiiii:", data);

    return <pre>{JSON.stringify(data, null, 2)}</pre>
}