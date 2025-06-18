import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';




function PerfilUsuario() {
  
  const token = localStorage.getItem("accessToken");
  let nombre = null
  if (token) {
    try {
      const decoded = jwtDecode(token);
      nombre = decoded.nombre;
      apellido= decoded.apellido;
      correo= decoded.correo;
      


    } catch (e) {
      console.error("Token inválido:", e);
      localStorage.removeItem("accessToken"); // Limpia si está corrupto
    }
  }



  return (
    <Container className="mt-5">
      <Card className="shadow p-4">
        <h2 className="mb-4 text-center">Perfil del Usuario</h2>
        <Row>
          <Col md={6}>
            <strong>Nombre:</strong>
            <p>{nombre}+{apellido}</p>
          </Col>
          <Col md={6}>
            <strong>Correo:</strong>
            <p>{correo}</p>
          </Col>
        </Row>
        <Row>
          {/* <Col md={6}>
            <strong>Número de Casa:</strong>
            <p>{numero_casacasa}</p>
          </Col> */}
        </Row>
        <div className="text-center mt-4">
          <Button variant="primary">Editar Perfil</Button>
        </div>
      </Card>
    </Container>
  );
}

export default PerfilUsuario;