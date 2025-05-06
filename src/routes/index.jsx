import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import HomePage from '../Pages/HomePage';
import ContactoPage from '../Pages/ContactoPage';
import LoginPage from '../Pages/LoginPage';
import NoticiaPage from '../Pages/NoticiaPage';
import ForgotPassaword from '../Pages/ForgotPassword';
import IngresoVisita from '../Pages/UserPortero/IngresoVisitaPage';
import ListaVehiculo from '../Pages/UserPortero/ListaVehiculoPage';
import ListaVisita from '../Pages/UserPortero/ListaVisitaPage';

//import { ResidentsHomePageWithAnnouncements } from '../Pages/UserResidente/ResidentsHomePageWithAnnouncements';
//import PaymentHistoryPage from '../Pages/UserResidente/PaymentHistoryPage';
//import { UserProfilePage } from '../Pages/UserProfilePage'; 

import MiPerfil from '../Pages/MiPerfilPage';
import MenuNavbar from '../Pages/components/MenuNavbar';



export const RoutesComponent = createBrowserRouter([
  {
    path: '/',
    element: <MenuNavbar />,
    children: [
      {
        path: 'home',
        element: <HomePage />
      },
      {
        path: '/perfil',
        element: <MiPerfil />,
      },

      {
        path: '/contacto',
        element: <ContactoPage />,
      },
      {
        path: '/noticia',
        element: <NoticiaPage />,
      },
    ]
  },

  {
    path: '/login',
    element: <LoginPage />,
  },

  {
    path: '/forgot-password' ,
    element: <ForgotPassaword />,
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
//roberto
  {
    path: '/residentesAnuncios',
    element: <ResidentsHomePageWithAnnouncements/>,
  },
  {
    path: '/historialPago',
    element: <PaymentHistoryPage/>,
  },
  {
    path: '/profile',
    element: <UserProfilePage/>
  },
    path: '/perfil',
    element: <MiPerfil/>,
  }

]);



