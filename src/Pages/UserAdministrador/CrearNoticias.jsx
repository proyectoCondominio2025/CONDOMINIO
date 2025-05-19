import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import AdminNavbar from '../components/AdminNavbar';


const CrearNoticia = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const fechaActual = new Date().toLocaleDateString();

  const handleImagenChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí iría la lógica para guardar la noticia (enviar a backend o consola)
    /*console.log({
      titulo,
      descripcion,
      fecha: fechaActual,
      imagen,
    });*/

    // Reset formulario
    setTitulo('');
    setDescripcion('');
    setImagen(null);
  };

  return (
    <>
      <Container className="mt-4">
        <h2>Crear Noticia</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitulo">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Ingrese la descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formFecha">
            <Form.Label>Fecha</Form.Label>
            <Form.Control type="text" value={fechaActual} readOnly />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImagen">
            <Form.Label>Imagen (opcional)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImagenChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Crear
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default CrearNoticia;
