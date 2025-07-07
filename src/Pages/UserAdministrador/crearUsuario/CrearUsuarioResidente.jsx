import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import api from '../../../api/axios';
import Swal from 'sweetalert2';

export default function CrearUsuarioResidente() {

    const validationSchema = Yup.object().shape({
        rut: Yup.string().required('El RUT es obligatorio'),
        nombre: Yup.string().required('El nombre es obligatorio'),
        apellido: Yup.string().required('El apellido es obligatorio'),
        correo: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
        telefono: Yup.string().required('El teléfono es obligatorio'),
        password: Yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es obligatoria'),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
            .required('Confirma la contraseña'),
        numero_casa: Yup.number()
            .typeError('Debe ingresar un número válido')
            .integer('Debe ser un número entero')
            .positive('Debe ser un número positivo')
            .required('N° de casa es obligatorio'),
        gastos_comunes: Yup.number()
            .typeError('Debe ingresar un número válido')
            .positive('Debe ser mayor a 0')
            .integer('Debe ser un número entero')
            .required('El valor de gastos comunes es obligatorio'),
        vehiculo: Yup.string().required('Indique si tiene vehículo'),
        patente: Yup.string().when('vehiculo', ([vehiculo], schema) => {
            return vehiculo === 'si'
                ? schema.required('Debe ingresar la patente')
                : schema.notRequired();
        })
    });


    const initialValues = {
        rut: '',
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        passwordConfirmation: '',
        telefono: '',
        numero_casa: '',
        gastos_comunes: '',
        vehiculo: '',
        patente: '',
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {

                const usuarioFinal = {
                    ...values,
                    tipo_de_usuario: 'residente'
                };

                try {
                    const response = await api.post('residentes/', usuarioFinal);
                    console.log('Usuario creado:', response.data);
                    resetForm();

                    Swal.fire({
                        icon: 'success',
                        title: '¡Usuario residente creado!',
                        text: `El usuario ${response.data.nombre} ha sido creado exitosamente.`,
                        timer: 3000,
                        showConfirmButton: false
                    });

                } catch (error) {
                    if (error.response) {
                        console.error('Status:', error.response.status);
                        console.error('Errores de validación:', error.response.data);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al crear usuario',
                            text: error.response.data.detail || 'Verifica los datos ingresados.'
                        });
                    } else {
                        console.error('Error de red u otro:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error de red',
                            text: 'No se pudo conectar con el servidor.'
                        });
                    }
                }
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                errors,
                setFieldValue
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formRut">
                                <Form.Label>RUT</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="rut"
                                    placeholder="Ej: 12.345.678-9"
                                    value={values.rut}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.rut && !!errors.rut}
                                />
                                <Form.Control.Feedback type="invalid">{errors.rut}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formNombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre"
                                    value={values.nombre}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.nombre && !!errors.nombre}
                                />
                                <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formApellido">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="apellido"
                                    placeholder="Apellido"
                                    value={values.apellido}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.apellido && !!errors.apellido}
                                />
                                <Form.Control.Feedback type="invalid">{errors.apellido}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formCorreo">
                                <Form.Label>Correo Electrónico</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="correo"
                                    placeholder="Correo Electrónico"
                                    value={values.correo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.correo && !!errors.correo}
                                />
                                <Form.Control.Feedback type="invalid">{errors.correo}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.password && !!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formPasswordConfirmation">
                                <Form.Label>Confirmar Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="passwordConfirmation"
                                    placeholder="Confirma la Contraseña"
                                    value={values.passwordConfirmation}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.passwordConfirmation && !!errors.passwordConfirmation}
                                />
                                <Form.Control.Feedback type="invalid">{errors.passwordConfirmation}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formTelefono">
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefono"
                                    placeholder="Ej: +56912345678"
                                    value={values.telefono}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.telefono && !!errors.telefono}
                                />
                                <Form.Control.Feedback type="invalid">{errors.telefono}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formCasa">
                                <Form.Label>N° de Casa</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="numero_casa"
                                    placeholder="Ingrese N° de casa"
                                    value={values.numero_casa}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.numero_casa && !!errors.numero_casa}
                                />
                                <Form.Control.Feedback type="invalid">{errors.numero_casa}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formGasto">
                                <Form.Label>Gasto</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="gastos_comunes"
                                    placeholder="Ingrese valor"
                                    value={values.gastos_comunes}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.gastos_comunes && !!errors.gastos_comunes}
                                />
                                <Form.Control.Feedback type="invalid">{errors.gastos_comunes}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formVehiculo">
                                <Form.Label>¿Tiene Vehículo?</Form.Label>
                                <Form.Select
                                    name="vehiculo"
                                    value={values.vehiculo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    isInvalid={touched.vehiculo && !!errors.vehiculo}
                                >
                                    <option value="">Selecciona una opción</option>
                                    <option value="si">Sí</option>
                                    <option value="no">No</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{errors.vehiculo}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        {values.vehiculo === 'si' && (
                            <Col md={6}>
                                <Form.Group controlId="formPatente">
                                    <Form.Label>Patente del Vehículo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="patente"
                                        placeholder="Ej: ABCD12"
                                        value={values.patente}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setFieldValue('patente', value);
                                            setFieldValue('vehiculo', value.trim() !== '' ? 'si' : 'no');
                                        }}
                                        onBlur={handleBlur}
                                        isInvalid={touched.patente && !!errors.patente}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.patente}</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        )}
                    </Row>
                    <Button variant="primary" type="submit">
                        Crear Usuario
                    </Button>
                </Form>
            )}
        </Formik>
    );
}