import { Link, useLocation } from "react-router-dom";
import logo from "../img/logo.jpeg";

const Menu = () => {
    const location = useLocation();
    const perfilId = localStorage.getItem('menu_flaites_perfil_id');
    const esAdmin = perfilId === '1';
    const esNegocio = perfilId === '2';

    const isActive = (path, exact = false) => {
        return exact
        ? location.pathname === path
        : location.pathname.startsWith(path);
    };
    return (
        <>
        <nav id="sidebar" className="sidebar js-sidebar">
            <div className="sidebar-content js-simplebar">
                <Link className="sidebar-brand" to="/">
                    <span className="align-middle">
                        <img src={logo} alt="Logo" style={{ width: "150px" }} />
                    </span>   
                </Link>
                <ul className="sidebar-nav">
                    {esAdmin && (
                        <>
                            <li className="sidebar-header">Administración</li>
                            <li className={`sidebar-item ${isActive("/perfiles") ? "active" : ""}`}>
                                <Link className="sidebar-link" to="/perfiles" title="Perfiles">
                                    <i className="align-middle fas fa-list"></i> 
                                    <span className="align-middle">Perfiles</span>
                                </Link>
                            </li>
                            <li className={`sidebar-item ${isActive("/usuarios") ? "active" : ""}`}>
                                <Link className="sidebar-link" to="/usuarios" title="Usuarios">
                                    <i className="align-middle fas fa-users"></i> 
                                    <span className="align-middle">Usuarios</span>
                                </Link>
                                </li>
                            <li className="sidebar-header">Negocios</li>
                            <li className={`sidebar-item ${isActive("/negocios/categorias") ? "active" : ""}`}>
                                <Link className="sidebar-link" to="/negocios/categorias" title="Categorías">
                                    <i className="align-middle fas fa-list"></i> 
                                    <span className="align-middle">Categorías</span>
                                </Link>
                            </li>
                            <li className={`sidebar-item ${isActive("/negocios/listar") ? "active" : ""} ${isActive("/negocios/formulario") ? "active" : ""}`}>
                                <Link className="sidebar-link" to="/negocios/listar" title="Negocios">
                                    <i className="align-middle far fa-list-alt"></i> 
                                    <span className="align-middle">Negocios</span>
                                </Link>
                            </li>
                            <li className={`sidebar-item ${isActive("/negocios/platos-categorias") ? "active" : ""}`}>
                                <Link className="sidebar-link" to="/negocios/platos-categorias" title="Platos Categorías">
                                    <i className="align-middle fas fa-utensils"></i> 
                                    <span className="align-middle">Platos Categorías</span>
                                </Link>
                            </li>
                        </>
                    )}
                    {esNegocio && (
                        <>
                            <li className="sidebar-header">Mi Negocio</li>
                            <li className={`sidebar-item ${isActive("/mi-negocio") ? "active" : ""}`}>
                                <Link className="sidebar-link" to="/mi-negocio" title="Mi Negocio">
                                    <i className="align-middle far fa-list-alt"></i> 
                                    <span className="align-middle">Mi Negocio</span>
                                </Link>
                            </li>
                        </>
                    )}  
                </ul>
            </div>
        </nav>
        </>
    )       
}
export default Menu