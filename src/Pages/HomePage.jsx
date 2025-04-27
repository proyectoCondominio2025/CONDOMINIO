import React from 'react';
import { Button, Navbar, Nav, Container, Card, Row, Col, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import IngresoSmart from '../Logo/IngresoSmart.png';
import { noticias } from '../data/data';
import { Footer } from '../components/Footer';

function Home() {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#E9E9EC' }}>
      {/* Navbar Principal */}
      <Navbar expand="lg" className="border-bottom py-0" style={{ backgroundColor: '#AFD3D1', minHeight: '80px' }}>
        <Container fluid className="h-100 px-0 d-flex align-items-center">
          
          {/* Logo y buscador */}
          <div className="d-flex align-items-center flex-grow-1">
            <Navbar.Brand className="p-0 m-0 d-flex align-items-center" style={{ height: '100%' }}>
              <Link to="/" className="d-flex align-items-center" style={{ height: '100%' }}>
                <img
                  src={IngresoSmart}
                  alt="Logo"
                  style={{
                    height: '100%',
                    width: '85px',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </Link>
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
          <div className="d-flex align-items-center gap-4 ms-auto">
            <Nav.Link
              href="/login"
              className="text-dark fw-medium text-decoration-none border-bottom border-2 border-dark pb-1 d-flex align-items-center gap-2"
              style={{ borderRadius: 0 }}>
              Iniciar sesión
              <FaUserCircle size={20} />
            </Nav.Link>
          </div>

        </Container>
      </Navbar>

      {/* Contenido principal */}
      <Container className="mt-5">
        <h2 className="mb-4 text-center">Últimas Noticias</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {noticias.map((noticia) => (
            <Col key={noticia.id}>
              <Card className="h-100">
                <Card.Img variant="top" src={`https://via.placeholder.com/300x200?text=Noticia+${noticia.id}`} />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{noticia.titulo}</Card.Title>
                  <Card.Text>{noticia.descripcion}</Card.Text>
                  <Button variant="primary" className="mt-auto">
                    Leer más
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer estándar */}
      <Footer />
    </div>
  );
}

export default Home;
