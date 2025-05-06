import React, { useState } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import { FaLinkedinIn, FaFacebookF, FaXTwitter } from 'react-icons/fa6';

export const Footer = () => {
  const [show, setShow] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });

  const handleShow = (title, body) => {
    setModalContent({ title, body });
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <footer style={{ background: 'linear-gradient(to right, #afe9e6, #305f72)' }} className="py-5">
      <Container fluid className="px-5">
        <div className="d-flex flex-column align-items-center gap-4">
          
          {/* Nombre */}
          <div className="fw-bold fs-5 text-dark">
            IngresoSmart
          </div>

          {/* Redes Sociales */}
          <div className="d-flex gap-3">
            <a href="#" className="text-dark">
              <FaLinkedinIn size={20} />
            </a>
            <a href="#" className="text-dark">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-dark">
              <FaXTwitter size={20} />
            </a>
          </div>

          {/* Links */}
          <div className="d-flex flex-wrap justify-content-center gap-4 small">
            <button 
              onClick={() => handleShow('Sobre nosotros', 'Somos una empresa dedicada a mejorar el acceso inteligente a tu comunidad.')}
              className="btn btn-link text-dark text-decoration-none p-0"
            >
              Sobre nosotros
            </button>

            <button 
              onClick={() => handleShow('Términos y condiciones', 'Estos son los términos y condiciones para el uso de nuestros servicios.')}
              className="btn btn-link text-dark text-decoration-none p-0"
            >
              Términos y condiciones
            </button>

            <button 
              onClick={() => handleShow('Política de cookies', 'Utilizamos cookies para mejorar tu experiencia en nuestro sitio web.')}
              className="btn btn-link text-dark text-decoration-none p-0"
            >
              Política de cookies
            </button>
          </div>

          {/* Copyright */}
          <div className="text-dark small mt-2">
            © 2025 IngresoSmart. Todos los derechos reservados.
          </div>
        </div>
      </Container>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalContent.body}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </footer>
  );
};

export default Footer;