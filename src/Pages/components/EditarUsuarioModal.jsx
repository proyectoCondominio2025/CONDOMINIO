import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';



function EditarUsuarioModal({ show, handleClose, usuario, onGuardar }) {

    // Esquema de validación Yup
    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required('El nombre es obligatorio'),
        apellido: Yup.string().required('El apellido es obligatorio'),
        correo: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
        telefono: Yup.string()
          .min(8, 'El teléfono debe tener al menos 8 dígitos')
          .required('El teléfono es obligatorio'),
        tipo_de_usuario: Yup.string(),
      
        gastos_comunes: Yup.number() // <-- Aqui empieza la cadena Yup.number()...
          .typeError('Debe ser un número')
          .when('tipo_de_usuario', {
            is: 'residente',
            then: schema => schema.required('Los gastos comunes son obligatorios'),
            otherwise: schema => schema.notRequired(),
          }),
      
        numero_casa: Yup.number()
          .typeError('Debe ser un número')
          .when('tipo_de_usuario', {
            is: 'residente',
            then: schema => schema.required('El número de casa es obligatorio'),
            otherwise: schema => schema.notRequired(),
          }),
      
        patente: Yup.string()
          .when('tipo_de_usuario', {
            is: 'residente',
            then: schema => schema.required('La patente es obligatoria'),
            otherwise: schema => schema.notRequired(),
          }),
      });
      
      

    console.log('Usuario en EditarUsuarioModal:', usuario);

    const initialValues = {
        nombre: usuario?.nombre || '',
        apellido: usuario?.apellido || '',
        correo: usuario?.correo || '',
        telefono: usuario?.telefono || '',
        gastos_comunes: usuario?.gastos_comunes || '',
        patente: usuario?.vehiculo_placa || '',
        numero_casa: usuario?.numero_casa || '',
    };

    const formikKey = usuario ? usuario.id : 'nuevo';

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Usuario</Modal.Title>
            </Modal.Header>
            <Formik
                key={formikKey}
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={(values, { setSubmitting }) => {
                    onGuardar(values);
                    setSubmitting(false);
                }}
            >
                {({ handleSubmit, handleChange, values, errors, touched, isSubmitting }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Modal.Body>
                            <Form.Group className="mb-2">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    name="nombre"
                                    value={values.nombre}
                                    onChange={handleChange}
                                    isInvalid={touched.nombre && !!errors.nombre}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nombre}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control
                                    name="apellido"
                                    value={values.apellido}
                                    onChange={handleChange}
                                    isInvalid={touched.apellido && !!errors.apellido}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.apellido}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control
                                    name="correo"
                                    type="email"
                                    value={values.correo}
                                    onChange={handleChange}
                                    isInvalid={touched.correo && !!errors.correo}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.correo}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control
                                    name="telefono"
                                    value={values.telefono}
                                    onChange={handleChange}
                                    isInvalid={touched.telefono && !!errors.telefono}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.telefono}
                                </Form.Control.Feedback>
                            </Form.Group>
                            {usuario.tipo_de_usuario == 'residente' &&
                                <div>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Numero Casa</Form.Label>
                                        <Form.Control
                                            name="numero_casa"
                                            value={values.numero_casa}

                                            onChange={handleChange}
                                            isInvalid={touched.numero_casa && !!errors.numero_casa}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.numero_casa}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Patente del vehiculo</Form.Label>
                                        <Form.Control
                                            name="patente"
                                            value={values.patente}
                                            onChange={handleChange}
                                            isInvalid={touched.patente && !!errors.patente}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.patente}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Gastos Comunes</Form.Label>
                                        <Form.Control
                                            name="gastos_comunes"
                                            value={values.gastos_comunes}
                                            onChange={handleChange}
                                            isInvalid={touched.gastos_comunes && !!errors.gastos_comunes}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.gastos_comunes}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>}

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleClose} disabled={isSubmitting}>
                                Cancelar
                            </Button>
                            <Button variant="success" type="submit" disabled={isSubmitting}>
                                Guardar
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}

export default EditarUsuarioModal;
