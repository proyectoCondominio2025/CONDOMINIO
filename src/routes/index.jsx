import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import HomePage from '../Pages/HomePage';
import ContactoPage from '../Pages/ContactoPage';
import LoginPage from '../Pages/autenticacion/LoginPage';
import ForgotPassaword from '../Pages/autenticacion/ForgotPassword';
import IngresoVisita from '../Pages/UserPortero/IngresoVisitaPage';
import ListaVehiculo from '../Pages/UserPortero/ListaVehiculoPage';
import ListaVisita from '../Pages/UserPortero/ListaVisitaPage';
import CrearUsuarios from '../Pages/UserAdministrador/crearUsuario/CrearUsuarios';
import ListaUsuarios from '../Pages/UserAdministrador/listaUsuarios';
import HomeAdmin from '../Pages/UserAdministrador/HomeAdmin';
import ListaNoticias from '../Pages/UserAdministrador/ListaNoticias';
import CrearNoticias from '../Pages/UserAdministrador/CrearNoticias';
import ListarPagos from '../Pages/UserAdministrador/ListarPAgos';
import { ResidentsHomePageWithAnnouncements } from '../Pages/UserResidente/ResidentsHomePageWithAnnouncements';
import PaymentHistoryPage from '../Pages/UserResidente/PaymentHistoryPage';
import { UserProfilePage } from '../Pages/UserProfilePage';
import MiPerfil from '../Pages/MiPerfilPage';
import MenuNavbar from '../Pages/components/MenuNavbar';
import MenuNavbarPortero from '../Pages/components/MenuNavbarPortero';
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

    ]
  },

  {
    path: '/admin',
    element: <LayoutAdmin/>,
    children: [
      {
        path: '/admin',
        element: <HomeAdmin/>,
        index:true
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
    ]
  },

  {
    path: '/',
    element: <LayoutResidente/>,
    children: [
      {
        path: '/home-residente',
        element: <HomeResidente />,
      },
      {
        path: '/historial-pago',
        element: <HistorialPagos />,
      },
      {
        path: '/perfil-residente',
        element: <PerfilResidente />,
      },
    ]
      
  },
  
  {
    path: '/pago',
    element: < PagoPage />,
    children: [
      {
        path: '/pago/success',
        element: < PagoExitoPage />,
      },
      {
        path: '/pago/failure',
        element: < PagoFallidoPage />,
      },
      {
        path: '/pago/pending',
        element: < PagoPendientePage />,
      },
    ]
  },
  {
    path: '/ingreso-visita',
    element: <IngresoVisita />,
  },
  {
    path: '/lista-vehiculo',
    element: <ListaVehiculo />,
  },
  {
    path: '/lista-visita',
    element: <ListaVisita />,
  },

  {
    path: '/perfil',
    element: <MiPerfil />,
  },

]);



