import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Container, Alert, Spinner, Card } from 'react-bootstrap';
import api from '../../api/axios';

const validationSchema = Yup.object({
  nombre: Yup.string().trim().required('El nombre es obligatorio'),
  rut: Yup.string().matches(/^[0-9]{7,8}-[0-9kK]$/, 'Formato de RUT inválido').required('El RUT es obligatorio'),
  n_casa: Yup.string().trim().required('El número de casa es obligatorio'),
  tieneAuto: Yup.string().required('Debes seleccionar una opción'),
  patente: Yup.string()
    .matches(/^[A-Z0-9- ]{4,7}$/, 'Formato de patente inválido')
    .when('tieneAuto', {
      is: 'si',
      then: (schema) => schema.required('La patente es obligatoria'),
      otherwise: (schema) => schema.notRequired(),
    }),
  modelo: Yup.string().when('tieneAuto', {
    is: 'si',
    then: (schema) => schema.required('El modelo es obligatorio'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

function IngresoVisita() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const formik = useFormik({
    initialValues: {
      nombre: '',
      rut: '',
      n_casa: '',
      tieneAuto: '',
      patente: '',
      modelo: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setSuccessMessage(null);
      setErrorMessage(null);
      try {
        const visitaPayload = {
          nombre: values.nombre,
          rut: values.rut,
          fecha_hora: new Date().toISOString(),
          n_casa: values.n_casa,
        };

        const visitaRes = await api.post('/visitas/', visitaPayload);
        const visitaId = visitaRes.data.id;

        if (values.tieneAuto === 'si') {
          const vehiculoPayload = {
            placa: values.patente,
            modelo: values.modelo,
            estado: 'activo',
            registro_visita: visitaId,
          };
          await api.post('/vehiculos-visita/', vehiculoPayload);
        }

        setSuccessMessage('Visita registrada con éxito');
        resetForm();
      } catch (err) {
        console.error(err);
        setErrorMessage('Error al registrar la visita. Por favor intenta nuevamente');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ maxWidth: '400px', width: '100%' }} className="p-4 shadow-lg">
        <h2>Ingreso de Visita</h2>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formNombre" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre"
              placeholder="Ingresa el nombre del visitante"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              isInvalid={formik.touched.nombre && !!formik.errors.nombre}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.nombre}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formRut" className="mb-3">
            <Form.Label>RUT</Form.Label>
            <Form.Control
              name="rut"
              placeholder="Ej: 12345678-9"
              value={formik.values.rut}
              onChange={formik.handleChange}
              isInvalid={formik.touched.rut && !!formik.errors.rut}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.rut}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formCasa" className="mb-3">
            <Form.Label>N° Casa</Form.Label>
            <Form.Control
              name="n_casa"
              placeholder="Ingrese el número de casa"
              value={formik.values.n_casa}
              onChange={formik.handleChange}
              isInvalid={formik.touched.n_casa && !!formik.errors.n_casa}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.n_casa}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formTieneAuto" className="mb-3">
            <Form.Label>¿Tiene Auto?</Form.Label>
            <Form.Select
              name="tieneAuto"
              value={formik.values.tieneAuto}
              onChange={formik.handleChange}
              isInvalid={formik.touched.tieneAuto && !!formik.errors.tieneAuto}>
              <option value="">Seleccione</option>
              <option value="no">No</option>
              <option value="si">Sí</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{formik.errors.tieneAuto}</Form.Control.Feedback>
          </Form.Group>

          {formik.values.tieneAuto === 'si' && (
            <>
              <Form.Group controlId="formPatente" className="mb-3">
                <Form.Label>Patente</Form.Label>
                <Form.Control
                  name="patente"
                  placeholder="Ej: ABCD-123"
                  value={formik.values.patente}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.patente && !!formik.errors.patente}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.patente}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formModelo" className="mb-3">
                <Form.Label>Modelo</Form.Label>
                <Form.Control
                  name="modelo"
                  placeholder="Ej: Toyota Yaris"
                  value={formik.values.modelo}
                  onChange={formik.handleChange}
                  isInvalid={formik.touched.modelo && !!formik.errors.modelo}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.modelo}</Form.Control.Feedback>
              </Form.Group>
            </>
          )}

          <Button variant="primary" type="submit" disabled={loading} className="w-100">
            {loading ? (<><Spinner animation="border" size="sm" /> Registrando...</>) : 'Ingresar'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default IngresoVisita;
