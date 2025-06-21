import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import Swal from 'sweetalert2';
import { jwtDecode } from "jwt-decode";

const HistorialPagos = () => {
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [botonCargandoId, setBotonCargandoId] = useState(null);

  useEffect(() => {
    const obtenerPagos = async () => {
      try {
        const response = await api.get('/pagos/mis-pagos/');
        setPagos(response.data);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar los pagos.');
      } finally {
        setLoading(false);
      }
    };

    obtenerPagos();
  }, []);

  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  if (loading) return <div className="d-flex justify-content-center">
    <div className="spinner-border text-success" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>;
  if (error) return <p className="text-danger">{error}</p>;


  const pagarPago = async (pago) => {
    setBotonCargandoId(pago.id);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Token no encontrado");
      }

      const decoded = jwtDecode(token);
      const residente_id = decoded.user_id

      const data = {
        residente_id: residente_id,
        periodo: pago.periodo,
        monto: parseInt(pago.monto),
        descripcion: pago.descripcion,
        items: [
          {
            title: pago.descripcion,
            quantity: 1,
            unit_price: parseInt(pago.monto)
          }
        ]
      };

      const response = await api.post(`/pagos/crear/`, data);
      const url = response.data.init_point;
      window.open(url, '_blank');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo iniciar el pago.', 'error');
    } finally {
      setBotonCargandoId(null);
    }
  };

  return (
    <div className="min-h-screen w-full" style={{ background: "#a6ecec" }}>
      <div className="max-w-6xl mx-auto px-4 pt-10">
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
              <option value="Pendiente">Pendiente</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          <table className="w-full text-base">
            <thead>
              <tr className="bg-indigo-100 text-black text-center">
                <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] uppercase tracking-wider">Descripción</th>
                <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] uppercase tracking-wider">Periodo</th>
                <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] uppercase tracking-wider">ID de pago</th>
                <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] uppercase tracking-wider">Monto</th>
                <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] uppercase tracking-wider">Estado</th>
                <th className="px-4 py-3 text-center text-xs font-extrabold font-[Inter] uppercase tracking-wider">Acción</th>
              </tr>
            </thead>
            <tbody>
              {pagos
                .filter((pago) => {
                  // Filtro por mes
                  const coincideFecha = filtroFecha
                    ? pago.periodo.startsWith(filtroFecha)
                    : true;

                  // Filtro por estado
                  const coincideEstado =
                    filtroEstado === "Todos"
                      ? true
                      : filtroEstado === "Pagado"
                        ? pago.estado === "aprobado"
                        : pago.estado === "pendiente";

                  return coincideFecha && coincideEstado;
                })
                .map((pago) => (
                  <tr key={pago.id} className="border-b last:border-b-0 hover:bg-indigo-50 transition text-center">
                    <td className="px-4 py-3">{pago.id}</td>
                    <td className="px-4 py-3">{pago.descripcion}</td>
                    <td className="px-4 py-3">
                      {(() => {
                        const [a, m, d] = pago.periodo.split("-");
                        return `${d}-${m}-${a}`;
                      })()}
                    </td>
                    <td className="px-4 py-3">
                      {pago.estado === 'aprobado' && pago.mp_payment_id
                        ? pago.mp_payment_id
                        : "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      {new Intl.NumberFormat("es-CL", {
                        style: "currency",
                        currency: "CLP",
                        minimumFractionDigits: 0
                      }).format(pago.monto)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          pago.estado === "aprobado"
                            ? "inline-block px-4 py-1 text-sm rounded-full bg-emerald-100 text-emerald-700 font-bold shadow-md border border-emerald-200 ring-1 ring-emerald-100/50 transition-all duration-150"
                            : "inline-block px-4 py-1 text-sm rounded-full bg-rose-100 text-rose-700 font-bold shadow-md border border-rose-200 ring-1 ring-rose-100/50 transition-all duration-150"
                        }
                        style={{ letterSpacing: "0.05em" }}
                      >
                        {pago.estado == "aprobado" ? "Pagado" : capitalizarPrimeraLetra(pago.estado)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {pago.estado === 'pendiente' ? (
                        <button
                          onClick={() => pagarPago(pago)}
                          className="px-4 py-1 bg-emerald-600 text-white rounded-xl font-semibold shadow hover:bg-emerald-700 transition d-flex align-items-center justify-center"
                          disabled={botonCargandoId === pago.id}
                        >
                          {botonCargandoId === pago.id ? (
                            <div className="spinner-border spinner-border-sm text-light" role="status">
                              <span className="visually-hidden">Cargando...</span>
                            </div>
                          ) : (
                            'Pagar'
                          )}
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm italic">Pagado</span>
                      )}
                    </td>
                  </tr>
                ))}
              {pagos.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400 text-lg">
                    No hay pagos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistorialPagos;
