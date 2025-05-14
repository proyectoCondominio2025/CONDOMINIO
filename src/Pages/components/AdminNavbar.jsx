import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IngresoSmart from '../../Logo/IngresoSmart.png';

function AdminNavbar() {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/HomeAdmin" className="d-flex align-items-center">
        <img
          src={IngresoSmart}
          alt="Logo"
          width="50"
          height="50"
          className="d-inline-block align-top me-2"
        />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to = "/HomeAdmin">Home </Nav.Link>
            <Nav.Link as={Link} to="/ListaUsuarios">Crear/listar Usuario</Nav.Link>
            <Nav.Link as={Link} to="/ListaNoticias">Crear/listar Noticias</Nav.Link>
            <Nav.Link as={Link} to="/ListarPagos"> Listar Pagos</Nav.Link>

          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/login">
              <i className="bi bi-person-circle" style={{ fontSize: '1.8rem' }}></i>
              <div style={{ fontSize: '0.85rem', marginTop: '4px' }}>Iniciar sesión</div>
            </Nav.Link>
          </Nav>          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
