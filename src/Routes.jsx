import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ContactoPage from './Pages/ContactoPage';
import LoginPage from './Pages/LoginPage';


const RoutesComponent = () => (
  <Routes>
    <Route path="/home" element={<HomePage />} />
    <Route path="/contacto" element={<ContactoPage />} />
    <Route path="/login" element={<LoginPage />} />
  </Routes>
);

export default RoutesComponent;
