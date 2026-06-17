const API_BASE_URL = `${String(import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')}/`;

export async function sendDataLogin(datos)
{
    let respuesta = await fetch(`${API_BASE_URL}auth/login/`,
        {
            method:'POST',
            body: JSON.stringify(datos),
            headers:{'content-type':'application/json'}
        });
    return [await respuesta.json(), respuesta.status];
}