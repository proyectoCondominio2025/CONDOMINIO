import React, { useEffect, useState } from 'react';
import api from '../../api/axios'; // ajusta ruta según estructura
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

// Yasna
// djsdhjsh

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function HomeAdmin() {
  const [dataBI, setDataBI] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('dashboard/');
        setDataBI(response.data);
      } catch (error) {
        console.error('Error cargando datos de BI:', error);
      }
    };
    fetchData();
  }, []);

  const chartDataVisitas = {
    labels: dataBI?.visitas_ultimos_7_dias.map(item => item.day) || [],
    datasets: [
      {
        label: 'Visitas por día',
        data: dataBI?.visitas_ultimos_7_dias.map(item => item.total) || [],
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderRadius: 6,
      },
    ],
  };

  // Datos para gráfico pagos por mes
  const chartDataPagos = {
    labels: dataBI?.pagos_por_mes?.map(item => item.mes) || [],
    datasets: [
      {
        label: 'Pagos aprobados por mes',
        data: dataBI?.pagos_por_mes?.map(item => item.monto_total) || [],
        backgroundColor: 'rgba(16, 185, 129, 0.7)', // verde
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="min-h-screen w-full bg-[#a6ecec] py-10 px-2">
      <div className="w-full max-w-[1400px] mx-auto px-4 space-y-8">
        <h1 className="text-3xl font-bold text-indigo-800 drop-shadow mb-6 text-center">
          Panel de Administración
        </h1>

        {!dataBI ? (
          <div className="text-center text-lg text-gray-600">Cargando datos...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white shadow rounded-2xl p-6 text-center">
                <h2 className="text-lg font-semibold text-indigo-700 mb-2">Residentes que pagaron</h2>
                <p className="text-4xl font-bold text-indigo-600">
                  {dataBI.resumen_pagos.total_residentes_que_pagaron}
                </p>
              </div>

              <div className="bg-white shadow rounded-2xl p-6 text-center">
                <h2 className="text-lg font-semibold text-indigo-700 mb-2">Total Pagado</h2>
                <p className="text-4xl font-bold text-indigo-600">
                  ${dataBI.resumen_pagos.suma_pagos_aprobados.toFixed(0)}
                </p>
                <h2 className="text-lg font-semibold text-indigo-700 mb-2">Fondos del condomiio</h2>
              </div>

              <div className="bg-white shadow rounded-2xl p-6 text-center">
                <h2 className="text-lg font-semibold text-indigo-700 mb-2">Total Pendiente</h2>
                <p className="text-4xl font-bold text-indigo-600">
                  ${dataBI.resumen_pagos.suma_pagos_pendientes.toFixed(0)}
                </p>
                <h2 className="text-lg font-semibold text-indigo-700 mb-2">Gastos comunes</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white shadow rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-indigo-700 mb-4">Gráfico de visitas (últimos 7 días)</h2>
                <Bar data={chartDataVisitas} />
              </div>

              <div className="bg-white shadow rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-indigo-700 mb-4">Pagos aprobados por mes (últimos 6 meses)</h2>
                <Bar data={chartDataPagos} />
              </div>
            </div>

            <div className="bg-white shadow rounded-2xl p-6 mt-8">
              <h2 className="text-lg font-semibold text-indigo-700 mb-3">Últimas Visitas Registradas</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-1">
                {dataBI.ultimas_visitas.map((v, i) => (
                  <li key={i}>
                    <span className="font-medium">{v.nombre}</span> — {new Date(v.fecha_ingreso).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomeAdmin;
