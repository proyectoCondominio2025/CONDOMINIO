import React, { useEffect, useState } from 'react';
import api from '../../api/axios'; // Usa este si necesitas token
// import publicApi from '@/services/publicApi'; // Usa este si es pública
import Swal from 'sweetalert2';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import { IoEyeSharp } from "react-icons/io5";

const FormulariosPage = () => {
    const [formularios, setFormularios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(() => {
        const ahora = new Date();
        const fechaChile = new Date(ahora.toLocaleString("en-US", {timeZone: "America/Santiago"}));
        const year = fechaChile.getFullYear();
        const month = String(fechaChile.getMonth() + 1).padStart(2, '0');
        const day = String(fechaChile.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    });

    const [show, setShow] = useState(false);
    const [modalContent, setModalContent] = useState({ id: '', nombre: '', correo_electronico: '', mensaje: '', fecha_envio: '' });



    const handleShow = (id, nombre, correo_electronico, mensaje, fecha_envio) => {
        setModalContent({ id, nombre, correo_electronico, mensaje, fecha_envio });
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const formatearFechaLocalYMD = (fechaStr) => {
        const f = new Date(fechaStr);
        // Convertir a zona horaria de Chile (UTC-3)
        const fechaChile = new Date(f.toLocaleString("en-US", {timeZone: "America/Santiago"}));
        const year = fechaChile.getFullYear();
        const month = String(fechaChile.getMonth() + 1).padStart(2, '0');
        const day = String(fechaChile.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const esMismaFecha = (fechaStr) => {
        return formatearFechaLocalYMD(fechaStr) === fechaSeleccionada;
    };


    const formulariosFiltrados = fechaSeleccionada
        ? formularios.filter(form => esMismaFecha(form.fecha_envio))
        : formularios;






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
        <div className="min-h-screen w-full bg-[#a6ecec] py-10 px-2">
            <div className="w-full max-w-[1400px] mx-auto px-4">

                <h2>Formularios de Contacto</h2>
                <Row className='mb-2'>
                    <Col lg={3} md={3} sm={12} >
                        <div className="mb-3 ">
                            <label>Filtrar por fecha:</label>
                            <input
                                type="date"
                                className="form-control"
                                value={fechaSeleccionada}
                                onChange={(e) => setFechaSeleccionada(e.target.value)}
                            />
                        </div>
                    </Col>
                </Row>




                {loading ? (
                    <p>Cargando...</p>
                ) : formularios.length === 0 ? (
                    <p>No hay formularios enviados aún.</p>
                ) : (
                    <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
                        <table className="min-w-full text-sm text-left text-gray-700">
                            <thead className="text-xs text-gray-700 uppercase bg-blue-100 text-center">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">Nombre</th>
                                    <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">Correo</th>
                                    <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">Mensaje</th>
                                    <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">Fecha</th>
                                    <th className="px-4 py-3 text-left text-xs font-extrabold font-[Inter] text-black uppercase tracking-wider">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formulariosFiltrados.map((form) => (
                                    <tr key={form.id} className="bg-white border-b hover:bg-gray-100 transition text-center">
                                        <td className="px-6 py-4 font-medium">{form.nombre}</td>
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
                    </div>
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
        </div>
    );
};

export default FormulariosPage;
