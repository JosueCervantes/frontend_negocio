
import { useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const FrontEnd = () => {
    const context = useContext(AuthContext);
    if (!context) {
        return (
            <div>Error: No se pudo cargar el contexto de autenticación.</div>
        );
    }
    const { handleEstasLogueado } = context;
    const location = useLocation();
    if (location.pathname == '/login') {

    } else {
        //login
        useEffect(() => {
            handleEstasLogueado();
        },);
        
    }
    return (
        <Outlet />
    )
}
export default FrontEnd