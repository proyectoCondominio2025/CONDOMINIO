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
import { ResidentsHomePageWithAnnouncements } from '../Pages/UserResidente/ResidentsHomePageWithAnnouncements';
import PaymentHistoryPage from '../Pages/UserResidente/PaymentHistoryPage';
import { UserProfilePage } from '../Pages/UserProfilePage'; 

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
    path: '/ForgotPassowrd',
    element: <ForgotPassaword/>,
  },
  {
    path: '/ingreso-visita',
    element: <IngresoVisita/>,
  },
  {
    path: '/listaVehiculo',
    element: <ListaVehiculo/>,
  },
  {
    path: '/listaVisita',
    element: <ListaVisita/>,
  },
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
]);

//   <Routes>
//     <Route path="/home" element={<HomePage />} />
//     <Route path="/contacto" element={<ContactoPage />} />
//     <Route path="/login" element={<LoginPage />} />
//   </Routes>
// );


