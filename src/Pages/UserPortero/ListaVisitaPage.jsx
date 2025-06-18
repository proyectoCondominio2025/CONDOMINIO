
import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios'; // cuando implemente API, descomenta

function ListaVisita() {
    const [visitas, setVisitas] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Esto quedará así cuando implemente API:
    useEffect(() => {
        setLoading(true);
        api.get('/visitas/')
            .then((response) => {
                setVisitas(response.data);
            })
            .catch((err) => {
                console.error(err);
                setError('No se pudieron cargar las visitas');
            })
            .finally(() => setLoading(false));
    }, []);

    const eliminarVisita = async (id) => {
        try {
            await api.delete(`/visitas/${id}/`);
            setVisitas((prev) => prev.filter((visita) => visita.id !== id));
        } catch (err) {
            console.error('Error eliminando visita:', err);
        }
    };

    const editarVisita = (visita) => {
        setVisitaSeleccionada(visita);
        setShowModal(true);
    };

    const agregarVisita = () => {
        navigate('/portero/ingreso-visita'); // redirigir a ingreso
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <p className="text-danger text-center mt-4">{error}</p>;
    }

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
                    {visitas.length > 0 ? (
                        visitas.map((visita) => (
                            <tr key={visita.id}>
                                <td>{visita.id}</td>
                                <td>{visita.nombre}</td>
                                <td>{visita.rut}</td>
                                <td>{visita.casa}</td>
                                <td>{visita.tieneAuto ? 'Sí' : 'No'}</td>
                                <td>{visita.patente}</td>
                                <td>{visita.estado}</td>
                                <td>
                                    <Button
                                        variant="success"
                                        className="me-2"
                                        onClick={() => editarVisita(visita)}>
                                        Editar
                                    </Button>

                                    <Button variant="danger" onClick={() => eliminarVisita(visita.id)}>
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center text-muted">
                                No se encontró ninguna visita.
                            </td>
                        </tr>
                    )}

                </tbody>
            </Table>
        </Container>
    );
}

export default ListaVisita;
