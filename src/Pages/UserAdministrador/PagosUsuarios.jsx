import { Link } from 'react-router-dom';
import api from '../../api/axios';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

function PagosUsuarios() {
    const [pagos, setPagos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    console.log("id", id)
    // const formatoCLP = (numero) => {
    //     if (isNaN(numero)) return 'N/A';
    //     return new Intl.NumberFormat('es-CL', {
    //         style: 'currency',
    //         currency: 'CLP',
    //         minimumFractionDigits: 0,
    //     }).format(numero);
    // };

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await api.get(`/pagos/residente/${id}/detalle/`);
                setPagos(response.data);
                // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setError("No se pudieron cargar los usuarios.");
            } finally {
                setLoading(false);
            }
        };
        fetchUsuarios();
    }, []);

    const capitalizeFirstLetter = (str) => {
        if (typeof str !== 'string' || str.length === 0) return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const formatoFecha = (fechaISO) => {
        const [anio, mes, dia] = fechaISO.split('-');
        return `${dia}-${mes}-${anio}`;
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-emerald-500 border-solid"></div>
        </div>
    );
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <>
            <div className="min-h-screen w-full bg-[#a6ecec] py-10 px-2">
                <div className="w-full max-w-[1400px] mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-center text-gray-800 drop-shadow mb-8">
                        Pagos de {capitalizeFirstLetter(pagos.nombre)} {capitalizeFirstLetter(pagos.apellido)}
                    </h2>
                    <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
                        <table className="min-w-full text-base">
                            <thead>
                                <tr className="bg-indigo-100 text-black">
                                    <th className="px-4 py-3 text-left font-semibold">ID</th>
                                    <th className="px-4 py-3 text-left font-semibold">Periodo</th>
                                    <th className="px-4 py-3 text-left font-semibold">Descripción</th>
                                    <th className="px-4 py-3 text-left font-semibold">Monto</th>
                                    <th className="px-4 py-3 text-left font-semibold">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagos.pagos.map(pago => (
                                    <tr key={pago.id} className="border-b last:border-b-0 hover:bg-indigo-50 transition">
                                        <td className="px-4 py-3">{pago.id}</td>
                                        <td className="px-4 py-3">{formatoFecha(pago.periodo)}</td>
                                        <td className="px-4 py-3">{pago.descripcion}</td>
                                        <td className="px-4 py-3">
                                            {new Intl.NumberFormat("es-CL", {
                                                style: "currency",
                                                currency: "CLP",
                                                minimumFractionDigits: 0,
                                            }).format(pago.monto)}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={
                                                    pago.estado === "pagado"
                                                        ? "inline-block px-4 py-1 text-sm rounded-full bg-emerald-100 text-emerald-700 font-bold shadow-md border border-emerald-200 ring-1 ring-emerald-100/50 transition-all duration-150"
                                                        : "inline-block px-4 py-1 text-sm rounded-full bg-rose-100 text-rose-700 font-bold shadow-md border border-rose-200 ring-1 ring-rose-100/50 transition-all duration-150"
                                                }
                                                style={{ letterSpacing: "0.05em" }}
                                            >
                                                {pago.estado}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {pagos.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-8 text-center text-gray-400 text-lg">
                                            No hay pagos registrados.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PagosUsuarios;
