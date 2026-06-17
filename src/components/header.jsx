import { useContext, useEffect, useState } from 'react'
import { getDatosPorId } from '../services/UsuariosService';
import AuthContext from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import { errorSesion } from '../helpers/Helpers';

const Header = () => {
    const [menuColapsado, setMenuColapsado] = useState(false);
    const [userData, setUserData] = useState(null);

    const toggleMenu = () => {
        const sidebar = document.getElementsByClassName('js-sidebar')[0];
        if (!sidebar) return;

        sidebar.classList.toggle('collapsed');
        setMenuColapsado(sidebar.classList.contains('collapsed'));
        window.dispatchEvent(new Event('resize'));
    };

    useEffect(() => {
        const id = localStorage.getItem('menu_flaites_id');
        if (!id) return;

        const cargarUsuario = async () => {
            try {
                const [data, status] = await getDatosPorId(Number(id));

                if (status !== 200 || data.estado_id === 2) {
                    errorSesion();
                    return;
                }

                setUserData(data);
                localStorage.setItem('menu_flaites_perfil_id', String(data.perfil_id));
            } catch {
                errorSesion();
            }
        };

        cargarUsuario();
    }, []);

    const context = useContext(AuthContext);
    if (!context) {
        return (
            <div>Error: No se pudo cargar el contexto de autenticación.</div>
        );
    }

    const { handleCerrarSesion } = context;

    return (
        <>
            <nav className="navbar navbar-expand navbar-light navbar-bg">
                <button type="button" className="sidebar-toggle js-sidebar-toggle" onClick={toggleMenu} title={menuColapsado ? 'Mostrar' : 'Ocultar'}>
                    <i className={`fas ${menuColapsado ? 'fa-long-arrow-alt-right' : 'fa-long-arrow-alt-left'} align-self-center`}></i>
                </button>

                <div className="navbar-collapse collapse">
                    <ul className="navbar-nav navbar-align">
                        <li className="nav-item dropdown">
                            <button type="button" className="nav-icon dropdown-toggle d-inline-block d-sm-none btn btn-link p-0" data-bs-toggle="dropdown">
                                <i className="fas fa-long-arrow-alt-down align-middle"></i>
                            </button>
                            <span className="nav-link d-none d-sm-inline-block">
                                {userData?.perfil}
                            </span>
                            <button type="button" className="nav-link dropdown-toggle d-none d-sm-inline-block btn btn-link p-0" data-bs-toggle="dropdown">
                                <span className="text-dark">
                                    {userData?.nombre}
                                </span>
                                <img src="/img/perfil.png" className="avatar img-fluid rounded me-1" />
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                                <Link className="dropdown-item" title="Cerrar sesión" to="#" onClick={handleCerrarSesion}>
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Cerrar sesión
                                </Link>
                            </div>
                        </li>
                    </ul>

                </div>
            </nav>
        </>
    )
}

export default Header