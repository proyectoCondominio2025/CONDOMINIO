import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import HomePage from '../Pages/HomePage';
import ContactoPage from '../Pages/ContactoPage';
import LoginPage from '../Pages/LoginPage';



export const RoutesComponent = createBrowserRouter([
  {
    path: '/',
    element: < HomePage />,
    index: true
  },
  {
    path: '/contacto',
    element: <ContactoPage/>,
  },
  {
    path: '/login',
    element: <LoginPage/>,
  }
]);

//   <Routes>
//     <Route path="/home" element={<HomePage />} />
//     <Route path="/contacto" element={<ContactoPage />} />
//     <Route path="/login" element={<LoginPage />} />
//   </Routes>
// );


