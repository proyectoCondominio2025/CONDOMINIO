import React from 'react'; 
import { Outlet, Link } from 'react-router-dom'; 
import { Navbar, Container, Nav } from 'react-bootstrap'; 
import IngresoSmart from '../../assets/IngresoSmart.png'; 
import { FaUserCircle } from "react-icons/fa";

const MenuNavbar = () => {
  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
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
              <Nav.Link as={Link} to="/home-residente" className="text-black" activeClassName="active">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/historial-pago" className="text-black" activeClassName="active">Historial de pago</Nav.Link>
              </Nav>
               {/* Mi perfil a la derecha con icono */}
                <Nav className="ms-auto ">
                  <Nav.Link
                    as={Link}
                    to="/perfil-residente"
                    className="text-black fw-semibold px-3 d-flex align-items-center gap-2"
                  >
                    <FaUserCircle size={22} className="me-1" />
                  </Nav.Link>
              </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};

export default MenuNavbar;
