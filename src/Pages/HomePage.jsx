import React from 'react';
import { Navbar, Nav, Container, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { noticias } from '../data/data';


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

  return (
    <>
      {/*  */}


      {/* Contenido Principal */}
      <Container className="flex-grow-1 my-5">
        <NoticiaPage />
      </Container>

      {/* Footer estándar */}
      <Footer />
    </div>
  );
}

export default Home;
