import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

function EditarAnuncioModal({ show, handleClose, anuncio, onGuardar }) {

    // Esquema de validación Yup para anuncio
    const validationSchema = Yup.object().shape({
        titulo: Yup.string()
            .max(30, 'Máximo 30 caracteres')
            .required('El título es obligatorio'),
        contenido: Yup.string()
            .max(1000, 'Máximo 1000 caracteres')
            .required('El contenido es obligatorio'),
        fecha_ex: Yup.date()
            .required('La fecha de expiración es obligatoria'),
    });

    const initialValues = {
        titulo: anuncio?.titulo || '',
        contenido: anuncio?.contenido || '',
        fecha_ex: anuncio?.fecha_ex || '',
    };

    const formikKey = anuncio ? anuncio.id : 'nuevo';

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Noticia</Modal.Title>
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
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    name="titulo"
                                    value={values.titulo}
                                    onChange={handleChange}
                                    isInvalid={touched.titulo && !!errors.titulo}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.titulo}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Contenido</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="contenido"
                                    value={values.contenido}
                                    onChange={handleChange}
                                    isInvalid={touched.contenido && !!errors.contenido}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.contenido}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Fecha de Expiración</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="fecha_ex"
                                    value={values.fecha_ex}
                                    onChange={handleChange}
                                    isInvalid={touched.fecha_ex && !!errors.fecha_ex}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.fecha_ex}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleClose} disabled={isSubmitting}>
                                Cancelar
                            </Button>
                            <Button variant="success" type="submit" disabled={isSubmitting}>
                                Guardar Cambios
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}

export default EditarAnuncioModal;
