import { useState } from 'react'

export const defaultAlertConfig = {
  estado: false,
  titulo: '',
  detalle: '',
  headerBg: 'primary',
  esConfirm: false,
  confirmText: 'Aceptar',
  cancelText: 'Cancelar',
}

export function useAlertCustom(initialConfig = defaultAlertConfig) {
  const [alerta, setAlerta] = useState({ ...defaultAlertConfig, ...initialConfig })

  const openAlert = (config = {}) => {
    setAlerta({
      ...defaultAlertConfig,
      ...config,
      estado: true,
    })
  }

  const closeAlert = () => {
    setAlerta((current) => ({
      ...current,
      estado: false,
    }))
  }

  const confirmAlert = () => {
    if (typeof alerta.onConfirm === 'function') {
      alerta.onConfirm()
    }

    closeAlert()
  }

  return {
    alerta,
    setAlerta,
    openAlert,
    closeAlert,
    confirmAlert,
  }
}
