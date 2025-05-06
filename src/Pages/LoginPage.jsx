// src/Pages/LoginPage.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [loading, setLoading] = useState(false); // Estado para el loading
  const [error, setError] = useState(null); // Estado para mostrar error global

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false, // Campo para recordar al usuario
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo es obligatorio'),
      password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      
      try {
        // Aquí puedes hacer la lógica de autenticación, por ejemplo:
        // const response = await authService.login(values.email, values.password);

        // Simulación de autenticación exitosa
        setTimeout(() => {
          console.log('Email:', values.email);
          console.log('Password:', values.password);
          setLoading(false); // Finaliza el loading
          // Redirige al usuario o realiza alguna otra acción.
        }, 2000);
      } catch (error) {
        setLoading(false);
        setError('Error al iniciar sesión. Verifica tus credenciales.');
      }
    },
  });

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="p-4 shadow rounded-4">
            <h3 className="text-center mb-4">Iniciar Sesión</h3>

            {/* Mensaje de error general */}
            {error && <Alert variant="danger">{error}</Alert>}

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

              <Form.Group className="mt-3" controlId="formRememberMe">
                <Form.Check
                  type="checkbox"
                  name="rememberMe"
                  label="Recordarme"
                  checked={formik.values.rememberMe}
                  onChange={formik.handleChange}
                />
              </Form.Group>

              <div className="text-center mt-3">
                <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
              </div>

              {/* Botón de enviar */}
              <Button
                variant="primary"
                type="submit"
                className="w-100 mt-4"
                disabled={loading} // Desactiva el botón mientras se está enviando
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" /> Cargando...
                  </>
                ) : (
                  'Ingresar'
                )}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
