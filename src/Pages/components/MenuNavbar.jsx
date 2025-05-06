import React from 'react'; 
import { Outlet, Link } from 'react-router-dom'; 
import { Navbar, Container, Nav } from 'react-bootstrap'; 
import IngresoSmart from '../../assets/IngresoSmart.png'; 

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
              <Nav.Link as={Link} to="/" className="text-black" activeClassName="active">Inicio</Nav.Link>
              {/* <Nav.Link as={Link} to="/" className="text-black" activeClassName="active">Noticias</Nav.Link> */}
              <Nav.Link as={Link} to="/contacto" className="text-black" activeClassName="active">Formulario Contacto</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/login" className="text-white">
                <div className="d-flex align-items-center justify-content-center p-2 rounded-3 login-btn">
                  <i className="bi bi-person-circle" style={{ fontSize: '1.8rem' }}></i>
                  <div className="ms-2" style={{ fontSize: '0.85rem' }}>Iniciar sesión</div>
                </div>
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
