import React from 'react';
import { Container, Navbar, Nav, Form, FormControl, Table } from 'react-bootstrap';
import { Footer } from '../../components/footer';
import { FaSearch } from 'react-icons/fa';

const HistorialPagoPage = () => {
  const pagos = [
    { fecha: '10/04/2025', folio: '00123', descripcion: 'Gasto común abril', monto: '$45.000', estado: 'PAGADO' },
    { fecha: '10/05/2025', folio: '00124', descripcion: 'Gasto común mayo', monto: '$45.000', estado: 'DEUDA' },
  ];

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#E9E9EC' }}>
      
      {/* Navbar */}
      <Navbar expand="lg" className="border-bottom py-0" style={{ backgroundColor: '#AFD3D1', minHeight: '80px' }}>
        <Container fluid className="h-100 px-0">

          {/* Logo */}
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


          {/* Buscador */}
          <div className="d-flex align-items-center w-100 ms-3">
            <Form style={{ width: '250px' }}>
              <FormControl
                type="search"
                placeholder="Buscar"
                className="rounded-pill px-3 bg-white"
                style={{
                  height: '38px',
                  fontSize: '0.9rem',
                  boxShadow: 'none',
                }}
              />
            </Form>
          </div>

        </Container>
      </Navbar>

      {/* Navegación secundaria */}
      <div className="d-flex justify-content-center my-3">
        <Nav className="gap-3">
          <Nav.Link href="/" className="text-dark fw-medium px-2">INICIO</Nav.Link>
          <Nav.Link href="/" className="text-dark fw-medium px-2">ANUNCIO</Nav.Link>
          <Nav.Link href="#" className="text-dark fw-medium px-2">HISTORIAL DE PAGOS</Nav.Link>
          <Nav.Link href="#" className="text-dark fw-medium px-2">PERFIL</Nav.Link>
          <Nav.Link href="/contacto" className="text-dark fw-medium px-2">CONTACTO</Nav.Link>
        </Nav>
      </div>

      {/* Main Content */}
      <Container fluid className="px-5 my-4 flex-grow-1">
        
        {/* Título */}
        <h2 className="mb-4 fw-bold text-center">HISTORIAL DE PAGOS</h2>

        {/* Barra de búsqueda secundaria */}
        <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
          <FaSearch size={18} style={{ color: '#4a4a4a' }} />
          <FormControl
            type="search"
            placeholder="Buscar"
            className="rounded-pill px-4"
            style={{
              width: '300px',
              height: '45px',
              backgroundColor: '#c4c7c8',
              border: 'none'
            }}
          />
        </div>

        {/* Tabla de pagos */}
        <Table borderless className="table-hover bg-white rounded-3 overflow-hidden">
          <thead className="bg-primary text-white">
            <tr>
              <th className="py-3">FECHA</th>
              <th className="py-3">FOLIO</th>
              <th className="py-3">DESCRIPCIÓN</th>
              <th className="py-3">MONTO</th>
              <th className="py-3">ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pago, idx) => (
              <tr key={idx} className="border-top">
                <td className="py-3">{pago.fecha}</td>
                <td className="py-3">{pago.folio}</td>
                <td className="py-3">{pago.descripcion}</td>
                <td className="py-3">{pago.monto}</td>
                <td className={`py-3 fw-bold ${pago.estado === 'PAGADO' ? 'text-success' : 'text-danger'}`}>
                  {pago.estado}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HistorialPagoPage;
