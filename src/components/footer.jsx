import React from 'react';
import { Container } from 'react-bootstrap';
import { FaLinkedinIn, FaFacebookF, FaXTwitter } from 'react-icons/fa6';

export const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#AFD3D1' }} className="py-5">
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
            <a href="#" className="text-dark text-decoration-none">Sobre nosotros</a>
            <a href="#" className="text-dark text-decoration-none">Términos y condiciones</a>
            <a href="#" className="text-dark text-decoration-none">Política de cookies</a>
          </div>

          {/* Copyright */}
          <div className="text-dark small mt-2">
            © 2025 IngresoSmart. Todos los derechos reservados.
          </div>
        </div>
      </Container>
    </footer>
  );
};
