import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar, Container, Nav, Dropdown, DropdownButton, NavDropdown} from 'react-bootstrap';
import IngresoSmart from '../../assets/IngresoSmart.png';
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';


const MenuNavbar = () => {
  const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    let nombre = null
    if (token) {
      try {
        const decoded = jwtDecode(token);
        nombre = decoded.nombre;
  
      } catch (e) {
        console.error("Token inválido:", e);
        localStorage.removeItem("accessToken"); // Limpia si está corrupto
      }
    }

  const cerrarSesion = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate("/");
  }

  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
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
              <Nav.Link as={Link} to="/portero/lista-visita" className="text-black" activeClassName="active">Visitas</Nav.Link>
              <Nav.Link as={Link} to="/portero/lista-vehiculo" className="text-black" activeClassName="active">Lista Vehiculos</Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <DropdownButton variant='outline-light' id="dropdown-basic-button" drop={'start'} title={<i className="bi bi-gear text-dark fs-5"></i>}>
                <Dropdown.ItemText >{capitalizarPrimeraLetra(nombre)}</Dropdown.ItemText>
                <NavDropdown.Divider />
                <Dropdown.Item href="/portero/perfil-portero">Mi perfil</Dropdown.Item>
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