import React, { useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { autos } from '../../data/data';


function ListaAutos() {



  const eliminarAuto = (id) => {
    const nuevosAutos = autos.filter(auto => auto.id !== id);
    setAutos(nuevosAutos);
  };
  const editarVehiculo = (auto) => {
    console.log('Editar vehiculo:', auto);
    // Aquí puedes redirigir a otra página con react-router o abrir un modal
  };

 
  return (
    <Container className="mt-5">
      <h2>Lista de Autos</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patente</th>
            <th>Dueño</th>
            <th>N° Casa</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {autos.map(auto => (
            <tr key={auto.id}>
              <td>{auto.id}</td>
              <td>{auto.patente}</td>
              <td>{auto.duenio}</td>
              <td>{auto.casa}</td>
              <td>{auto.estado}</td>
              <td>
                <Button
                  variant="success"
                  className="me-2"
                  onClick={() => editarVehiculo(auto)}>
                  Editar
                </Button>

                <Button variant="danger" onClick={() => alert('se elimino el auto con patente: ' + auto.patente)}>
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

export default ListaAutos;
