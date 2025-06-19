import React, { useEffect, useState } from 'react';
import api from '../../api/axios'; // Usa este si necesitas token
// import publicApi from '@/services/publicApi'; // Usa este si es pública
import Swal from 'sweetalert2';
import { Button, Modal } from 'react-bootstrap';
import { IoEyeSharp } from "react-icons/io5";

const FormulariosPage = () => {
    const [formularios, setFormularios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().split('T')[0]);

    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState({ id: '', nombre: '', correo_electronico: '', mensaje: '', fecha_envio: '' });



    const handleShow = (id, nombre, correo_electronico, mensaje, fecha_envio) => {
        setModalContent({ id, nombre, correo_electronico, mensaje, fecha_envio });
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const formatearFechaLocalYMD = (fechaStr) => {
        const f = new Date(fechaStr);
        const year = f.getFullYear();
        const month = String(f.getMonth() + 1).padStart(2, '0');
        const day = String(f.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const esMismaFecha = (fechaStr) => {
        return formatearFechaLocalYMD(fechaStr) === fechaSeleccionada;
    };


    const formulariosFiltrados = formularios.filter(form => esMismaFecha(form.fecha_envio));






    useEffect(() => {
        const obtenerFormularios = async () => {
            try {
                const res = await api.get('/formularios-contacto/');
                setFormularios(res.data);
            } catch (error) {
                console.error('Error al obtener formularios:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'No se pudieron cargar los formularios.',
                });
            } finally {
                setLoading(false);
            }
        };

        obtenerFormularios();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Formularios de Contacto</h2>

            <div className="mb-3">
                <label>Filtrar por fecha:</label>
                <input
                    type="date"
                    className="form-control"
                    value={fechaSeleccionada}
                    onChange={(e) => setFechaSeleccionada(e.target.value)}
                />
            </div>


            {loading ? (
                <p>Cargando...</p>
            ) : formularios.length === 0 ? (
                <p>No hay formularios enviados aún.</p>
            ) : (
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Mensaje</th>
                            <th>Fecha</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formulariosFiltrados.map((form) => (
                            <tr key={form.id}>
                                <td>{form.nombre}</td>
                                <td>{form.correo_electronico}</td>
                                <td>{form.mensaje}</td>
                                <td>{new Date(form.fecha_envio).toLocaleString()}</td>
                                <td><Button
                                    className="bg-transparent hover:bg-gray-100 text-black p-2 rounded shadow-none"
                                    onClick={() => handleShow(form.id, form.nombre, form.correo_electronico, form.mensaje, new Date(form.fecha_envio).toLocaleString())}
                                >
                                    <IoEyeSharp className="inline" /> Ver más
                                </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {/* Modal */}

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalContent.correo_electronico}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalContent.mensaje}
                </Modal.Body>
                <Modal.Body>
                    {modalContent.fecha_envio}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FormulariosPage;
