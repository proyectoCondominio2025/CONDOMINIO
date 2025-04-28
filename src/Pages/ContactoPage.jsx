import React from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';


// Definimos las validaciones con Yup
const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio'),
  correo: Yup.string()
    .email('Correo inválido')
    .required('El correo electrónico es obligatorio'),
  mensaje: Yup.string().required('El mensaje es obligatorio'),
});

function ContactoPage() {
  // Usamos Formik para manejar el formulario y las validaciones
  const formik = useFormik({
    initialValues: {
      nombre: '',
      correo: '',
      mensaje: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Formulario enviado:', values);
    },
  });

  return (
    <Container className="mt-5">
      <h2>Formulario de Contacto</h2>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu nombre"
            name="nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            isInvalid={formik.touched.nombre && !!formik.errors.nombre}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.nombre}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCorreo">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo"
            name="correo"
            value={formik.values.correo}
            onChange={formik.handleChange}
            isInvalid={formik.touched.correo && !!formik.errors.correo}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.correo}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMensaje">
          <Form.Label>Mensaje</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Tu mensaje aquí..."
            name="mensaje"
            value={formik.values.mensaje}
            onChange={formik.handleChange}
            isInvalid={formik.touched.mensaje && !!formik.errors.mensaje}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.mensaje}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Container>
  );
}

export default ContactoPage;
