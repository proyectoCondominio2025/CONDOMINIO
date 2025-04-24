import React, { useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';

function ListaVisita() {
  const [autos, setAutos] = useState([
    { id: 1, nombre: 'perez', Rut: '26493126-6', casa: 101, estado: 'Adentro' },
    { id: 2, nombre: 'Maria perez', Rut: '26493126-6', casa: 102, estado: 'Salió' },
    { id: 3, nombre: 'jose perez', Rut: '26493126-6', casa: 103, estado: 'Adentro' },
    { id: 4, nombre: 'nio perez', Rut: '26493126-6', casa: 103, estado: 'Adentro' }
  ]);

  const eliminarVisita = (id) => {
    const nuevosAutos = autos.filter(auto => auto.id !== id);
    setAutos(nuevosAutos);
  };

  return (
    <Container className="mt-5">
      <h2>Lista de Visitas</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Rut</th>
            <th>N° Casa</th>
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
              <td>{auto.estado}</td>
              <td>
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
