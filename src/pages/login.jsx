import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { sendDataLogin } from "../services/LoginService";
import AuthContext from "../context/AuthProvider";
import AlertCustom from "../custom/AlertCustom";

const Login = () => {
    const context = useContext(AuthContext);
    if (!context) {
        return (
            <div>Error: No se pudo cargar el contexto de autenticación.</div>
        );
    }
    const { handleIniciarSesion } = context;

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [cargando, setCargando] = useState(false);
    const [alertData, setAlertData] = useState({
        estado: false,
        titulo: "",
        detalle: "",
        headerBg: "bg-primary"
    });

    const mostrarAlerta = (titulo, detalle, headerBg = "bg-danger") => {
        setAlertData({
            estado: true,
            titulo,
            detalle,
            headerBg
        });
    };
     
    const handleCloseModal = () => {
        setAlertData(prev => ({
            ...prev,
            estado: false
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!correo.trim()) {
            mostrarAlerta("Alerta", "El campo correo es obligatorio");
            return;
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(correo)) {
            mostrarAlerta("Alerta", "El E-Mail ingresado no es válido");
            return;
        }
        if (!password.trim()) {
            mostrarAlerta("Alerta", "El campo contraseña es obligatorio");
            return;
        }

        setCargando(true);

        try {
            const [respuesta, status] = await sendDataLogin({ correo, password });

            if (status === 200) {
                handleIniciarSesion(respuesta.data.id, respuesta.data.nombre, respuesta.data.token, respuesta.data.perfil_id);
                window.location.href = "/";
                return;
            }

            mostrarAlerta("Alerta", "No se pudo iniciar sesión");
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        } catch (error) {
            mostrarAlerta("Alerta", "No se pudo conectar con el servidor");
        } finally {
            setCargando(false);
        }
    };
   

    return (
        <>
            <main className="d-flex w-100">
                <div className="container d-flex flex-column">
                    <div className="row vh-100">
                        <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
                            <div className="d-table-cell align-middle">

                                <div className="text-center mt-4">
                                    <h1 className="h2">Proyecto negocio de prueba</h1>
                                    <p className="lead">
                                        con FastAPI, SQLModel, Alembic y React
                                    </p>
                                </div>

                                <div className="card">
                                    <div className="card-body">
                                        <div className="m-sm-4">
                                            <div className="text-center">
                                                <h2 className="h4 mt-3">Login</h2>
                                            </div>
                                            <Form
                                                id="form"
                                                noValidate
                                                onSubmit={handleSubmit}
                                            >
                                                <div className="mb-3">
                                                    <label className="form-label">E-Mail</label>
                                                    <input type="text" id="correo" placeholder="E-Mail:" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Contraseña</label>
                                                    <input type="password" id="password" placeholder="Contraseña:" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />

                                                </div>

                                                <div className="text-center mt-3">
                                                    {!cargando && (
                                                        <div className="col-12 text-center">
                                                        <button type="submit" className="btn btn-lg btn-primary" title="Entrar" id="boton"> <i className="fas fa-lock-open"></i> Entrar</button>
                                                        </div>
                                                    )}
                                                    {cargando && (
                                                    <div className="col-12 text-center">
                                                        <div className="spinner-border text-primary" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                    </div>
                                                    )}

                                                    
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <AlertCustom
                estado={alertData.estado}
                titulo={alertData.titulo}
                detalle={alertData.detalle}
                headerBg={alertData.headerBg}
                onClose={handleCloseModal}
            />
        </>
    )
}

export default Login