import React, { useEffect, useState } from 'react';
import api from '../api/axios'; // ruta ajustada
import { Button, Modal } from 'react-bootstrap';


function HomePage() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState({ titulo: '', contenido: '', fecha: '' });

  const handleShow = (titulo, contenido, fecha) => {
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
      <section
        className="relative bg-cover bg-center h-96 flex items-center justify-center text-center text-white"
        style={{

          backgroundImage: "url('imagen/imagenHome.jpg')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-xl max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Sobre el Condominio</h1>
          <p className="text-lg">
            Somos una comunidad comprometida con el bienestar de nuestros residentes. Aquí encontrarás toda la información relevante, noticias, eventos y medios de contacto.
          </p>
        </div>
      </section>


      <h1 className="text-3xl font-bold text-center text-gray-800 mt-6 mb-6">Noticias</h1>

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
                    <Button onClick={() => handleShow(noticia.titulo, noticia.contenido, noticia.fecha_ex)}>Ver más</Button>
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

      <div class="row">

        <div class="col-12 col-sm-6 col-md-4 mb-4">
          <div class="card card-profile card-plain mt-6">
            <div class="row g-0 align-items-center">
              <div class="col-5">
                <a href="javascript:;">
                  <img src="imagen/carla.jpg" alt="Carla" className="avatar avatar-xl shadow" />
                </a>
              </div>
              <div class="col-7 ps-3">
                <div class="card-body p-0">
                  <h5 class="fw-bold mb-1">Carla Montenegro</h5>
                  <p class="text-uppercase text-sm fw-bold text-muted mb-2">Administradora General</p>
                  <p class="mb-3">“Gestionando tu tranquilidad y el orden de tu comunidad día a día.”</p>
                  <button class="btn btn-facebook btn-sm"><i class="fab fa-facebook"></i></button>
                  <button class="btn btn-twitter btn-sm"><i class="fab fa-twitter"></i></button>
                  <button class="btn btn-linkedin btn-sm"><i class="fab fa-linkedin"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-md-4 mb-4">
          <div class="card card-profile card-plain mt-6">
            <div class="row g-0 align-items-center">
              <div class="col-5">
                <a href="javascript:;">
                  <img src="imagen/john.jpg" alt="john" className="avatar avatar-xl shadow" />
                </a>
              </div>
              <div class="col-7 ps-3">
                <div class="card-body p-0">
                  <h5 class="fw-bold mb-1">Javiera Soto</h5>
                  <p class="text-uppercase text-sm fw-bold text-muted mb-2">Comunicaciones</p>
                  <p class="mb-3">“Información clara, comunicación directa para toda la comunidad.”</p>
                  <button class="btn btn-facebook btn-sm"><i class="fab fa-facebook"></i></button>
                  <button class="btn btn-twitter btn-sm"><i class="fab fa-twitter"></i></button>
                  <button class="btn btn-linkedin btn-sm"><i class="fab fa-linkedin"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-md-4 mb-4">
          <div class="card card-profile card-plain mt-6">
            <div class="row g-0 align-items-center">
              <div class="col-5">
                <a href="javascript:;">
                  <img src="imagen/alec.jpg" alt="Alec" className="avatar avatar-xl shadow" />
                </a>
              </div>
              <div class="col-7 ps-3">
                <div class="card-body p-0">
                  <h5 class="fw-bold mb-1">Felipe Contreras</h5>
                  <p class="text-uppercase text-sm fw-bold text-muted mb-2">Encargado de Seguridad</p>
                  <p class="mb-3">“La seguridad no es negociable: estoy aquí para proteger a todos.”</p>
                  <button class="btn btn-facebook btn-sm"><i class="fab fa-facebook"></i></button>
                  <button class="btn btn-twitter btn-sm"><i class="fab fa-twitter"></i></button>
                  <button class="btn btn-linkedin btn-sm"><i class="fab fa-linkedin"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



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
