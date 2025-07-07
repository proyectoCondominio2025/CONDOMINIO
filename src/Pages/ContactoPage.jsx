import React, { useState } from 'react';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import publicApi  from '../api/publicApi'; // Importamos la API pública

// Definimos las validaciones con Yup
const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio'),
  correo_electronico: Yup.string()
    .email('Correo inválido')
    .required('El correo electrónico es obligatorio'),
  mensaje: Yup.string().required('El mensaje es obligatorio'),
});

function ContactoPage() {
  const [enviado, setEnviado] = useState(false); // Para manejar el estado de envío
  const [loading, setLoading] = useState(false); // Para mostrar un loader durante el envío

  // Usamos Formik para manejar el formulario y las validaciones
  const formik = useFormik({
    initialValues: {
      nombre: '',
      correo_electronico: '',
      mensaje: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await publicApi.post('formulario-contacto/', values);

        setEnviado(true);
        Swal.fire({
          icon: 'success',
          title: '¡Formulario enviado!',
          text: 'Gracias por contactarnos. Te responderemos pronto.',
        });
      } catch (error) {
        console.error('Error al enviar el formulario:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al enviar el formulario. Inténtalo nuevamente.',
        });
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Formulario de Contacto</h2>

      {/* Mensaje de éxito */}
      {enviado && (
        <Alert variant="success" className="text-center">
          ¡Formulario enviado con éxito! Te contactaremos pronto.
        </Alert>
      )}

      <Form noValidate onSubmit={formik.handleSubmit}>
        {/* Campo Nombre */}
        <Form.Group className="mb-4" controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre"
            name="nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            isInvalid={formik.touched.nombre && !!formik.errors.nombre}
            className="custom-input"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.nombre}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Campo Correo */}
        <Form.Group className="mb-4" controlId="formCorreo">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo"
            name="correo_electronico"
            value={formik.values.correo_electronico}
            onChange={formik.handleChange}
            isInvalid={formik.touched.correo_electronico && !!formik.errors.correo_electronico}
            className="custom-input"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.correo_electronico}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Campo Mensaje */}
        <Form.Group className="mb-4" controlId="formMensaje">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Tu mensaje aquí..."
            name="mensaje"
            value={formik.values.mensaje}
            onChange={formik.handleChange}
            isInvalid={formik.touched.mensaje && !!formik.errors.mensaje}
            className="custom-input"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.mensaje}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Botón Enviar */}
        <Button variant="primary" type="submit" className="submit-btn w-100" disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Enviando...
            </>
          ) : (
            'Enviar'
          )}
        </Button>
      </Form>
    </Container>
  );
}

export default ContactoPage;
