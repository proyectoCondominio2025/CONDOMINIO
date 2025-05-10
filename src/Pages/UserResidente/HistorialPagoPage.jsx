import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const pagosOriginales = [
  { id: 1, fecha: '2025-05-01', folio: 'F001', descripcion: 'Pago mensual mayo', monto: '$20.000', estado: 'Pagado' },
  { id: 2, fecha: '2025-04-01', folio: 'F002', descripcion: 'Pago mensual abril', monto: '$20.000', estado: 'Deuda' },
  { id: 3, fecha: '2025-03-01', folio: 'F003', descripcion: 'Pago mensual marzo', monto: '$20.000', estado: 'Pagado' },
  { id: 4, fecha: '2025-01-03', folio: 'F004', descripcion: 'Pago mensual enero', monto: '$20.000', estado: 'Pagado' },
  { id: 5, fecha: '2025-02-03', folio: 'F005', descripcion: 'Pago mensual febrero', monto: '$20.000', estado: 'Pagado' },
];

const HistorialPagos = () => {
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const navigate = useNavigate();


  const pagosFiltrados = pagosOriginales.filter((p) => {
    const coincideFecha = filtroFecha ? p.fecha.startsWith(filtroFecha) : true;
    const coincideEstado = filtroEstado === 'Todos' ? true : p.estado === filtroEstado;
    return coincideFecha && coincideEstado;
  });

  const irAPagar = (folio) => {
    navigate(`/detalle/${folio}`);
  };
  

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">HISTORIAL DE PAGOS</h3>

      <div className="row justify-content-center mb-4">
        <div className="col-md-3 mb-2">
          <input
            type="month"
            className="form-control"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-2">
          <select
            className="form-select"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="Pagado">Pagado</option>
            <option value="Deuda">Deuda</option>
          </select>
        </div>
      </div>

      <table className="table table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th>FECHA</th>
            <th>FOLIO</th>
            <th>DESCRIPCIÓN</th>
            <th>MONTO</th>
            <th>ESTADO</th>
          </tr>
        </thead>
        <tbody>
          {pagosFiltrados.map((pago) => (
            <tr key={pago.id}>
              <td>{pago.fecha}</td>
              <td>{pago.folio}</td>
              <td>{pago.descripcion}</td>
              <td>{pago.monto}</td>
              <td>
                {pago.estado.toLowerCase() === 'pagado' ? (
                  <span className="text-success fw-bold" >{pago.estado.toUpperCase()}</span>
                ) : (
                  <button className="btn btn-fill text-danger fw-bold"  onClick={() => irAPagar(pago.folio)}>
                    DEUDA
                  </button>
                )}
              </td>
            </tr>
          ))}
          {pagosFiltrados.length === 0 && (
            <tr>
              <td colSpan="5" className="text-muted">No hay pagos que coincidan con los filtros.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialPagos;
