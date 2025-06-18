// // import React, { useState } from 'react';
// // import { Table, Button, Container } from 'react-bootstrap';
// // import { autos } from '../../data/data';


// // function ListaAutos() {



// //   const eliminarAuto = (id) => {
// //     const nuevosAutos = autos.filter(auto => auto.id !== id);
// //     setAutos(nuevosAutos);
// //   };
// //   const editarVehiculo = (auto) => {
// //     console.log('Editar vehiculo:', auto);
// //     // Aquí puedes redirigir a otra página con react-router o abrir un modal
// //   };

 
// //   return (
// //     <Container className="mt-5">
// //       <h2>Lista de Autos</h2>

// //       <Table striped bordered hover>
// //         <thead>
// //           <tr>
// //             <th>ID</th>
// //             <th>Patente</th>
// //             <th>Dueño</th>
// //             <th>N° Casa</th>
// //             <th>Estado</th>
// //             <th>Acciones</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {autos.map(auto => (
// //             <tr key={auto.id}>
// //               <td>{auto.id}</td>
// //               <td>{auto.patente}</td>
// //               <td>{auto.duenio}</td>
// //               <td>{auto.casa}</td>
// //               <td>{auto.estado}</td>
// //               <td>
// //                 <Button
// //                   variant="success"
// //                   className="me-2"
// //                   onClick={() => editarVehiculo(auto)}>
// //                   Editar
// //                 </Button>

// //                 <Button variant="danger" onClick={() => alert('se elimino el auto con patente: ' + auto.patente)}>
// //                   Eliminar
// //                 </Button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </Table>
// //     </Container>
// //   );
// // }

// // export default ListaAutos;



import React, { useEffect, useState } from 'react';
import { FaCar, FaEdit, FaTrash } from 'react-icons/fa';
// import api from('../../api/axios'); // Asegúrate de tener configured tu API
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function ListaVehiculos() {
  const [vehiculos, setVehiculos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await api.get('vehiculos/');
        setVehiculos(response.data);
      } catch (err) {
        setError("No se pudieron cargar los vehículos.");
      } finally {
        setLoading(false);
      }
    };
    fetchVehiculos();
  }, []);

  async function eliminarVehiculo(vehiculo) {
    Swal.fire({ 
      title: `¿Deseas eliminar el vehículo ${vehiculo.patente}?`,
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`vehiculos/${vehiculo.id}/`);
          Swal.fire('Eliminado!', `El vehículo ${vehiculo.patente} ha sido eliminado.`, 'success');
          setVehiculos(vehiculos.filter(v => v.id !== vehiculo.id)); 
        } catch (err) {
          Swal.fire('Error', 'No se pudo eliminar el vehículo.', 'error');
        }
      }
    });
  }

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
        <div className="mb-6 flex">
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
        </div>

        {/* Tabla */} 
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          <table className="min-w-full text-base">
            <thead>
              <tr className="bg-indigo-100 text-black">
                <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] uppercase tracking-wider">Patente</th>
                <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] uppercase tracking-wider">Dueño</th>
                <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] uppercase tracking-wider">N° Casa</th>
                <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] uppercase tracking-wider">Estado</th>
                <th className="px-4 py-3 text-center text-xs font-extrabold font-[Inter] uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehiculos.length > 0 ? (
                vehiculos.map(vehiculo => (
                   <tr key={vehiculo.id} className="border-b last:border-b-0 hover:bg-indigo-50 transition">
                      <td className="px-4 py-3">{vehiculo.id}</td>
                      <td className="px-4 py-3 font-semibold">{vehiculo.patente}</td>
                      <td className="px-4 py-3">{vehiculo.duenio}</td>
                      <td className="px-4 py-3">{vehiculo.casa ?? "N/A"}</td>
                      <td className="px-4 py-3">{vehiculo.estado}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => console.log('Editar', vehiculo)}
                            className="flex items-center gap-1 px-3 py-1 bg-emerald-500 text-white rounded-lg shadow hover:bg-emerald-600 transition">
                            <FaEdit />
                            Editar
                          </button>
                          <button
                            onClick={() => eliminarVehiculo(vehiculo)}
                            className="flex items-center gap-1 px-3 py-1 bg-rose-500 text-white rounded-lg shadow hover:bg-rose-600 transition">
                            <FaTrash />
                            Eliminar
                          </button>
                        </div>
                      </td>
                   </tr>
                 )) 
               ) : (
                 <tr>
                   <td colSpan="6" className="px-4 py-8 text-center text-gray-400 text-lg">
                     No hay vehículos registrados.
                   </td>
                 </tr>
               )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ListaVehiculos;
