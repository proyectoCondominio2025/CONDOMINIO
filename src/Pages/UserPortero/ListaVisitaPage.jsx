import React, { useState } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa'; // ícono de plus
import { useNavigate } from 'react-router-dom';

function ListaVisita() {
  const [autos, setAutos] = useState([
    { id: 1, nombre: 'perez', Rut: '26493126-6', casa: '101', tieneAuto:'si' , patente:'45678', estado: 'Adentro' },
    { id: 2, nombre: 'Maria perez', Rut: '26493126-6', casa: '102', tieneAuto:'si' , patente:'45678', estado: 'Salió' },
    { id: 3, nombre: 'jose perez', Rut: '26493126-6', casa: '103', tieneAuto:'si' , patente:'45678', estado: 'Adentro' },
    { id: 4, nombre: 'nio perez', Rut: '26493126-6', casa: '103', tieneAuto:'no' , patente:'45678', estado: 'Adentro' }
  ]);

  const navigate = useNavigate();

  const eliminarVisita = (id) => {
    const nuevosAutos = autos.filter(auto => auto.id !== id);
    setAutos(nuevosAutos);
  };

  const editarVisita = (auto) => {
    console.log('Editar visita:', auto);
    // Aquí puedes redirigir a otra página con react-router o abrir un modal
  };

  const agregarVisita = () => {
    
    navigate('/ingreso-visita');
    console.log('Agregar nueva visita');
    // Aquí podrías abrir un modal o redirigir a otra página
  };

  return (
    <Container className="mt-5">

      <h2>Lista de Visitas</h2>
      <Row className="mb-3">
        <Col>
          <Button
            variant="primary"
            onClick={agregarVisita}
            className="d-flex align-items-center gap-2 shadow-sm rounded px-3 py-2">
            <FaPlus />
            Agregar Visita
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Rut</th>
            <th>N° Casa</th>
            <th>Tiene Auto</th>
            <th>Patente</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {autos.map(auto => (
            <tr key={auto.id}>
              <td>{auto.id}</td>
              <td>{auto.nombre}</td>
              <td>{auto.Rut}</td>
              <td>{auto.casa}</td>
              <td>{auto.tieneAuto}</td>
              <td>{auto.patente}</td>
              <td>{auto.estado}</td>
              <td>
                <Button
                  variant="success"
                  className="me-2"
                  onClick={() => editarVisita(auto)}>
                  Editar
                </Button>

                <Button variant="danger" onClick={() => eliminarVisita(auto.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListaVisita;
