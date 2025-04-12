// src/Pages/LoginPage.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    // Aquí podrías hacer la autenticación
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="p-4 shadow rounded-4">
            <h3 className="text-center mb-4">Iniciar Sesión</h3>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-4">
                Ingresar
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
