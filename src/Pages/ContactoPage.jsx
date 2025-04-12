import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';


function ContactoPage() {
  return (
    <Container className="mt-5">
      <h2>Formulario de Contacto</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu nombre" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCorreo">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control type="email" placeholder="Ingresa tu correo" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMensaje">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Tu mensaje aquí..." />
        </Form.Group>

        <Button variant="primary" type="submit">Enviar</Button>
      </Form>
    </Container>
  );
}

export default ContactoPage;
