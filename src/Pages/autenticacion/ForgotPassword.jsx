import React, { useState } from 'react';
import { Form, Button, Container, Alert, Row, Col, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import publicApi from '../../api/publicApi'
import Swal from 'sweetalert2';

function RecuperarContrasenaPage() {
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
      setLoading(true);
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await publicApi.post('/auth/password/reset/', {
          email: values.email
        });

        Swal.fire({
          icon: 'success',
          title: '¡Correo enviado!',
          text: 'Revisa tu bandeja de entrada para restablecer tu contraseña.',
          confirmButtonColor: '#3085d6'
        });

        formik.resetForm();
      } catch (err) {
        let errorMsg = 'No se pudo enviar el correo.';

        if (err.response?.data?.email?.length > 0) {
          errorMsg = err.response.data.email[0]; // Muestra el mensaje del campo 'email'
        } else if (err.response?.data?.detail) {
          errorMsg = err.response.data.detail;
        }

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMsg,
          confirmButtonColor: '#d33'
        });

        formik.setStatus(errorMsg);
      }finally{
        setLoading(false);
      }
    }
  });

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="text-center mb-4">Recuperar Contraseña</h3>

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
