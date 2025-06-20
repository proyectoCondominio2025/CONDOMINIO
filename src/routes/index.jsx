import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import HomePage from '../Pages/HomePage';
import ContactoPage from '../Pages/ContactoPage';
import LoginPage from '../Pages/autenticacion/LoginPage';
import ForgotPassaword from '../Pages/autenticacion/ForgotPassword';
import CrearUsuarios from '../Pages/UserAdministrador/crearUsuario/CrearUsuarios';
import ListaUsuarios from '../Pages/UserAdministrador/listaUsuarios';
import PagosUsuarios from '../Pages/UserAdministrador/PagosUsuarios';
import HomeAdmin from '../Pages/UserAdministrador/HomeAdmin';
import ListaNoticias from '../Pages/UserAdministrador/ListaNoticias';
import CrearNoticias from '../Pages/UserAdministrador/CrearNoticias';
import ListarPagos from '../Pages/UserAdministrador/ListarPagos';
import { ResidentsHomePageWithAnnouncements } from '../Pages/UserResidente/ResidentsHomePageWithAnnouncements';
import PaymentHistoryPage from '../Pages/UserResidente/PaymentHistoryPage';
import { UserProfilePage } from '../Pages/UserProfilePage';
import MiPerfil from '../Pages/MiPerfilPage';
import MenuNavbar from '../Pages/components/MenuNavbar';
import { Footer } from '../Pages/components/footer';
import HistorialPagos from '../Pages/UserResidente/HistorialPagoPage';
import DetallePago from '../Pages/UserResidente/DetallePago';
import PagoPage from '../Pages/pago/pago';
import PagoExitoPage from '../Pages/pago/PagoExitoso';
import PagoFallidoPage from '../Pages/pago/PagoFallido';
import PagoPendientePage from '../Pages/pago/PagoPendiente';
import LayoutAdmin from '../Pages/layout/LayoutAdmin';
import LayoutResidente from '../Pages/layout/LayoutResidente';
import HomeResidente from '../Pages/UserResidente/HomeResidente';
import PerfilResidente from '../Pages/UserResidente/PerfilResidente';
import ProtectedRoute from '../Pages/components/PrivateRoute';
import LayoutPortero from '../Pages/layout/LayoutPortero';
import IngresoVisitaPage from '../Pages/UserPortero/IngresoVisitaPage';
import ListaVehiculoPage from '../Pages/UserPortero/ListaVehiculoPage';
import ListaVisitaPage from '../Pages/UserPortero/ListaVisitaPage'
import ListarFormulario from '../Pages/UserAdministrador/ListaFormulario';
import RestablecerContrasenaPage from '../Pages/autenticacion/ResetPassword';

export const RoutesComponent = createBrowserRouter([
  {
    path: '/',
    element: <><MenuNavbar /><Footer /></>,
    children: [
      {
        element: <HomePage />,
        index: true
      },
      {
        path: '/contacto',
        element: <ContactoPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassaword />,
      },
      {
        path : '/restablecer-contraseña',
        element: <RestablecerContrasenaPage/>
      }
    ]
  },

  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={"admin"}>
        <LayoutAdmin />
      </ProtectedRoute>),
    children: [
      {
        path: '/admin',
        element: <HomeAdmin />,
        index: true
      },
      {
        path: '/admin/crear-usuarios',
        element: <CrearUsuarios />,
      },
      {
        path: '/admin/listar-usuarios',
        element: <ListaUsuarios />,
      },
      {
        path: '/admin/listar-noticias',
        element: <ListaNoticias />,
      },
      {
        path: '/admin/crear-noticias',
        element: <CrearNoticias />,
      },
      {
        path: '/admin/listar-pagos',
        element: <ListarPagos />,
      },
      {
        path: '/admin/perfil',
        element: <MiPerfil />,
      },
      {
        path: '/admin/usuario-pagos/:id',
        element: <PagosUsuarios />,
      },
      {
        path: '/admin/listar-formularios',
        element: <ListarFormulario />,
      },
      {
        path: '/admin/perfil-residente',
        element: <PerfilResidente />,
      },
    ]
  },

  {
    path: '/residente',
    element:
      (<ProtectedRoute allowedRoles={"residente"}>
        <LayoutResidente />
      </ProtectedRoute>),
    children: [
      {
        path: '/residente',
        element: <HomeResidente />,
      },
      {
        path: '/residente/historial-pago',
        element: <HistorialPagos />,
      },
      {
        path: '/residente/perfil-residente',
        element: <PerfilResidente />,
      },
    ]

  },

  // {
  //   path: '/pago',
  //   element: < PagoPage />,
  //   children: [
  //     {
  //       path: '/pago/success',
  //       element: < PagoExitoPage />,
  //     },
  //     {
  //       path: '/pago/failure',
  //       element: < PagoFallidoPage />,
  //     },
  //     {
  //       path: '/pago/pending',
  //       element: < PagoPendientePage />,
  //     },
  //   ]
  // },

  {
    path: '/portero',
    element:
    (<ProtectedRoute allowedRoles={"portero"}>
      <LayoutPortero/>
      </ProtectedRoute> ),
    children: [
      {
        path: '/portero/ingreso-visita',
        element: <IngresoVisitaPage />,
      },
      {
        path: '/portero/lista-vehiculo',
        element: <ListaVehiculoPage />,
      },
      {
        path: '/portero/lista-visita',
        element: <ListaVisitaPage/>,
      },

      // {
      //   path: '/portero/perfil',
      //   element: <MiPerfil />,
      // },
    ]
  },


]);



