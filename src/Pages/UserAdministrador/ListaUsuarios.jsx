import React, { useEffect, useState } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function ListaUsuarios() {

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get('ver-usuarios/');
        setUsuarios(response.data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los usuarios.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const formatoCLP = (numero) => {
    if (isNaN(numero)) {
      return 'N/A';
    }

    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0, // CLP normalmente no usa decimales
    }).format(numero);
  };

  function editarUsuario(data) {
    console.log(data)
  };

  function desactivarUsuario(usuario) {
  Swal.fire({
    title: `¿Desactivar a ${usuario.nombre}?`,
    text: "Esta acción no se puede deshacer.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, desactivar',
    cancelButtonText: 'Cancelar'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {

        await api.delete(`usuarios/${usuario.id}/`);
        Swal.fire(
          'Eliminado',
          `El usuario ${usuario.nombre} ha sido eliminado.`,
          'success'
        );

        setUsuarios(prev => prev.filter(u => u.id !== usuario.id));

      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'No se pudo desactivar el usuario.', 'error');
      }
    }
  });
}

  if (loading) return (
    <div class="d-flex justify-content-center">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return <p className="text-danger">{error}</p>;

  return (
    <>
      <div className="container mt-5">
        <Container className="mt-5">
          <div className='mb-3'>
            <Link to="/admin/crear-usuarios">
              <Button variant="primary">
                <i class="bi bi-person-plus me-2"></i>
                Crear Usuario
              </Button>
            </Link>
          </div>


          <h2>Lista de Usuarios</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Rut</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Telefono</th>
                <th>N° Casa</th>
                <th>Patente</th>
                <th>Gastos Comunes</th>
                <th>Tipo</th>
                <th>Acciones</th>


              </tr>
            </thead>
            <tbody>
              {usuarios.map(usuario => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.rut}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.telefono}</td>
                  <td>{usuario.numero_casa ? usuario.numero_casa : "N/A"}</td>
                  <td>{usuario.vehiculo_placa ? usuario.vehiculo_placa : "Sin vehiculo"}</td>
                  <td>{formatoCLP(usuario.gastos_comunes) ? formatoCLP(usuario.gastos_comunes) : "N/A"}</td>
                  <td>{usuario.tipo_de_usuario}</td>
                  <td>
                    <div className='d-flex'>
                      <Button className='me-2' variant="success" onClick={() => editarUsuario(usuario)}>
                        <i class="bi bi-pencil me-2"></i>
                        Editar
                      </Button>
                      <Button variant="danger" onClick={() => desactivarUsuario(usuario)}>
                        <i class="bi bi-trash3 me-2"></i>
                        Eliminar
                      </Button>
                    </div>
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
