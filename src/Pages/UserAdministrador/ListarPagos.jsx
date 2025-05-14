import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { usuarios } from '../../data/data';

import { Link } from 'react-router-dom';

import AdminNavbar from '../components/AdminNavbar'; // ajusta la ruta según tu estructura



function ListarPagos() {
  return (
    <>
      <AdminNavbar />
      <div className="container mt-5">
        <Container className="mt-5">
        <Link to="/Crearusuarios">
        <Button variant="primary">Crear Usuario</Button>
        </Link>
      
    


    <h2>Lista de Pagos</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Rut</th>
            <th>Nombre</th>
            <th>N° Casa</th>
            <th>Monto</th>
            <th>Estado</th>
            <th>Acciones</th>

        
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuarios => (
            <tr key={usuarios.id}>
              <td>{usuarios.id}</td>
              <td>{usuarios.rut}</td>
              <td>{usuarios.nombre}</td>
              <td>{usuarios.casa}</td>
              <td>{usuarios.estado}</td>
              <td>{usuarios.gasto}</td>
              <td>
                <Button variant="success" onClick={() => alert(`Desea Editar a: ${usuarios.rut}\nNombre: ${usuarios.nombre}`)}>
                  Pagar
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

export default ListarPagos;
