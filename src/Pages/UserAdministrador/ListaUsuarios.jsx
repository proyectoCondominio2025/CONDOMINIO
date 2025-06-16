import React, { useEffect, useState } from 'react';
import { FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import EditarUsuarioModal from '../components/EditarUsuarioModal';

function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get('ver-usuarios/');
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

  const formatoCLP = (numero) => {
    if (isNaN(numero)) return 'N/A';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(numero);
  };

  function editarUsuario(usuario) {
    setUsuarioSeleccionado(usuario);
    setShowModal(true);
  }

  async function guardarEdicionUsuario(data) {
    try {

      console.log(data)
      console.log(usuarioSeleccionado)

      if (usuarioSeleccionado.tipo_de_usuario == "portero") {
        const newData = {
          nombre: data.nombre,
          apellido: data.apellido,
          correo: data.correo,
          telefono: data.telefono
        }

        Swal.fire({
          title: 'Guardando cambios...',
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading()
        });

        const response = await api.patch(`usuarios/${usuarioSeleccionado.id}/editar/`, newData);

        Swal.fire({
          title: '¡Guardado exitoso!',
          text: 'Los cambios se han guardado correctamente',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
        // Actualizar estado y cerrar modal
        setUsuarios(prev => prev.map(u =>
          u.id === usuarioSeleccionado.id ? { ...u, ...response.data } : u
        ));

      }
      else {
        Swal.fire({
          title: 'Guardando cambios...',
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading()
        });

        const response = await api.patch(`residentes/${usuarioSeleccionado.id}/editar/`, data);


        Swal.fire({
          title: '¡Guardado exitoso!',
          text: 'Los cambios se han guardado correctamente',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });

        setUsuarios(prev => prev.map(u =>
          u.id === usuarioSeleccionado.id ? { ...u, ...response.data } : u
        ));
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'No se pudieron guardar los cambios',
        icon: 'error'
      });
    }
  }

  function desactivarUsuario(usuario) {
    Swal.fire({
      title: `¿Desactivar a ${usuario.nombre}?`,
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`usuarios/${usuario.id}/`);
          Swal.fire('Eliminado', `El usuario ${usuario.nombre} ha sido eliminado.`, 'success');
          setUsuarios(prev => prev.filter(u => u.id !== usuario.id));
          // eslint-disable-next-line no-unused-vars
        } catch (err) {
          Swal.fire('Error', 'No se pudo desactivar el usuario.', 'error');
        }
      }
    });
  }

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-500 border-solid"></div>
    </div>
  );
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <EditarUsuarioModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        usuario={usuarioSeleccionado}
        onGuardar={guardarEdicionUsuario}
      />
      {/* Fondo celeste igual que Lista de Noticias */}
      <div className="min-h-screen w-full" style={{ background: "#a6ecec" }}>
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 drop-shadow mb-8">
            Lista de Usuarios
          </h2>
          <div className="mb-6 flex">
            <Link to="/admin/crear-usuarios">
              <button
                className=" group
                flex items-center gap-2 
                px-6 py-2
                bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600
                text-white text-lg font-bold uppercase tracking-wide
                rounded-full shadow-lg 
                hover:scale-105 hover:shadow-xl hover:from-indigo-700 hover:to-blue-700 
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-indigo-400
                active:scale-95"
              >
                <FaUserPlus />
                Crear Usuario
              </button>
            </Link>
          </div>
          {/* Tabla */}
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
                          onClick={() => editarUsuario(usuario)}
                          className="flex items-center gap-1 px-3 py-1 bg-emerald-500 text-white rounded-lg shadow hover:bg-emerald-600 transition"
                        >
                          <FaEdit className="mr-1" />
                          Editar
                        </button>
                        <button
                          onClick={() => desactivarUsuario(usuario)}
                          className="flex items-center gap-1 px-3 py-1 bg-rose-500 text-white rounded-lg shadow hover:bg-rose-600 transition"
                        >
                          <FaTrash className="mr-1" />
                          Eliminar
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

export default ListaUsuarios;
