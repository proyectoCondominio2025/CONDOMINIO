import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Pages/HomePage';
import ContactoPage from './Pages/ContactoPage';
import LoginPage from './Pages/LoginPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contacto" element={<ContactoPage />} /> {/* Ruta para ContactoPage */}
      </Routes>
    </Router>
    
    // <Home />
  );
}

export default App;
