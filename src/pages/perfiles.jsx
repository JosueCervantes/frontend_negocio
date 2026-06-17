import { useContext, useEffect, useState } from 'react'
import { Breadcrumb, Form, Modal } from 'react-bootstrap'

import Footer from '../components/footer'
import Header from '../components/header'
import Menu from '../components/menu'
import AlertCustom from '../custom/AlertCustom'
import AuthContext from '../context/AuthProvider'

const Perfiles = () => {
  const context = useContext(AuthContext)

  const perfiles = [{ id: 1, nombre: 'Admin' },{ id: 2, nombre: 'Negocio' }]

  if (!context) {
    return <div>Error: No se pudo cargar el contexto de autenticacion.</div>
  }

  const { handleValidarAcceso, showConfirm } = context

  useEffect(() => {
    handleValidarAcceso('1')
  }, [handleValidarAcceso])

  const [datos, setDatos] = useState(perfiles)
  const [show, setShow] = useState(false)
  const [accion, setAccion] = useState('crear')
  const [accionId, setAccionId] = useState(null)
  const [nombre, setNombre] = useState('')

  const [alertData, setAlertData] = useState({
    estado: false,
    titulo: '',
    detalle: '',
    headerBg: 'bg-primary',
  })

  // Obtener el siguiente ID
  const getNextId = (items) => {
    const lastId = items.reduce((max, item) => (item.id > max ? item.id : max), 0)
    return lastId + 1
  }

  const handleCloseModal = () => {
    setAlertData((prev) => ({ ...prev, estado: false }))
  }

  const openAlert = (titulo, detalle, headerBg) => {
    setAlertData({
      estado: true,
      titulo,
      detalle,
      headerBg,
    })
  }

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const handleCrear = () => {
    setAccion('crear')
    setAccionId(null)
    setNombre('')
    handleShow()
  }

  const handleEditar = (perfil) => {
    setAccion('editar')
    setAccionId(perfil.id)
    setNombre(perfil.nombre)
    handleShow()
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (nombre.trim() === '') {
      openAlert('Warning', 'El campo nombre es obligatorio', 'bg-danger')
      return
    }

    if (accion === 'crear') {
      setDatos((prev) => [...prev, { id: getNextId(prev), nombre: nombre.trim() }])
      openAlert('ok', 'Se creo el registro exitosamente', 'bg-success')
      handleClose()
      return
    }

    if (accion === 'editar') {
      setDatos((prev) =>
        prev.map((item) =>
          item.id === accionId ? { ...item, nombre: nombre.trim() } : item,
        ),
      )
      openAlert('ok', 'Se modifico el registro exitosamente', 'bg-success')
      handleClose()
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
      onConfirm: () => {
        setDatos((prev) => prev.filter((item) => item.id !== id))
        openAlert('ok', 'Se elimino el registro exitosamente', 'bg-success')
      },
    })
  }

  return (
    <>
      <AlertCustom
        estado={alertData.estado}
        titulo={alertData.titulo}
        detalle={alertData.detalle}
        onClose={handleCloseModal}
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
                <Breadcrumb.Item active>Perfiles</Breadcrumb.Item>
              </Breadcrumb>

              <h1 className="h3 mb-3">Perfiles</h1>

              <div className="row">
                <div className="col-12 col-lg-12 d-flex">
                  <div className="card flex-fill">
                    <div className="card-header">
                      <button
                        type="button"
                        className="btn btn-outline-primary float-end"
                        title="Crear"
                        onClick={handleCrear}
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
                              <th>Nombre</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {datos.map((dato) => (
                              <tr key={dato.id}>
                                <td>{dato.id}</td>
                                <td>{dato.nombre}</td>
                                <td className="text-center">
                                  <button
                                    type="button"
                                    className="btn btn-link p-0"
                                    onClick={() => handleEditar(dato)}
                                    title="Editar"
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button> {'  '}
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
                            ))}
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

      <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>{accion === 'crear' ? 'Crear' : 'Editar'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row gy-3">
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

export default Perfiles
