import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { noticias, usuarios } from '../../data/data';
import AdminNavbar from '../components/AdminNavbar';

import { Link } from 'react-router-dom';




function ListaNoticias() {
  return (
    <>
    <div className="container mt-5">
      <Container className="mt-5">
        <Link to="/admin/crear-noticias">
          <Button variant="primary">Crear Noticia</Button>
        </Link>
      </Container>        

    <Container className="mt-5">
      <h2>Lista Noticias</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>Descripción</th>
            <th>Aciones</th>
    

        
          </tr>
        </thead>
        <tbody>
          {noticias.map(noticias => (
            <tr key={noticias.id}>
              <td>{noticias.id}</td>
              <td>{noticias.titulo}</td>
              <td>{noticias.descripcion}</td>
       
              <td>
              <Button variant="success" onClick={() => alert(`Se desactivará el Usuario: ${usuarios.rut}\nNombre: ${usuarios.nombre}`)}>
                  Editar
                </Button>
          
       
              <Button variant="danger" onClick={() => alert(`Se desactivará el Usuario: ${usuarios.rut}\nNombre: ${usuarios.nombre}`)}>
                  Eliminar
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

export default ListaNoticias;
