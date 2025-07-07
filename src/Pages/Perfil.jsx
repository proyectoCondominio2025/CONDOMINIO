import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

import { jwtDecode } from 'jwt-decode';

function Perfil() {
  const [usuario, setUsuario] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const datosUsuario = {
          nombre: decoded.nombre,
          apellido: decoded.apellido,
          correo: decoded.correo,
          telefono: decoded.telefono || '',
          numero_casa: decoded.numero_casa || '-',
        };
        setUsuario(datosUsuario);

      } catch (error) {
        console.error("Token inválido:", error);
        localStorage.removeItem("accessToken");
        setUsuario(null);
      }
    }
  }, []);


 

  if (!usuario) {
    return (
      <div className="text-center mt-5">
        <p>No se pudo cargar el perfil. Inicia sesión nuevamente.</p>
      </div>
    );
  }

  const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`;

  return (
    <>

      <Container className="mt-5 d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
        <Card className="shadow-lg rounded-4 p-4 w-100" style={{ maxWidth: 500, background: 'rgba(255,255,255,0.96)' }}>
          <div className="d-flex flex-column align-items-center mb-4">
            <div
              className="rounded-circle bg-primary text-white shadow-lg d-flex justify-content-center align-items-center mb-3"
              style={{ width: 96, height: 96, fontSize: 38, fontWeight: 700, letterSpacing: 1.5, border: "4px solid #e0e7ef" }}
            >
              {nombreCompleto
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()}
            </div>
            <h2 className="mb-0 text-primary" style={{ fontWeight: 800, letterSpacing: 1 }}>
              {nombreCompleto}
            </h2>
          </div>
          <Row className="mb-3">
            <Col xs={12}>
              <strong>Nombre:</strong>
              <div className="mb-2">{nombreCompleto}</div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <strong>Correo:</strong>
              <div className="mb-2">{usuario.correo}</div>
            </Col>
            <Col xs={12} md={6}>
              <strong>Número de telefono:</strong>
              <div className="mb-2">{usuario.telefono}</div>
            </Col>
          </Row>
          <div className="text-center mt-3">

          </div>
        </Card>
      </Container>
    </>
  );
}

export default Perfil;
