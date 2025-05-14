import React from 'react';
import { Button, Navbar, Nav, NavDropdown, Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import IngresoSmart from '../Logo/IngresoSmart.png';
import { noticias } from '../data/data';

 
function Home() {

 

  return (
    <>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/home" className="d-flex align-items-center">
            <img
              src={IngresoSmart}
              alt="Logo"
              width="50"
              height="50"
              className="d-inline-block align-top me-2"
            />
            Home
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/noticia">Noticia</Nav.Link>
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
                <i className="bi bi-person-circle" style={{ fontSize: '1.8rem' }}></i>
                <div style={{ fontSize: '0.85rem', marginTop: '4px' }}>Iniciar sesión</div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <h2 className="mb-4 text-center">Últimas Noticias</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {noticias.map((id) => (
            <Col key={id}>
              <Card>
                <Card.Img variant="top" src={`https://via.placeholder.com/300x200?text=Noticia+${id}`} />
                <Card.Body>
                  <Card.Title>{id.titulo}</Card.Title>
                  <Card.Text>
                    {id.descripcion}.
                  </Card.Text>
                  <Button variant="primary">Leer más</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Home;
