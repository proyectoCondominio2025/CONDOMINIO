import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FaUserEdit } from 'react-icons/fa';

function PerfilResidente() {
  // Simulación de datos del usuario
  const usuario = {
    nombre: 'María González',
    correo: 'maria.gonzalez@email.com',
    casa: '123',
  };

  return (
    <Container className="mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <Card className="shadow-lg rounded-4 p-4 w-100" style={{ maxWidth: 500, background: 'rgba(255,255,255,0.96)' }}>
        <div className="d-flex flex-column align-items-center mb-4">
          {/* Avatar grande con iniciales */}
          <div
            className="rounded-circle bg-primary text-white shadow-lg d-flex justify-content-center align-items-center mb-3"
            style={{ width: 96, height: 96, fontSize: 38, fontWeight: 700, letterSpacing: 1.5, border: "4px solid #e0e7ef" }}
          >
            {usuario.nombre
              .split(' ')
              .map(word => word[0])
              .join('')
              .toUpperCase()
            }
          </div>
          <h2 className="mb-0 text-primary" style={{ fontWeight: 800, letterSpacing: 1 }}>
            {usuario.nombre}
          </h2>
        </div>
        <Row className="mb-3">
          <Col xs={12}>
            <strong>Nombre:</strong>
            <div className="mb-2">{usuario.nombre}</div>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <strong>Correo:</strong>
            <div className="mb-2">{usuario.correo}</div>
          </Col>
          <Col xs={12} md={6}>
            <strong>Número de Casa:</strong>
            <div className="mb-2">{usuario.casa}</div>
          </Col>
        </Row>
        <div className="text-center mt-3">
          <Button variant="primary" size="lg" className="d-flex align-items-center gap-2 mx-auto px-4 py-2 shadow-sm">
            <FaUserEdit size={20} className="me-2" />
            Editar Perfil
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default PerfilResidente;
