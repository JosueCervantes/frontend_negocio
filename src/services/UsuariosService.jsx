const API_BASE_URL = `${String(import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')}/`;

export async function getDatos()
{
    
    let respuesta = await fetch(`${API_BASE_URL}usuarios`,
        {
            method:'GET',
            headers:{'content-type':'application/json', 'Authorization':`Bearer ${localStorage.getItem('menu_flaites_token')}`}
        });
    return [await respuesta.json(), respuesta.status];
}
export async function getDatosPorId(id)
{
    let respuesta = await fetch(`${API_BASE_URL}usuarios/${id}`,
        {
            headers:{'content-type':'application/json', 'Authorization':`Bearer ${localStorage.getItem('menu_flaites_token')}`}
        });
    return [await respuesta.json(), respuesta.status];
}


export async function addData(dto)
{
    let respuesta=await fetch(`${API_BASE_URL}usuarios`, 
        {
            method:'POST',
            body: JSON.stringify(dto),
            headers: {'content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('menu_flaites_token')}`}
        }); 
    return respuesta.status;
}
export async function setData(dto)
{
    let respuesta=await fetch(`${API_BASE_URL}usuarios/${dto.id}`, 
        {
            method:'PUT',
            body: JSON.stringify(dto),
            headers: {'content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('menu_flaites_token')}`}
        }); 
    return respuesta.status;
}
export async function deleteData(id)
{
    let respuesta=await fetch(`${API_BASE_URL}usuarios/${id}`, 
        {
            method:'DELETE',
            headers: {'content-type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('menu_flaites_token')}`}
        }); 
    return respuesta.status;
}
