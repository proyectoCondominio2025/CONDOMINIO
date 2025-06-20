import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Container, Alert, Spinner, Card } from 'react-bootstrap';
import api from '../../api/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


// 📑 Validación • sin `modelo`
const validationSchema = Yup.object({
  residente_id: Yup.string().required('Debe seleccionar un residente'),
  nombre: Yup.string().trim().required('El nombre es obligatorio'),
  rut: Yup.string()
    .matches(/^[0-9]{7,8}-[0-9kK]$/, 'Formato de RUT inválido')
    .required('El RUT es obligatorio'),
  n_casa: Yup.string().trim().required('El número de casa es obligatorio'),
  tieneAuto: Yup.string().required('Debes seleccionar una opción'),
  patente: Yup.string()
    // .matches(/^[A-Z0-9- ]{4,7}$/, 'Formato de patente inválido')
    .when('tieneAuto', {
      is: 'si',
      then: (schema) => schema.required('La patente es obligatoria'),
      otherwise: (schema) => schema.notRequired(),
    }),
});

function IngresoVisita() {
  const [loading, setLoading] = useState(false);
  const [residentes, setResidentes] = useState([]);
  const navigate = useNavigate();

  // 🔄 Cargar residentes para el <select>
  useEffect(() => {
    const cargarResidentes = async () => {
      try {
        const res = await api.get('/residentes/listar');
        setResidentes(res.data);
      } catch (error) {
        console.error('Error cargando residentes:', error);
      }
    };
    cargarResidentes();
  }, []);

  // 🧾 Formik
  const formik = useFormik({
    initialValues: {
      residente_id: '',
      nombre: '',
      rut: '',
      n_casa: '',
      tieneAuto: '',
      patente: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const payload = {
          nombre: values.nombre,
          rut: values.rut,
          n_casa: values.n_casa,
          residente_id: values.residente_id,
        };

        if (values.tieneAuto === 'si') {
          payload.vehiculos = [{ placa: values.patente }];
        }

        await api.post('/visitas/crear/', payload);

        // ✅ Mostrar SweetAlert y redirigir si el usuario confirma
        Swal.fire({
          icon: 'success',
          title: 'Visita registrada',
          text: 'La visita fue registrada exitosamente.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          navigate('/portero/lista-visita');
        });

        resetForm();
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo registrar la visita. Intenta nuevamente.',
          confirmButtonColor: '#d33'
        });
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ maxWidth: '500px', width: '100%' }} className="p-4 shadow-lg">
        <h2 className="mb-4 text-center">Ingreso de Visita</h2>
        <Form noValidate onSubmit={formik.handleSubmit}>
          {/* Residente */}
          <Form.Group className="mb-3">
            <Form.Label>Residente</Form.Label>
            <Form.Select
              name="residente_id"
              value={formik.values.residente_id}
              onChange={formik.handleChange}
              isInvalid={formik.touched.residente_id && !!formik.errors.residente_id}
            >
              <option value="">Seleccione un residente</option>
              {residentes.map((res) => (
                <option key={res.id} value={res.id}>
                  {res.nombre} - Casa {res.numero_casa}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formik.errors.residente_id}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Nombre visitante */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre del visitante</Form.Label>
            <Form.Control
              name="nombre"
              value={formik.values.nombre}
              onChange={formik.handleChange}
              isInvalid={formik.touched.nombre && !!formik.errors.nombre}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.nombre}</Form.Control.Feedback>
          </Form.Group>

          {/* RUT */}
          <Form.Group className="mb-3">
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

          {/* Nº Casa */}
          <Form.Group className="mb-3">
            <Form.Label>N° Casa</Form.Label>
            <Form.Control
              name="n_casa"
              value={formik.values.n_casa}
              onChange={formik.handleChange}
              isInvalid={formik.touched.n_casa && !!formik.errors.n_casa}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.n_casa}</Form.Control.Feedback>
          </Form.Group>

          {/* ¿Tiene auto? */}
          <Form.Group className="mb-3">
            <Form.Label>¿Tiene Auto?</Form.Label>
            <Form.Select
              name="tieneAuto"
              value={formik.values.tieneAuto}
              onChange={formik.handleChange}
              isInvalid={formik.touched.tieneAuto && !!formik.errors.tieneAuto}
            >
              <option value="">Seleccione</option>
              <option value="no">No</option>
              <option value="si">Sí</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{formik.errors.tieneAuto}</Form.Control.Feedback>
          </Form.Group>

          {formik.values.tieneAuto === 'si' && (
            <Form.Group className="mb-4">
              <Form.Label>Patente</Form.Label>
              <Form.Control
                name="patente"
                value={formik.values.patente}
                onChange={formik.handleChange}
                isInvalid={formik.touched.patente && !!formik.errors.patente}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.patente}</Form.Control.Feedback>
            </Form.Group>
          )}

          <Button variant="primary" type="submit" disabled={loading} className="w-100">
            {loading ? (<><Spinner animation="border" size="sm" /> Registrando...</>) : 'Registrar Visita'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default IngresoVisita;
