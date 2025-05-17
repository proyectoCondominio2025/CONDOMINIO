
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col} from 'react-bootstrap';
import AdminNavbar from '../components/AdminNavbar';


const CrearUsuarioForm = () => {
  const [formData, setFormData] = useState({
      rut: '',
      nombre: '',
      telefono: '',
      nCasa:'',
      vehiculo:'',
      patente:'',
      vGastosComunes:'',
      tipoUsuario:''
  });

  const handleChange = (e) => {
      const { name, value } = e.target;
    
      // Si el campo modificado es la patente
      if (name === 'patente') {
        // Si se borra el contenido, automáticamente selecciona "No" en vehiculo
        setFormData((prev) => ({
          ...prev,
          patente: value,
          vehiculo: value.trim() === '' ? 'no' : 'si'
        }));
      } else {
        // Caso normal
        setFormData({
          ...formData,
          [name]: value
        });
      }
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      // Aquí enviar los datos a tu backend o mostrarlos en consola
      console.log('Usuario creado:', formData);
    };
  
    return (
      <>
      <AdminNavbar/>
      <Container className="mt-4">
        <h2>Crear Usuario</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formRut">
                <Form.Label>RUT</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: 12.345.678-9"
                  name="rut"
                  value={formData.rut}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre completo"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Ej: +56912345678"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCasa">
                <Form.Label>N° de Casa</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese N° de casa "
                  name="nCasa"
                  value={formData.nCasa}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>     

            <Col md={6}>
            <Form.Group className="mb-3" controlId="formVahiculo">
              <Form.Label>¿Tiene Vehiculo?</Form.Label>
              <Form.Select
                  name="vehiculo"
                  value={formData.vehiculo}
                  onChange={handleChange}
                  required
              >
              <option value="">Selecciona un tipo</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
              </Form.Select>
              </Form.Group>

            </Col>

            <Col md={6}>
            {formData.vehiculo === 'si' && (
              <Form.Group className="mb-3" controlId="formPatente">
              <Form.Label>Patente del Vehículo</Form.Label>
              <Form.Control
                  type="text"
                  placeholder="Ej: ABCD12"
                  name="patente"
                  value={formData.patente || ''}
                  onChange={handleChange}
                  required
              />
              </Form.Group>
              )}

              </Col>

              <Col md={6}>
              <Form.Group controlId="formGasto">
                <Form.Label>Gasto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ingrese valor"
                  name="vGastosComunes"
                  value={formData.vGastosComunes}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
            <Form.Group className="mb-3" controlId="formTipoUsuario">
              <Form.Label>Seleccione Tipo de Usuario</Form.Label>
              <Form.Select
                  name="tipoUsuario"
                  value={formData.tipoUsuario}
                  onChange={handleChange}
                  required
              >
                   <option value="">Selecciona un tipo</option>
                  <option value="residente">Residente</option>
                  <option value="portero">Portero</option>
                  <option value="administrador">Administrador</option>
              </Form.Select>
              </Form.Group>

            </Col>



          </Row>
  

  
          <Button variant="primary" type="submit">
            Crear Usuario
          </Button>
        </Form>
      </Container>
      </>
    );
  };

  export default CrearUsuarioForm;