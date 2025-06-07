import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar, Container, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import IngresoSmart from '../../assets/IngresoSmart.png';
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MenuNavbar = () => {

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
          <Navbar.Brand as={Link} to="/residente" className="d-flex align-items-center">
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
              <Nav.Link as={Link} to="/residente" className="text-black" activeClassName="active">Inicio</Nav.Link>
              <Nav.Link as={Link} to="/residente/historial-pago" className="text-black" activeClassName="active">Historial de pago</Nav.Link>
            </Nav>

            <Nav className="ms-auto">
              <DropdownButton variant='outline-light' id="dropdown-basic-button" drop={'start'} title={<i class="bi bi-gear text-dark fs-5"></i>}>
                <Dropdown.Item href="/residente/perfil-residente">Mi perfil</Dropdown.Item>
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
};

export default MenuNavbar;
