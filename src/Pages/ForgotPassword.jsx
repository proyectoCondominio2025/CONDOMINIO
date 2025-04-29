import React, { useState } from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function RecuperarContrasenaPage() {
  const [enviado, setEnviado] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo es obligatorio'),
    }),
    onSubmit: (values) => {
      console.log('Correo enviado a:', values.email);
      setEnviado(true);
    },
  });

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="text-center mb-4">Recuperar Contraseña</h3>
          {enviado && <Alert variant="success">Se ha enviado un correo con las instrucciones.</Alert>}

          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Ingresa tu correo"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.email && !!formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Enviar instrucciones
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RecuperarContrasenaPage;