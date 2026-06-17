
import { useContext, useEffect, useState } from 'react'
import { Breadcrumb, Form, Modal } from 'react-bootstrap'

import Footer from '../components/footer'
import Header from '../components/header'
import Menu from '../components/menu'
import AlertCustom from '../custom/AlertCustom'
import AuthContext from '../context/AuthProvider'
import { addData, deleteData, getDatos, setData } from '../services/UsuariosService'

const Users = () => {
  const context = useContext(AuthContext)

  if (!context) {
    return <div>Error: No se pudo cargar el contexto de autenticacion.</div>
  }

  const { handleValidarAcceso, showConfirm } = context
  const perfiles = [{ id: 1, nombre: 'Administrador' },{ id: 2, nombre: 'Negocio' },]
  const estados = [{ id: 1, nombre: 'Activo' },{ id: 2, nombre: 'Inactivo' },]

  const [datos, setDatos] = useState([])
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)
  const [accion, setAccion] = useState('crear')
  const [accionId, setAccionId] = useState(null)

  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [password, setPassword] = useState('')
  const [perfilId, setPerfilId] = useState('0')
  const [estadoId, setEstadoId] = useState('1')

  const [alertData, setAlertData] = useState({
    estado: false,
    titulo: '',
    detalle: '',
    headerBg: 'bg-primary',
  })

  const openAlert = (tipo, detalle, headerBg = 'bg-primary') => {
    setAlertData({ estado: true, titulo: tipo, detalle, headerBg })
  }

  const closeAlert = () => {
    setAlertData((prev) => ({ ...prev, estado: false }))
  }

  const fetchUsuarios = async () => {
    setLoading(true)
    try {
      const [respuesta, status] = await getDatos()
      if (status === 200) {
        setDatos(Array.isArray(respuesta) ? respuesta : [])
      } else {
        setDatos([])
        openAlert('warning', 'No se pudo cargar la lista de usuarios', 'bg-danger')
      }
    } catch (error) {
      setDatos([])
      openAlert('warning', 'Error de conexion al cargar usuarios', 'bg-danger')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleValidarAcceso('1')
    fetchUsuarios()
  }, [handleValidarAcceso])

  const openCrear = () => {
    setAccion('crear')
    setAccionId(null)
    setNombre('')
    setCorreo('')
    setTelefono('')
    setPassword('')
    setPerfilId('0')
    setEstadoId('1')
    setShow(true)
  }

  const openEditar = (usuario) => {
    setAccion('editar')
    setAccionId(usuario.id)
    setNombre(usuario.nombre || '')
    setCorreo(usuario.correo || '')
    setTelefono(usuario.telefono || '')
    setPassword('')
    setPerfilId(String(usuario.perfil_id ?? '0'))
    setEstadoId(String(usuario.estado_id ?? '1'))
    setShow(true)
  }

  const validarFormulario = () => {
    if (perfilId === '0') {
      openAlert('warning', 'El campo perfil es obligatorio', 'bg-danger')
      return false
    }

    if (nombre.trim() === '') {
      openAlert('warning', 'El campo nombre es obligatorio', 'bg-danger')
      return false
    }

    if (correo.trim() === '') {
      openAlert('warning', 'El campo correo es obligatorio', 'bg-danger')
      return false
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(correo)) {
      openAlert('warning', 'El correo no es válido', 'bg-danger')
      return false
    }

    if (telefono.trim() === '') {
      openAlert('warning', 'El campo telefono es obligatorio', 'bg-danger')
      return false
    }

    if (accion === 'crear' && password.trim() === '') {
      openAlert('warning', 'El campo contrasena es obligatorio', 'bg-danger')
      return false
    }

    return true
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validarFormulario()) {
      return
    }

    try {
      if (accion === 'crear') {
        const status = await addData({
          nombre: nombre.trim(),
          correo: correo.trim(),
          telefono: telefono.trim(),
          password,
          perfil_id: Number(perfilId),
        })

        if (status === 201) {
          setShow(false)
          await fetchUsuarios()
          openAlert('ok', 'Se creó el registro exitosamente', 'bg-success')
        } else {
          openAlert('warning', 'Se produjo un error inesperado', 'bg-danger')
        }
        return
      }

      if (accion === 'editar' && accionId !== null) {
        const status = await setData({
          id: accionId,
          nombre: nombre.trim(),
          correo: correo.trim(),
          telefono: telefono.trim(),
          password,
          perfil_id: Number(perfilId),
          estado_id: Number(estadoId),
          editar: password.trim() === '' ? 0 : 1,
        })

        if (status === 200) {
          setShow(false)
          await fetchUsuarios()
          openAlert('ok', 'Se modificó el registro exitosamente', 'bg-success')
        } else {
          openAlert('warning', 'Se produjo un error inesperado', 'bg-danger')
        }
      }
    } catch (error) {
      openAlert('warning', 'Error de conexion con el servidor', 'bg-danger')
    }
  }

  const handleEliminar = (id) => {
    showConfirm({
      titulo: 'Confirmar',
      detalle: '¿Realmente desea eliminar este registro?',
      headerBg: 'bg-info',
      esConfirm: true,
      confirmText: 'Si, eliminar',
      cancelText: 'Cancelar',
      onConfirm: async () => {
        try {
          const status = await deleteData(id)
          if (status === 200 || status === 204) {
            await fetchUsuarios()
            openAlert('ok', 'Se eliminó el registro exitosamente', 'bg-success')
          } else {
            openAlert('warning', 'Se produjo un error inesperado', 'bg-danger')
          }
        } catch (error) {
          openAlert('warning', 'Error de conexion con el servidor', 'bg-danger')
        }
      },
    })
  }

  return (
    <>
      <AlertCustom
        estado={alertData.estado}
        titulo={alertData.titulo}
        detalle={alertData.detalle}
        onClose={closeAlert}
        headerBg={alertData.headerBg}
      />

      <div className="wrapper">
        <Menu />

        <div className="main">
          <Header />
          <main className="content">
            <div className="container-fluid p-0">
              <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Usuarios</Breadcrumb.Item>
              </Breadcrumb>

              <h1 className="h3 mb-3">Usuarios</h1>

              <div className="row">
                <div className="col-12 col-lg-12 d-flex">
                  <div className="card flex-fill">
                    <div className="card-header">
                      <button
                        type="button"
                        className="btn btn-outline-primary float-end"
                        title="Crear"
                        onClick={openCrear}
                      >
                        <i className="fas fa-check"></i> Crear
                      </button>
                      <h5 className="card-title mb-0"></h5>
                    </div>

                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hover">
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Perfil</th>
                              <th>Estado</th>
                              <th>Nombre</th>
                              <th>Correo</th>
                              <th>Telefono</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan={7} className="text-center">
                                  Cargando usuarios
                                </td>
                              </tr>
                            ) : datos.length === 0 ? (
                              <tr>
                                <td colSpan={7} className="text-center">
                                  No hay usuarios para mostrar.
                                </td>
                              </tr>
                            ) : (
                              datos.map((dato) => (
                                <tr key={dato.id}>
                                  <td>{dato.id}</td>
                                  <td>{dato.perfil ?? '-'}</td>
                                  <td>
                                    <div
                                      className={`text-${Number(dato.estado_id) === 1 ? 'primary' : 'danger'}`}
                                      style={{ fontWeight: 'bold' }}
                                    >
                                      {dato.estado ?? (Number(dato.estado_id) === 1 ? 'Activo' : 'Inactivo')}
                                    </div>
                                  </td>
                                  <td>{dato.nombre}</td>
                                  <td>{dato.correo}</td>
                                  <td>{dato.telefono ?? '-'}</td>
                                  <td className="text-center">
                                    <button
                                      type="button"
                                      className="btn btn-link p-0"
                                      onClick={() => openEditar(dato)}
                                      title="Editar"
                                    >
                                      <i className="fas fa-edit"></i>
                                    </button>
                                    {'  '}
                                    <button
                                      type="button"
                                      className="btn btn-link p-0"
                                      onClick={() => handleEliminar(dato.id)}
                                      title="Eliminar"
                                    >
                                      <i className="fas fa-trash"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>

      <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>{accion === 'crear' ? 'Crear' : 'Editar'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row gy-3">
              {accion === 'editar' && (
                <div className="col-lg-12">
                  <label htmlFor="estado_id">Estado</label>
                  <select
                    id="estado_id"
                    value={estadoId}
                    onChange={(e) => setEstadoId(e.target.value)}
                    className="form-control"
                  >
                    {estados.map((estado) => (
                      <option key={estado.id} value={estado.id}>
                        {estado.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="col-lg-12">
                <label htmlFor="perfil_id">Perfil</label>
                <select
                  id="perfil_id"
                  value={perfilId}
                  onChange={(e) => setPerfilId(e.target.value)}
                  className="form-control"
                >
                  <option value="0">Seleccione</option>
                  {perfiles.map((perfil) => (
                    <option key={perfil.id} value={perfil.id}>
                      {perfil.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-lg-12">
                <label className="form-label" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  className="form-control"
                  id="nombre"
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="col-lg-12">
                <label className="form-label" htmlFor="correo">
                  Correo
                </label>
                <input
                  className="form-control"
                  id="correo"
                  type="text"
                  placeholder="Correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </div>

              <div className="col-lg-12">
                <label className="form-label" htmlFor="telefono">
                  Telefono
                </label>
                <input
                  className="form-control"
                  id="telefono"
                  type="text"
                  placeholder="Telefono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>

              <div className="col-lg-12">
                <label className="form-label" htmlFor="password">
                  Contrasena
                </label>
                <input
                  className="form-control"
                  id="password"
                  type="password"
                  placeholder={accion === 'editar' ? 'Nueva contrasena (opcional)' : 'Contrasena'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <hr />

            <div className="row">
              <div className="col-6"></div>
              <div className="col-6 d-flex justify-content-end">
                <button className="btn btn-primary" type="submit">
                  {accion === 'crear' ? (
                    <>
                      <i className="fas fa-plus"></i> Crear
                    </>
                  ) : (
                    <>
                      <i className="fas fa-pencil-alt"></i> Editar
                    </>
                  )}
                </button>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Users
