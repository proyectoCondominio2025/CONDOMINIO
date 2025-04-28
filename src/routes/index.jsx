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




export const RoutesComponent = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
    index: true
  },
  {
    path: '/contacto',
    element: <ContactoPage/>,
  },
  {
    path: '/login',
    element: <LoginPage/>,
  },
  {
    path: '/noticia',
    element: <NoticiaPage/>,
  },
  {
    path: '/Forgot-passowrd',
    element: <ForgotPassaword/>,
  },
  {
    path: '/ingreso-visita',
    element: <IngresoVisita/>,
  },
  {
    path: '/lista-vehiculo',
    element: <ListaVehiculo/>,
  },
  {
    path: '/lista-visita',
    element: <ListaVisita/>,
  },
  {
    path: '/perfil',
    element: <MiPerfil/>,
  }
]);

//   <Routes>
//     <Route path="/home" element={<HomePage />} />
//     <Route path="/contacto" element={<ContactoPage />} />
//     <Route path="/login" element={<LoginPage />} />
//   </Routes>
// );


