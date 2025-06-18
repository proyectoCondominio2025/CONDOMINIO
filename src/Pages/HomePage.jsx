import React, { useEffect, useState } from 'react';
import api from '../api/axios'; // ruta ajustada
import { Button, Modal } from 'react-bootstrap';

function HomePage() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState({ titulo: '', contenido: '', fecha: ''});

  const handleShow = (titulo,contenido,fecha) => {
    setModalContent({ titulo, contenido, fecha });
    setShow(true);
  };

  const handleClose = () => setShow(false);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await api.get('/anuncios-publicos/');
        console.log('Noticias cargadas:', response.data);
        setNoticias(response.data);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar las noticias.');
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  return (
    <div className="min-h-screen  px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Noticias</h1>

      {loading && (
        <div className="flex justify-center items-center min-h-[100px]">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-500 border-solid"></div>
        </div>
      )}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {noticias.length > 0 ? (
            noticias.map((noticia) => (
              <div
                key={noticia.id}
                className="rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 relative"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1541451378359-acdede43fdf4?ixlib=rb-4.0.3&auto=format&fit=crop&w=934&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="bg-black bg-opacity-50 rounded-xl p-4">
                  <h3 className="text-xl font-bold text-white mb-2">{noticia.titulo}</h3>
                  <p className="text-white text-sm mb-4 line-clamp-3">{noticia.contenido}</p>
                  <div className="text-xs text-gray-300">
                    <p>Fecha: {noticia.fecha_ex || 'Sin fecha'}</p>
                    <Button onClick={() => handleShow(noticia.titulo,noticia.contenido,noticia.fecha_ex)}>Ver más</Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No hay noticias registradas.
            </p>
          )}
        </div>
      )}

      {/* Modal */}
            <Modal show={show} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>{modalContent.titulo}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {modalContent.contenido}
              </Modal.Body>
              <Modal.Body>
                {modalContent.fecha}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
    </div>
  );
}

export default HomePage;
