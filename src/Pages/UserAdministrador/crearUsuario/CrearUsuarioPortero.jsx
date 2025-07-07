
import { Form, Button, Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import api from '../../../api/axios'; 
import Swal from 'sweetalert2';

export default function CrearUsuarioPortero() {
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
    });

    const initialValues = {
        rut: '',
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        password: '', 
        passwordConfirmation: '',  
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
                
                const newUserPortero = {...values,
                    tipo_de_usuario : 'portero'
                }

                try {
                    const response = await api.post('usuarios/', newUserPortero); // ajusta la URL
                    
                    console.log('Usuario creado:', response.data);
                    resetForm();

                    Swal.fire({
                        icon: 'success',
                        title: '¡Usuario portero creado!',
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
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formRutPortero" className='mt-2'>
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
                            <Form.Group controlId="formNombrePortero" className='mt-2'>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    placeholder="Nombre"
                                    value={values.nombre}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    isInvalid={touched.nombre && !!errors.nombre}
                                />
                                <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formApellidoPortero" className='mt-2'>
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="apellido"
                                    placeholder="Apellido"
                                    value={values.apellido}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    isInvalid={touched.apellido && !!errors.apellido}
                                />
                                <Form.Control.Feedback type="invalid">{errors.apellido}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formCorreoPortero" className='mt-2'>
                                <Form.Label>Correo Electrónico</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="correo"
                                    placeholder="Correo Electrónico"
                                    onBlur={handleBlur}
                                    value={values.correo}
                                    onChange={handleChange}
                                    isInvalid={touched.correo && !!errors.correo}
                                />
                                <Form.Control.Feedback type="invalid">{errors.correo}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formTelefonoPortero" className='mt-2'>
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telefono"
                                    placeholder="Ej: +56912345678"
                                    value={values.telefono}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    isInvalid={touched.telefono && !!errors.telefono}
                                />
                                <Form.Control.Feedback type="invalid">{errors.telefono}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formPasswordPortero" className='mt-2'>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    value={values.password}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    isInvalid={touched.password && !!errors.password}
                                />
                                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formPasswordConfirmationPortero" className='mt-2'>
                                <Form.Label>Confirmar Contraseña</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="passwordConfirmation"
                                    placeholder="Confirma la Contraseña"
                                    onBlur={handleBlur}
                                    value={values.passwordConfirmation}
                                    onChange={handleChange}
                                    isInvalid={touched.passwordConfirmation && !!errors.passwordConfirmation}
                                />
                                <Form.Control.Feedback type="invalid">{errors.passwordConfirmation}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button type="submit" variant="primary">Crear Usuario</Button>
                </Form>
            )}
        </Formik>
    );
}