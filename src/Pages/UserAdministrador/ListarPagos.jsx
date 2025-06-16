import { Link } from 'react-router-dom';
import api from '../../api/axios';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


function ListarPagos() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const generarPagos = async () => {
    try {
      const response = await api.post('/pagos/generar/');
      Swal.fire('Éxito', response.data.mensaje, 'success');
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo generar los pagos.', 'error');
    }
  };

  const formatoCLP = (numero) => {
    if (isNaN(numero)) return 'N/A';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(numero);
  };

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get('ver-usuarios-residentes/');
        setUsuarios(response.data);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("No se pudieron cargar los usuarios.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  function verPagos(usuario) {
    navigate(`/admin/usuario-pagos/${usuario.id}`);
  }

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-500 border-solid"></div>
    </div>
  );
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="min-h-screen w-full bg-[#a6ecec] py-10 px-2">
        <Button variant="success" className="ms-4" onClick={generarPagos}>
          Generar pagos del mes
        </Button>
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 drop-shadow mb-8">
            Lista de usuarios - Pagos
          </h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
            <table className="w-full text-base">
              <thead>
                <tr className="bg-indigo-100 text-black">
                  <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">Nombre</th>
                  <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">Apellido</th>
                  <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">Rut</th>
                  <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">Teléfono</th>
                  <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">N°Casa</th>
                  <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">Patente</th>
                  <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">Gastos Comunes</th>
                  <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">Tipo</th>
                  <th className="px-4 py-3 text-center text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(usuario => (
                  <tr key={usuario.id} className="border-b last:border-b-0 hover:bg-indigo-50 transition">
                    <td className="px-4 py-3">{usuario.id}</td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {/* Avatar circular */}
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(usuario.nombre ?? '')}&background=random&size=48`}
                          className="w-10 h-10 rounded-full shadow"
                          alt="avatar"
                        />
                        <div className="flex flex-col justify-center min-w-0">
                          <span
                            className="font-semibold text-sm text-gray-800"
                            title={usuario.nombre}
                          >
                            {usuario.nombre}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold">{usuario.apellido}</td>
                    <td className="px-4 py-3">{usuario.rut}</td>
                    <td className="px-4 py-3">{usuario.telefono}</td>
                    <td className="px-4 py-3">{usuario.numero_casa ?? "N/A"}</td>
                    <td className="px-4 py-3">{usuario.vehiculo_placa ?? "Sin vehiculo"}</td>
                    <td className="px-4 py-3">{formatoCLP(usuario.gastos_comunes) ?? "N/A"}</td>
                    <td className="px-4 py-3">{usuario.tipo_de_usuario}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => verPagos(usuario)}
                          className="flex items-center gap-1 px-3 py-1 bg-emerald-500 text-white rounded-lg shadow hover:bg-emerald-600 transition"
                        >
                          <FaEye className="mr-1" />
                          Ver pagos
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {usuarios.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-4 py-8 text-center text-gray-400 text-lg">
                      No hay usuarios registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListarPagos;
