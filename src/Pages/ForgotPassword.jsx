import React, { useState } from 'react';
import { Form, Button, Container, Alert, Row, Col, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function RecuperarContrasenaPage() {
  const [enviado, setEnviado] = useState(false); // Estado para el mensaje de éxito
  const [loading, setLoading] = useState(false); // Estado para controlar el loading

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo es obligatorio'),
    }),
    onSubmit: async (values) => {
      setLoading(true); // Activar el loading
      try {
        // Simula el envío (reemplazar con una API real)
        setTimeout(() => {
          setEnviado(true); // Mostrar el mensaje de éxito
          setLoading(false); // Desactivar el loading
          console.log('Correo enviado a:', values.email);
        }, 2000); // Simula un retraso de 2 segundos
      } catch (error) {
        setLoading(false); // Desactivar el loading
        console.error('Error al enviar el correo:', error);
      }
    },
  });

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="text-center mb-4">Recuperar Contraseña</h3>

          {/* Mensaje de éxito */}
          {enviado && (
            <Alert variant="success" className="text-center">
              Se ha enviado un correo con las instrucciones para recuperar tu contraseña.
            </Alert>
          )}

          {/* Formulario */}
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Ingresa tu correo"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.email && !!formik.errors.email}
                className="custom-input"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Botón de Enviar */}
            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> Enviando...
                </>
              ) : (
                'Enviar instrucciones'
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default RecuperarContrasenaPage;
