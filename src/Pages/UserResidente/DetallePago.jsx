import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const pagosOriginales = [
  { id: 1, fecha: '2025-05-01', folio: 'F001', descripcion: 'Pago mensual mayo', monto: '$20.000', estado: 'Pagado' },
  { id: 2, fecha: '2025-04-01', folio: 'F002', descripcion: 'Pago mensual abril', monto: '$20.000', estado: 'Deuda' },
  { id: 3, fecha: '2025-03-01', folio: 'F003', descripcion: 'Pago mensual marzo', monto: '$20.000', estado: 'Pagado' },
  { id: 4, fecha: '2025-01-03', folio: 'F004', descripcion: 'Pago mensual enero', monto: '$20.000', estado: 'Pagado' },
  { id: 5, fecha: '2025-02-03', folio: 'F005', descripcion: 'Pago mensual febrero', monto: '$20.000', estado: 'Deuda' },
];

const Pagar = () => {
  const { folio } = useParams();
  const navigate = useNavigate();

  const pago = pagosOriginales.find(p => p.folio === folio);

  if (!pago) {
    return <div className="container mt-5"><h4>Pago no encontrado</h4></div>;
  }

  const confirmarPago = () => {
    alert(`Pago del folio ${folio} confirmado correctamente`);
    navigate('/historial');
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Detalle del Pago</h3>
      <div className="card shadow-sm p-4">
        <p><strong>Folio:</strong> {pago.folio}</p>
        <p><strong>Fecha:</strong> {pago.fecha}</p>
        <p><strong>Descripción:</strong> {pago.descripcion}</p>
        <p><strong>Monto:</strong> {pago.monto}</p>
        <p><strong>Estado:</strong> <span className={pago.estado === 'Pagado' ? 'text-success' : 'text-danger'}>{pago.estado}</span></p>

        {pago.estado === 'Deuda' && (
          <button className="btn btn-success mt-3" onClick={confirmarPago}>
            Confirmar Pago
          </button>
        )}

        <button className="btn btn-secondary mt-2 ms-2" onClick={() => navigate('/historial-pago')}>
          Volver al historial
        </button>
      </div>
    </div>
  );
};

export default Pagar;
