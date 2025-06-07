import React from 'react';
import { Navbar, Nav, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import IngresoSmart from '../../Logo/IngresoSmart.jpeg';
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const cerrarSesion = () => {

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate("/");
  }

  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/admin" className="d-flex align-items-center">
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
              <Nav.Link as={Link} to="/admin" className='mx-3'>Home </Nav.Link>
              <Nav.Link as={Link} to="/admin/listar-usuarios" className='mx-3'>Crear/listar Usuario</Nav.Link>
              <Nav.Link as={Link} to="/admin/listar-noticias" className='mx-3'>Crear/listar Noticias</Nav.Link>
              <Nav.Link as={Link} to="/admin/listar-pagos" className='mx-3'>Pagos</Nav.Link>

            </Nav>
            <Nav className="ms-auto">

              <DropdownButton variant='outline-light' id="dropdown-basic-button" drop={'start'} title={<i class="bi bi-gear text-dark fs-5"></i>}>
                <Dropdown.Item href="/admin/perfil">Mi perfil</Dropdown.Item>
                <Dropdown.Item onClick={cerrarSesion}>Cerrar Sesión</Dropdown.Item>
              </DropdownButton>


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}

export default AdminNavbar;
