import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import IngresoSmart from '../../Logo/IngresoSmart.jpeg';
import { jwtDecode } from 'jwt-decode';


const MenuNavbar = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();


  let usuario = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      usuario = {
        nombre: decoded.nombre,
        tipo: decoded.tipo_de_usuario
      };
    } catch (e) {
      console.error("Token inválido:", e);
      localStorage.removeItem("accessToken"); // Limpia si está corrupto
    }
  }

  const redirigirSegunRol = () => {
    if (!usuario) return;

    if (usuario.tipo === "residente") {
      navigate("/residente");
    } else if (usuario.tipo === "portero") {
      navigate("/portero/lista-visita");
    } else if (usuario.tipo === "admin") {
      navigate("/admin");
    }
  };

    function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <Navbar expand="lg" className="custom-navbar mx-5">

          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src={IngresoSmart}
              alt="Logo"
              width="50"
              height="50"
              className="d-inline-block align-top me-2 logo-expand-effect"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="text-black">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/contacto" className="text-black">Formulario Contacto</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              {!usuario ? (
                <Nav.Link as={Link} to="/login" className="text-white">
                  <div className="d-flex align-items-center justify-content-center p-2 rounded-3 login-btn">
                    <i className="bi bi-person-circle" style={{ fontSize: '1.8rem' }}></i>
                    <div className="ms-2" style={{ fontSize: '0.85rem' }}>Iniciar sesión</div>
                  </div>
                </Nav.Link>
              ) : (
                <NavDropdown
                  title={
                    <div className="d-flex align-items-center">
                      <i className="bi bi-gear text-dark fs-5" style={{ fontSize: '1.8rem', marginRight: '0.5rem' }}></i>
                      <span style={{ fontSize: '0.85rem' }}>{capitalizarPrimeraLetra(usuario.nombre)}</span>
                    </div>
                  }
                  id="usuario-dropdown"
                  align="end"
                  menuVariant="light"
                >
                  <NavDropdown.Item onClick={redirigirSegunRol}>
                    Ir a mi panel
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => {
                    localStorage.removeItem("accessToken");
                    navigate("/login");
                  }}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
      </Navbar>

      <main className="p-3">
        <Outlet />
      </main>

    </>
  );
};

export default MenuNavbar;
