import React, { useEffect, useState } from 'react';
import { FaCar, FaEdit, FaTrash } from 'react-icons/fa';
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Select from 'react-select';  // ❌ Está dentro del componente


function ListaVehiculos() {
  const [vehiculos, setVehiculos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filtroPatente, setFiltroPatente] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("Todos");


  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await api.get('/vehiculos-visita/');
        console.log("Vehículos recibidos:", response.data); // 👈 revisa esto en consola
        setVehiculos(response.data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("No se pudieron cargar los vehículos.");
      } finally {
        setLoading(false);
      }
    };
    fetchVehiculos();
  }, []);

  async function toggleEstado(vehiculo) {
    try {
      const nuevoEstado = vehiculo.estado;

      await api.patch(`/vehiculos-visita/${vehiculo.id}/`, {
        estado: nuevoEstado
      });

      setVehiculos((prevVehiculos) =>
        prevVehiculos.map((v) =>
          v.id === vehiculo.id ? { ...v, estado: nuevoEstado } : v
        )
      );

      Swal.fire("Actualizado", `El estado fue cambiado correctamente`, "success");
    } catch (err) {
      console.error("Error PATCH:", err.response?.data || err.message);
      Swal.fire("Error", err.response?.data?.detail || "No se pudo cambiar el estado del vehículo.", "error");
    }
  }

  useEffect(() => {
    const verificarVehiculosEstacionados = () => {
      const ahora = new Date();

      const alertas = vehiculos.filter((v) => {
        if (!v.estado) return false; // 🚨 Solo alerta si está Activo
        const fechaIngreso = new Date(v.fecha_visita);
        const diferenciaHoras = (ahora - fechaIngreso) / (1000 * 60 * 60);
        return diferenciaHoras >= 3;
      });

      alertas.forEach((vehiculo) => {
        Swal.fire({
          icon: "warning",
          title: "¡Atención!",
          html: `
          El vehículo con placa <b>${vehiculo.placa}</b> lleva más de 3 horas en el estacionamiento.<br>
          Teléfono del residente: <b>${vehiculo.residente?.telefono || 'Desconocido'}</b>
        `,
          confirmButtonText: "OK"
        });
      });
    };

    if (vehiculos.length > 0) {
      verificarVehiculosEstacionados();
    }
  }, [vehiculos]);


  const opcionesPatente = [
    ...new Map(vehiculos.map(v => [v.placa, {
      value: v.placa,
      label: v.placa
    }])).values()
  ];


  const vehiculosFiltrados = vehiculos.filter(v => {
    const coincidePatente = filtroPatente ? v.placa === filtroPatente : true;

    const coincideEstado =
      filtroEstado === "Todos" ? true :
        filtroEstado === "Activo" ? v.estado === true :
          v.estado === false;

    return coincidePatente && coincideEstado;
  });






  // async function eliminarVehiculo(vehiculo) {
  //   Swal.fire({
  //     title: `¿Deseas eliminar el vehículo ${vehiculo.patente}?`,
  //     text: "Esta acción no se puede deshacer.",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#d33',
  //     cancelButtonColor: '#3085d6',
  //     confirmButtonText: 'Sí, eliminar',
  //     cancelButtonText: 'Cancelar'
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         await api.delete(`vehiculos/${vehiculo.id}/`);
  //         Swal.fire('Eliminado!', `El vehículo ${vehiculo.patente} ha sido eliminado.`, 'success');
  //         setVehiculos(vehiculos.filter(v => v.id !== vehiculo.id));
  //       } catch (err) {
  //         Swal.fire('Error', 'No se pudo eliminar el vehículo.', 'error');
  //       }
  //     }
  //   });
  // }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-500 border-solid"></div>
      </div>
    )
  }
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="min-h-screen w-full" style={{ background: "#a6ecec" }}>
      <div className="max-w-6xl mx-auto px-4 pt-10">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 drop-shadow mb-8">
          Lista de Vehículos
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="w-full sm:w-1/2">
            <label className="block mb-1 text-sm font-semibold">Filtrar por patente:</label>
            <Select
              options={opcionesPatente}
              isClearable
              placeholder="Selecciona una patente..."
              onChange={(selected) => setFiltroPatente(selected ? selected.value : null)}
            />
          </div>

          <div className="w-full sm:w-1/2 ">
            <label className="block mb-1 text-sm font-semibold">Filtrar por estado:</label>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="w-full px-3 py-2 border rounded shadow-sm"
              style={{ background: "#FFFFFF" }}
            >
              <option value="Todos">Todos</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
        </div>


        {/* <button
          className="btn btn-outline-secondary mb-3"
          onClick={() => {
            setFechaSeleccionada('');
            setFiltroRut(null);
            setFiltroPatente(null);
          }}
        >
          Limpiar filtros
        </button>
      </div> */}

        {/* <div className="mb-6 flex">
          <Link to="/admin/crear-vehiculo">
            <button
              className="group
                flex items-center gap-2 
                px-6 py-2
                bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600
                text-white text-lg font-bold uppercase tracking-wide
                rounded-full shadow-lg 
                hover:scale-105 hover:shadow-xl hover:from-indigo-700 hover:to-blue-700 
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-indigo-400
                active:scale-95">
              <FaCar />
              Crear Vehículo
            </button>
          </Link>
        </div> */}

        {/* Tabla */}
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          <table className="min-w-full text-base">
            <thead>
              <tr className="bg-indigo-100 text-black">
                <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] uppercase tracking-wider">Fecha/Hora</th>
                <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] uppercase tracking-wider">Patente</th>
                <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] uppercase tracking-wider">Estacionado</th>
                {/* <th className="px-4 py-3 text-center text-xs font-extrabold font-[Inter] uppercase tracking-wider">Acciones</th> */}
              </tr>
            </thead>
            <tbody>
              {vehiculosFiltrados.length > 0 ? (
                vehiculosFiltrados.map((vehiculo, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3">
                      {new Date(vehiculo.fecha_visita).toLocaleString("es-CL", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                      })}
                    </td>

                    <td className="px-4 py-3">{vehiculo.placa}</td>
                    <td>
                      <select
                        value={vehiculo.estado ? "Activo" : "Inactivo"}
                        onChange={(e) =>
                          toggleEstado({
                            ...vehiculo,
                            estado: e.target.value === "Activo"
                          })
                        }
                        className="px-3 py-1 rounded border border-gray-300 shadow-sm text-sm"
                      >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                      </select>
                    </td>

                    

                    {/* <td className="px-4 py-3 text-center">
                      <button onClick={() => eliminarVehiculo(vehiculo)}>Eliminar</button>
                    </td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-4 py-8 text-center text-gray-400 text-lg">
                    No hay vehículos registrados.
                  </td>
                </tr>
              )}
            </tbody>


          </table>
        </div>
      </div>
    </div >
  )
}

export default ListaVehiculos;
