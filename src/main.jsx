import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/style.css'

import { AuthProvider } from './context/AuthProvider'
import FrontEnd from './components/frontend'
import Home from './pages/home'
import Login from './pages/login'
import Perfiles from './pages/perfiles'
import Users from './pages/users'
import Error500 from './pages/error500'
import Error404 from './pages/error404'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <FrontEnd />,
      children: [
        {
          index: true,
          element: <Home />,
          errorElement: <Error500 />,
        },
        {
          path: 'login',
          element: <Login />,
          errorElement: <Error500 />,
        },
        {
          path: 'home',
          element: <Home />,
          errorElement: <Error500 />,
        },
        {
          path: 'perfiles',
          element: <Perfiles />,
          errorElement: <Error500 />,
        },
        {
          path: 'users',
          element: <Users />,
          errorElement: <Error500 />,
        },
      ]
    },
    {
      path: '*',
      element: <Error404 />,
    },
  ]
)

const rootElement = document.getElementById('root')

if (rootElement) {
  createRoot(rootElement).render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
} else {
  console.error('No se encontró el elemento con id "root".')
}
