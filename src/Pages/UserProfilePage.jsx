import React from 'react';
import { Container, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { Footer } from '../components/footer';
import { FaUserCircle } from 'react-icons/fa';
import ProfileField from '../components/ProfileField';

export const UserProfilePage = () => {
  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#E9E9EC' }}>
      
      {/* Navbar Principal */}
      <Navbar expand="lg" className="border-bottom py-0" style={{ backgroundColor: '#AFD3D1', minHeight: '80px' }}>
        <Container fluid className="h-100 px-0 d-flex align-items-center">
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
                placeholder="Search"
                className="rounded-pill px-3 bg-white"
                style={{ height: '38px', fontSize: '0.9rem', boxShadow: 'none' }}
              />
            </Form>
          </div>
        </Container>
      </Navbar>

      {/* Navbar Secundaria */}
      <div className="d-flex justify-content-center my-3">
        <Nav className="gap-3">
          <Nav.Link href="/" className="text-dark fw-medium px-2">INICIO</Nav.Link>
          <Nav.Link href="/" className="text-dark fw-medium px-2">ANUNCIO</Nav.Link>
          <Nav.Link href="/historialPago" className="text-dark fw-medium px-2">HISTORIAL DE PAGOS</Nav.Link>
          <Nav.Link href="/contacto" className="text-dark fw-medium px-2">CONTACTO</Nav.Link>
        </Nav>
      </div>

      {/* Contenido Principal */}
      <Container className="flex-grow-1 mb-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5 mb-3" style={{ color: '#2A3F4F' }}>Mi Perfil</h2>
          <div className="mx-auto mb-4" style={{ width: '80px', height: '3px', backgroundColor: '#AFD3D1' }}></div>
        </div>

        <div className="mx-auto bg-white rounded-4 shadow-sm p-4 p-lg-5" style={{ maxWidth: '800px' }}>
          <div className="row g-4">
            {/* Sección Avatar */}
            <div className="col-md-4 text-center border-end-md pe-md-4">
              <div className="position-relative mb-4">
                <div className="mx-auto rounded-circle overflow-hidden bg-light" 
                     style={{ width: '120px', height: '120px' }}>
                  <FaUserCircle className="w-100 h-100" style={{ color: '#AFD3D1' }}/>
                </div>
              </div>
            </div>

            {/* Sección Campos */}
            <div className="col-md-8">
              <ProfileField label="RUT" value="12.345.678-9" />
              <ProfileField label="Nombre" value="María Fernanda" />
              <ProfileField label="Apellido" value="González Pérez" />
              <ProfileField label="N° Casa" value="B-203" />
              <ProfileField label="Teléfono" value="+56 9 8765 4321" />
              
              <div className="mt-4 pt-3 border-top">
                <button 
                  className="btn btn-primary w-100 py-2 rounded-pill" 
                  style={{ backgroundColor: '#AFD3D1', border: 'none' }}>
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};