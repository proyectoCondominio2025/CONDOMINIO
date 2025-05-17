import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import HomePage from '../Pages/HomePage';
import ContactoPage from '../Pages/ContactoPage';
import LoginPage from '../Pages/LoginPage';
import ForgotPassaword from '../Pages/ForgotPassword';
import IngresoVisita from '../Pages/UserPortero/IngresoVisitaPage';
import ListaVehiculo from '../Pages/UserPortero/ListaVehiculoPage';
import ListaVisita from '../Pages/UserPortero/ListaVisitaPage';
import CrearUsuarios from '../Pages/UserAdministrador/CrearUsuarios';
import ListaUsuarios from '../Pages/UserAdministrador/listaUsuarios';
import HomeAdmin from '../Pages/UserAdministrador/HomeAdmin';
import AdminNavbar from '../Pages/components/AdminNavbar';
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
        path: '/forgot-password' ,
        element: <ForgotPassaword />,
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
  
  {
    path: '/historial-pago',
    element: <HistorialPagos/>,
  },
  {
    path: '/CrearUsuarios',
    element: <CrearUsuarios/>,
  },
  {
    path: '/ListaUsuarios',
    element: <ListaUsuarios/>,
  },
  {
    path: '/ListaNoticias',
    element: <ListaNoticias/>,
  },
  {
    path: '/HomeAdmin',
    element: <HomeAdmin/>,
  },
  {
    path: '/AdminNavbar',
    element: <AdminNavbar/>,
  },
  {
    path: '/CrearNoticias',
    element: <CrearNoticias/>,
  },
  {
    path: '/ListarPagos',
    element: <ListarPagos/>,
  }

]);



