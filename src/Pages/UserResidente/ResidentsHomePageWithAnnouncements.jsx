import React from 'react';
import { Container, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { Footer } from '../../components/footer';
import NoticiaPage from '../NoticiaPage';

export const ResidentsHomePageWithAnnouncements = () => {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#E9E9EC' }}>
      
      {/* Navbar principal */}
      <Navbar expand="lg" className="border-bottom py-0" style={{ backgroundColor: '#AFD3D1', minHeight: '80px' }}>
        <Container fluid className="h-100 px-0 d-flex align-items-center">

          {/* Logo y buscador */}
          <div className="d-flex align-items-center flex-grow-1">
            <Navbar.Brand className="p-0 m-0 d-flex align-items-center" style={{ height: '100%' }}>
              <a href="/" className="d-flex align-items-center" style={{ height: '100%' }}>
                <img
                  src="/src/Logo/IngresoSmart.png"
                  alt="Logo"
                  style={{
                    height: '100%',
                    width: '85px',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </a>
            </Navbar.Brand>

            <div className="d-flex align-items-center w-100 ms-3">
              <Form style={{ width: '250px' }}>
                <FormControl
                  type="search"
                  placeholder="Buscar"
                  className="rounded-pill px-3 bg-white"
                  style={{
                    height: '38px',
                    fontSize: '0.9rem',
                    boxShadow: 'none'
                  }}
                />
              </Form>
            </div>
          </div>

          {/* Sección derecha */}
          <div className="d-flex align-items-center gap-4 ms-auto me-4">
            <Nav.Link
              href="/login"
              className="text-dark fw-medium text-decoration-none border-bottom border-2 border-dark pb-1"
              style={{ borderRadius: 0 }}
            >
              Iniciar sesión
            </Nav.Link>

            <Nav.Link
              href="/profile"
              className="text-dark fw-medium d-flex align-items-center gap-2 text-decoration-none border-bottom border-2 border-dark pb-1"
              style={{ borderRadius: 0 }}
            >
              Perfil
              <FaUserCircle size={20} />
            </Nav.Link>
          </div>

        </Container>
      </Navbar>

      {/* Navbar secundaria */}
      <div className="d-flex justify-content-center my-3">
        <Nav className="gap-3">
          <Nav.Link href="/" className="text-dark fw-medium px-2">INICIO</Nav.Link>

          <NavDropdown
            title={<span className="text-dark">SELECCIONAR ANUNCIO</span>}
            id="nav-dropdown"
            className="fw-medium"
          >
            <NavDropdown.Item href="#seguridad">Seguridad</NavDropdown.Item>
            <NavDropdown.Item href="#mantenimiento">Mantenimiento</NavDropdown.Item>
            <NavDropdown.Item href="#eventos">Eventos</NavDropdown.Item>
          </NavDropdown>

          <Nav.Link href="/historialPago" className="text-dark fw-medium px-2">HISTORIAL DE PAGOS</Nav.Link>
          <Nav.Link href="/contacto" className="text-dark fw-medium px-2">CONTACTO</Nav.Link>
        </Nav>
      </div>

      {/* Contenido principal */}
      <Container fluid className="flex-grow-1 mb-5">
        <NoticiaPage/>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};
