import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';


function PerfilUsuario() {
  // Simulación de datos del usuario
  const usuario = {
    nombre: 'María González',
    correo: 'maria.gonzalez@email.com',
    casa: '123',
  };

  return (
    <Container className="mt-5">
      <Card className="shadow p-4">
        <h2 className="mb-4 text-center">Perfil del Usuario</h2>
        <Row>
          <Col md={6}>
            <strong>Nombre:</strong>
            <p>{usuario.nombre}</p>
          </Col>
          <Col md={6}>
            <strong>Correo:</strong>
            <p>{usuario.correo}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <strong>Número de Casa:</strong>
            <p>{usuario.casa}</p>
          </Col>
        </Row>
        <div className="text-center mt-4">
          <Button variant="primary">Editar Perfil</Button>
        </div>
      </Card>
    </Container>
  );
}

export default PerfilUsuario;