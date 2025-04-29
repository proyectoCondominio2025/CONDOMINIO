import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Container } from 'react-bootstrap';

// Validaciones con Yup
const validationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio'),
  rut: Yup.string()
    .matches(/^[0-9]{7,8}-[0-9kK]{1}$/, 'Formato de RUT inválido')
    .required('El RUT es obligatorio'),
  casa: Yup.string().required('El número de casa es obligatorio'),
  tieneAuto: Yup.string().required('Debes seleccionar una opción'),
  patente: Yup.mixed().when('tieneAuto', {
    is: 'si',
    then: () =>
      Yup.string()
        .matches(/^[A-Z]{2,3}[0-9]{2,3}$/, 'Formato de patente inválido')
        .required('La patente es obligatoria'),
    otherwise: () => Yup.string().notRequired(),
  }),
});

function IngresoVisita() {
  
  const formik = useFormik({
    initialValues: {
      nombre: '',
      rut: '',
      casa: '',
      tieneAuto: 'no',
      patente: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Datos enviados:', values);
    },
  });

  return (
    <Container className="mt-5">
      <h2>Ingreso de visita</h2>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            placeholder="Ingresa tu nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            isInvalid={formik.touched.nombre && !!formik.errors.nombre}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.nombre}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRut">
          <Form.Label>RUT</Form.Label>
          <Form.Control
            type="text"
            name="rut"
            placeholder="Ej: 12345678-9"
            value={formik.values.rut}
            onChange={formik.handleChange}
            isInvalid={formik.touched.rut && !!formik.errors.rut}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.rut}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCasa">
          <Form.Label>N° Casa</Form.Label>
          <Form.Control
            type="text"
            name="casa"
            placeholder="Ingresa tu número de casa"
            value={formik.values.casa}
            onChange={formik.handleChange}
            isInvalid={formik.touched.casa && !!formik.errors.casa}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.casa}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTieneAuto">
          <Form.Label>¿Tiene auto?</Form.Label>
          <Form.Select
            name="tieneAuto"
            value={formik.values.tieneAuto}
            onChange={formik.handleChange}
            isInvalid={formik.touched.tieneAuto && !!formik.errors.tieneAuto}
          >
            <option value="no">No</option>
            <option value="si">Sí</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {formik.errors.tieneAuto}
          </Form.Control.Feedback>
        </Form.Group>

        {formik.values.tieneAuto === 'si' && (
          <Form.Group className="mb-3" controlId="formPatente">
            <Form.Label>Patente</Form.Label>
            <Form.Control
              type="text"
              name="patente"
              placeholder="Ej: AB1234"
              value={formik.values.patente}
              onChange={formik.handleChange}
              isInvalid={formik.touched.patente && !!formik.errors.patente}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.patente}
            </Form.Control.Feedback>
          </Form.Group>
        )}

        <Button variant="primary" type="submit">
          Ingreso
        </Button>
      </Form>
    </Container>
  );
}

export default IngresoVisita;