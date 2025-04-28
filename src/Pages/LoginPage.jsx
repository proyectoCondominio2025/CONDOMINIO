// src/Pages/LoginPage.jsx
import React from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

function LoginPage() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo es obligatorio'),
      password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
    }),
    onSubmit: (values) => {
      console.log('Email:', values.email);
      console.log('Password:', values.password);
      // Aquí podrías hacer la autenticación
    },
  });

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="p-4 shadow rounded-4">
            <h3 className="text-center mb-4">Iniciar Sesión</h3>
            <Form noValidate onSubmit={formik.handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Correo Electrónico</Form.Label>
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

              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.password && !!formik.errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="text-center mt-3">
                <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
              </div>

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