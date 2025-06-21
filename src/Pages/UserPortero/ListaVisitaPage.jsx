import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';


function ListaVisita() {
    const [visitas, setVisitas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().split('T')[0]);
    const [filtroRut, setFiltroRut] = useState(null);
    const [filtroPatente, setFiltroPatente] = useState(null);


    const navigate = useNavigate();

    // 🔄 Obtener visitas
    useEffect(() => {
        setLoading(true);
        api
            .get('/visitas/listar')
            .then((res) => setVisitas(res.data))
            .catch(() => setError('No se pudieron cargar las visitas'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center mt-10">
                <span className="h-6 w-6 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
            </div>
        );
    }

    if (error) {
        return <p className="text-center text-red-600 mt-6">{error}</p>;
    }


    const formatearFechaLocalYMD = (fechaStr) => {
        const f = new Date(fechaStr);
        const year = f.getFullYear();
        const month = String(f.getMonth() + 1).padStart(2, '0');
        const day = String(f.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    // const esMismaFecha = (fechaStr) => {
    //     return formatearFechaLocalYMD(fechaStr) === fechaSeleccionada;
    // };

    const opcionesRut = [
        ...new Map(visitas.map(v => [v.rut, {
            value: v.rut,
            label: `${v.nombre} ${v.apellido} - ${v.rut}`
        }])).values()
    ];

    const opcionesPatente = [
        ...new Map(visitas.flatMap(v =>
            (v.vehiculos || []).map(auto => [auto.placa, {
                value: auto.placa,
                label: auto.placa
            }])
        )).values()
    ];



    const visitasFiltradas = visitas.filter((v) => {
        const coincideFecha = fechaSeleccionada
            ? formatearFechaLocalYMD(v.fecha_hora) === fechaSeleccionada
            : true;

        const coincideRut = filtroRut ? v.residente.rut === filtroRut : true;

        const coincidePatente = filtroPatente
            ? v.vehiculos?.some((veh) => veh.placa === filtroPatente)
            : true;

        return coincideFecha && coincideRut && coincidePatente;
    });



    return (
        <div className="min-h-screen w-full" style={{ background: "#a6ecec" }}>
            <div className="max-w-6xl mx-auto px-4 pt-10">
                <div className="flex items-center justify-center mb-4">
                    <h2 className="text-2xl font-bold">Lista de Visitas</h2>
                </div>

                <button
                    onClick={() => navigate('/portero/ingreso-visita')}
                    className="mb-5 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow mb-4"
                >
                    <FaPlus /> Agregar Visita
                </button>

                <Row className='d-flex align-items-end mt-5 mb-3'>
                    <Col md={3}>
                        <div className="mb-3">
                            <label>Filtrar por fecha:</label>
                            <input
                                type="date"
                                className="form-control"
                                value={fechaSeleccionada}
                                onChange={(e) => setFechaSeleccionada(e.target.value)}
                            />
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="mb-3">
                            <label>Filtrar por RUT del residente:</label>
                            <Select
                                options={opcionesRut}
                                isClearable
                                placeholder="Seleccionar RUT..."
                                onChange={(selected) => setFiltroRut(selected ? selected.value : null)}
                            />
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="mb-3">
                            <label>Filtrar por patente del vehículo:</label>
                            <Select
                                options={opcionesPatente}
                                isClearable
                                placeholder="Seleccionar patente..."
                                onChange={(selected) => setFiltroPatente(selected ? selected.value : null)}
                            />
                        </div>
                    </Col>
                    <Col md={3}>
                        <button
                            className="btn btn-outline-dark mb-3"
                            onClick={() => {
                                setFechaSeleccionada('');
                                setFiltroRut(null);
                                setFiltroPatente(null);
                            }}
                        >
                            Limpiar filtros
                        </button>
                    </Col>
                </Row>



                <div className="w-full overflow-x-auto bg-white shadow rounded-lg">
                    <table className="min-w-full text-sm">
                        <thead className="bg-indigo-100 text-gray-700">
                            <tr>
                                <th className="py-3 px-4 text-left">ID</th>
                                <th className="py-3 px-4 text-left">Fecha / Hora</th>
                                <th className="py-3 px-4 text-left">Visitante</th>
                                <th className="py-3 px-4 text-left">RUT</th>
                                <th className="py-3 px-4 text-left">Residente / Casa</th>
                                <th className="py-3 px-4 text-left">Teléfono Residente</th>
                                <th className="py-3 px-4 text-left">¿Vehículo?</th>
                                <th className="py-3 px-4 text-left">Patente</th>
                                <th className="py-3 px-4 text-left">Estacionado</th>
                                {/* <th className="py-3 px-4 text-center">Acciones</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {visitas.length ? (
                                visitasFiltradas.map((v) => {
                                    const tieneAuto = v.vehiculos && v.vehiculos.length > 0;
                                    const vehiculo = tieneAuto ? v.vehiculos[0] : null;
                                    return (
                                        <tr key={v.id} className="border-t hover:bg-indigo-50">
                                            <td className="py-3 px-4">{v.id}</td>
                                            <td className="py-3 px-4">
                                                {new Date(v.fecha_hora).toLocaleString('es-CL', {
                                                    dateStyle: 'short',
                                                    timeStyle: 'short'
                                                })}
                                            </td>
                                            <td className="py-3 px-4 capitalize">{v.nombre}</td>
                                            <td className="py-3 px-4">{v.rut}</td>
                                            <td className="py-3 px-4">
                                                {v.residente.nombre} {v.residente.apellido} – Casa {v.residente.numero_casa}
                                            </td>
                                            <td className="py-3 px-4">{v.residente.telefono}</td>
                                            <td className="py-3 px-4">{tieneAuto ? 'Sí' : 'No'}</td>
                                            <td className="py-3 px-4">{vehiculo?.placa || '—'}</td>
                                            <td className="py-3 px-4">
                                                {vehiculo ? (
                                                    vehiculo.estado ? (
                                                        <span className="px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700 font-semibold">
                                                            Activo
                                                        </span>
                                                    ) : (
                                                        <span className="px-3 py-1 rounded-full text-xs bg-rose-100 text-rose-700 font-semibold">
                                                            Inactivo
                                                        </span>
                                                    )
                                                ) : (
                                                    '—'
                                                )}
                                            </td>
                                            {/* <td className="py-3 px-4 flex justify-center gap-2">
                                            <button
                                                onClick={() => editarVisita(v)}
                                                className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs shadow"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => eliminarVisita(v.id)}
                                                className="px-3 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white text-xs shadow"
                                            >
                                                Eliminar
                                            </button>
                                        </td> */}
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={10} className="py-8 px-4 text-center text-gray-400">
                                        No se encontraron visitas registradas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}

export default ListaVisita;
