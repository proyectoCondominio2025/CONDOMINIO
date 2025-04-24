import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';


function IngresoVisita() {
    const [tieneAuto, setTieneAuto] = useState('si');

  const handleCambioAuto = (e) => {
    setTieneAuto(e.target.value);
  };
  return (
    <Container className="mt-5">
      <h2>Ingreso de visita</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu nombre" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCorreo">
          <Form.Label>Rut:</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu rut" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMensaje">
          <Form.Label>N° Casa:</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu numero casa" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTieneAuto">
          <Form.Label>¿Tiene auto?</Form.Label>
          <Form.Select value={tieneAuto} onChange={handleCambioAuto}>
            <option value="no">No</option>
            <option value="si">Sí</option>
          </Form.Select>
        </Form.Group>

        {tieneAuto =='si' && <Form.Group className="mb-3" controlId="formPatente">
          <Form.Label>Patente</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa la patente"
          />
        </Form.Group>}

        <Button variant="primary" type="submit">Ingreso</Button>
      </Form>
    </Container>
  );
}

export default IngresoVisita;
