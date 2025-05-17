import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { usuarios } from '../../data/data';

import { Link } from 'react-router-dom';

import AdminNavbar from '../components/AdminNavbar'; // ajusta la ruta según tu estructura



function ListaUsuarios() {
  return (
    <>
      <AdminNavbar />
      <div className="container mt-5">
        <Container className="mt-5">
        <Link to="/Crearusuarios">
        <Button variant="primary">Crear Usuario</Button>
        </Link>
      
    


    <h2>Lista de Usuarios</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Rut</th>
            <th>Nombre</th>
            <th>telefono</th>
            <th>N° Casa</th>
            <th>vehiculo</th>
            <th>patente</th>
            <th>gasto</th>
            <th>Tipo</th>
            <th>Acciones</th>

        
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuarios => (
            <tr key={usuarios.id}>
              <td>{usuarios.id}</td>
              <td>{usuarios.rut}</td>
              <td>{usuarios.nombre}</td>
              <td>{usuarios.telefono}</td>
              <td>{usuarios.casa}</td>
              <td>{usuarios.vehiculo}</td>
              <td>{usuarios.patente}</td>
              <td>{usuarios.gasto}</td>
              <td>{usuarios.tipo}</td>
              <td>
                <Button variant="success" onClick={() => alert(`Desea Editar a: ${usuarios.rut}\nNombre: ${usuarios.nombre}`)}>
                  Editar
                </Button>
                <br />
                <Button variant="danger" onClick={() => alert(`Se desactivará el Usuario: ${usuarios.rut}\nNombre: ${usuarios.nombre}`)}>
                  Desactivar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    </div>
    </>
  );
}

export default ListaUsuarios;
