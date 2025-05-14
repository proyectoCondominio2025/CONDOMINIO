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
import CrearUsuarios from '../Pages/UserAdministrador/CrearUsuarios';
import ListaUsuarios from '../Pages/UserAdministrador/listaUsuarios';
import HomeAdmin from '../Pages/UserAdministrador/HomeAdmin';
import AdminNavbar from '../Pages/components/AdminNavbar';
import ListaNoticias from '../Pages/UserAdministrador/ListaNoticias';
import CrearNoticias from '../Pages/UserAdministrador/CrearNoticias';
import ListarPagos from '../Pages/UserAdministrador/ListarPAgos';



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
    path: '/miPerfil',
    element: <MiPerfil/>,
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

//   <Routes>
//     <Route path="/home" element={<HomePage />} />
//     <Route path="/contacto" element={<ContactoPage />} />
//     <Route path="/login" element={<LoginPage />} />
//   </Routes>
// );


