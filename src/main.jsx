import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import { createBrowseRouter, BrowserRouter } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
import './styles/style.css'

//componentes
import FrontEnd from './components/frontend'
import Header from './components/header'
import Footer from './components/footer'

//pages
import Home from './pages/home'
import Login from './pages/login'
import Perfiles from './pages/perfiles'
import Users from './pages/users'
import error404 from './pages/error404'
import error405 from './pages/error405'

import RecoveryUpdate from './pages/restablecer/RecoveryUpdate'
import Restablecer from './pages/restablecer/Restablecer'

let router = createBrowseRouter(
  [
    {
      path: '/',
      element: <FrontEnd />,
      children: [
        {
          index: true,
          element: <Home />,
          errorElement: <error405 />,
        },
        {
          path: 'home',
          element: <Login />,
          errorElement: <error405 />,
        },
        {
          path: 'perfiles',
          element: <Perfiles />,
          errorElement: <error405 />,
        },
        {
          path: 'users',
          element: <Users />,
          errorElement: <error405 />,
        }
      ]
    },
    {
      path: 'restablecer',
      element: <Restablecer />,
    },
    {
      path: 'recovery/update/:token',
      element: <RecoveryUpdate />,
    }
  ]
)

let rootElement = document.getElementById('root')

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
} else {
  console.error('No se encontró el elemento con id "root".')
}
