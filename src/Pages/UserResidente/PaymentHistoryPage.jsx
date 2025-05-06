import React from 'react';
import { Container, Navbar, Nav, Form, FormControl, Table } from 'react-bootstrap';
import { Footer } from '../components/footer';
import { FaSearch } from 'react-icons/fa';

const HistorialPagoPage = () => {
  const pagos = [
    { fecha: '10/04/2025', folio: '00123', descripcion: 'Gasto común abril', monto: '$45.000', estado: 'PAGADO' },
    { fecha: '10/05/2025', folio: '00124', descripcion: 'Gasto común mayo', monto: '$45.000', estado: 'DEUDA' },
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
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
      {/* <Footer /> */}
    </div>
  );
};

export default HistorialPagoPage;
