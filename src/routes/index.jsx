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


]);

//   <Routes>
//     <Route path="/home" element={<HomePage />} />
//     <Route path="/contacto" element={<ContactoPage />} />
//     <Route path="/login" element={<LoginPage />} />
//   </Routes>
// );


