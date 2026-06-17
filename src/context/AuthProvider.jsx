import { createContext, useState } from 'react'
import AlertCustom from '../custom/AlertCustom'

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(localStorage.getItem('menu_flaites_id') !== null)
  const [confirmData, setConfirmData] = useState(null)

  const handleIniciarSesion = (id, nombre, token, perfilId) => {
    localStorage.setItem('menu_flaites_id', String(id))
    localStorage.setItem('menu_flaites_nombre', String(nombre))
    localStorage.setItem('menu_flaites_token', String(token))
    localStorage.setItem('menu_flaites_perfil_id', String(perfilId))
    setAuth(true)
  }

  const handleValidarAcceso = (perfilId) => {
    if (localStorage.getItem('menu_flaites_perfil_id') !== String(perfilId)) {
      window.location.href = '/error'
    }
  }

  const handleEstasLogueado = () => {
    const logged = localStorage.getItem('menu_flaites_id') !== null
    setAuth(logged)

    if (!logged) {
      window.location.href = '/login'
    }
  }

  const closeConfirm = () => {
    setConfirmData(null)
  }

  const showConfirm = (data) => {
    setConfirmData({
      ...data,
      estado: true,
      onClose: () => {
        if (typeof data?.onClose === 'function') {
          data.onClose()
        }
        closeConfirm()
      },
    })
  }

  const handleCerrarSesion = () => {
    showConfirm({
      titulo: 'Confirmar',
      detalle: '¿Realmente desea cerrar la sesión?',
      headerBg: 'bg-info',
      esConfirm: true,
      confirmText: 'Si, cerrar sesion',
      cancelText: 'Cancelar',
      onConfirm: () => {
        localStorage.clear()
        setAuth(false)
        closeConfirm()
        window.location.href = '/login'
      },
    })
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        handleIniciarSesion,
        handleEstasLogueado,
        handleCerrarSesion,
        handleValidarAcceso,
        showConfirm,
        confirmData,
        setConfirmData,
      }}
    >
      {children}
      {confirmData && (
        <AlertCustom
          estado={confirmData.estado}
          titulo={confirmData.titulo}
          detalle={confirmData.detalle}
          onClose={confirmData.onClose}
          onConfirm={confirmData.onConfirm}
          headerBg={confirmData.headerBg}
          esConfirm={confirmData.esConfirm}
          confirmText={confirmData.confirmText}
          cancelText={confirmData.cancelText}
        />
      )}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
export default AuthContext
