import React from 'react';
import {  Button, Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';



function Home() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/home">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Noticia</Nav.Link>
              <Nav.Link href="/contacto">Formulario Contacto</Nav.Link>

              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link href="/login">
                <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="text-center mt-5">
        <h1>Bienvenido al sistema</h1>
        <Button variant="primary">Haz clic</Button>
      </div>
    </>
  );
}

export default Home;
