// src/Pages/LoginPage.jsx
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function LoginPage() {
  const [loading, setLoading] = useState(false); // Estado para el loading
  const navigate = useNavigate();

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
    onSubmit: async (values) => {
      setLoading(true);

      try {
        const response = await api.post(
          'token/',
          {
            correo: values.email,
            password: values.password,
          }
        );
        // Guarda los tokens
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);

        // 🚩 Aquí va el tipo:
        const tipo = response.data.tipo_de_usuario; // <-- debe venir del backend

        setLoading(false);

        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: 'Has iniciado sesión correctamente.',
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          if (tipo === "residente") {
            navigate("/home-residente");
          } else if (tipo === "portero") {
            navigate("/home-portero");
          } else if (tipo === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        });

      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Correo o contraseña incorrectos.',
        });
      }
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
