import React, { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import api from '../../api/axios';
import Swal from 'sweetalert2';
import EditarAnuncio from '../components/EditarAnuncio';
import { useNavigate } from 'react-router-dom';

function ListaNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal de edición
  const [showModal, setShowModal] = useState(false);
  const [anuncioSeleccionado, setAnuncioSeleccionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await api.get('anuncios/');
        setNoticias(response.data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("No se pudieron cargar las noticias.");
      } finally {
        setLoading(false);
      }
    };
    fetchNoticias();
  }, []);

  function eliminarNoticia(noticia) {
    Swal.fire({
      title: `¿Eliminar la noticia "${noticia.titulo}"?`,
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
          await api.delete(`anuncios/${noticia.id}/`);
          Swal.fire('Eliminado', `La noticia "${noticia.titulo}" ha sido eliminada.`, 'success');
          setNoticias(prev => prev.filter(n => n.id !== noticia.id));
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
          Swal.fire('Error', 'No se pudo eliminar la noticia.', 'error');
        }
      }
    });
  }

  function editarAnuncio(noticia) {
    setAnuncioSeleccionado(noticia);
    setShowModal(true);
  }

  async function guardarEdicionAnuncio(data) {
    try {
      await api.put(`anuncios/${anuncioSeleccionado.id}/`, data);
      setNoticias(prev =>
        prev.map(n =>
          n.id === anuncioSeleccionado.id ? { ...n, ...data } : n
        )
      );
      Swal.fire('Éxito', 'Noticia editada correctamente', 'success');
      setShowModal(false);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      Swal.fire('Error', 'No se pudo editar la noticia.', 'error');
    }
  }

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500 border-solid"></div>
    </div>
  );
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <EditarAnuncio
        show={showModal}
        handleClose={() => setShowModal(false)}
        anuncio={anuncioSeleccionado}
        onGuardar={guardarEdicionAnuncio}
      />

      <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        {/* Título centrado */}
        <h2 className="text-3xl font-extrabold  text-center text-indigo-700 drop-shadow mb-5">
          Lista de Noticias
        </h2>
        {/* Botón alineado a la izquierda */}
        <div className="flex">
        <button
          onClick={() => navigate("/admin/crear-noticias")}
          className="
            group
            flex items-center gap-2 
            px-6 py-2
            bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600
            text-white text-lg font-bold uppercase tracking-wide
            rounded-full shadow-lg 
            hover:scale-105 hover:shadow-xl hover:from-indigo-700 hover:to-blue-700 
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-indigo-400
            active:scale-95
          "
        >
          <span className="transition-transform duration-200 group-hover:rotate-90">
            <FaPlus />
          </span>
          Crear Noticia
        </button>
        </div>
      </div>

        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-indigo-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">Título</th>
                <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">Contenido</th>
                <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">Fecha</th>
                <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">Usuario (ID)</th>
                <th className="px-4 py-3 text-center text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {noticias.map(noticia => (
                <tr key={noticia.id} className="hover:bg-indigo-50 transition">
                  <td className="px-4 py-3">{noticia.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{noticia.titulo}</td>
                  <td className="px-4 py-3 max-w-xs truncate">{noticia.contenido}</td>
                  <td className="px-4 py-3">{noticia.fecha_ex}</td>
                  <td className="px-4 py-3">{noticia.usuario}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => editarAnuncio(noticia)}
                        className="flex items-center gap-1 px-3 py-1 bg-emerald-500 text-white rounded-lg shadow hover:bg-emerald-600 transition"
                      >
                        <FaEdit />
                        Editar
                      </button>
                      <button
                        onClick={() => eliminarNoticia(noticia)}
                        className="flex items-center gap-1 px-3 py-1 bg-rose-500 text-white rounded-lg shadow hover:bg-rose-600 transition"
                      >
                        <FaTrash />
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {noticias.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400 text-lg">No hay noticias registradas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ListaNoticias;
