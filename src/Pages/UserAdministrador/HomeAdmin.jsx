import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import './Dashboard.css';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

// Yasna
// djsdhjsh

ChartJS.register(
  BarElement, 
  CategoryScale, 
  LinearScale, 
  PointElement,
  LineElement,
  ArcElement,
  Tooltip, 
  Legend,
  Title
);

function HomeAdmin() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    resumenGeneral: null,
    estadisticasPagos: null,
    estadisticasVisitas: null
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [
          resumenGeneral,
          estadisticasPagos,
          estadisticasVisitas
        ] = await Promise.all([
          api.get('dashboard/resumen-general/'),
          api.get('dashboard/estadisticas-pagos/'),
          api.get('dashboard/estadisticas-visitas/')
        ]);

        setDashboardData({
          resumenGeneral: resumenGeneral.data,
          estadisticasPagos: estadisticasPagos.data,
          estadisticasVisitas: estadisticasVisitas.data
        });
      } catch (err) {
        console.error('Error cargando datos del dashboard:', err);
        setError('Error al cargar los datos del dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Configuración de gráficos
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  // Gráfico de pagos por mes
  const pagosPorMesData = {
    labels: dashboardData.estadisticasPagos?.pagos_por_mes?.map(item => item.mes) || [],
    datasets: [
      {
        label: 'Monto Total',
        data: dashboardData.estadisticasPagos?.pagos_por_mes?.map(item => item.monto_total) || [],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  };

  // Gráfico de visitas por día
  const visitasPorDiaData = {
    labels: dashboardData.estadisticasVisitas?.visitas_por_dia?.map(item => item.fecha) || [],
    datasets: [
      {
        label: 'Visitas',
        data: dashboardData.estadisticasVisitas?.visitas_por_dia?.map(item => item.total_visitas) || [],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
        tension: 0.4,
      }
    ]
  };

  // Gráfico de distribución de pagos
  const distribucionPagosData = {
    labels: ['Aprobados', 'Pendientes', 'Rechazados'],
    datasets: [
      {
        data: [
          dashboardData.resumenGeneral?.estadisticas_pagos?.pagos_aprobados || 0,
          dashboardData.resumenGeneral?.estadisticas_pagos?.pagos_pendientes || 0,
          dashboardData.resumenGeneral?.estadisticas_pagos?.pagos_rechazados || 0
        ],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-indigo-700 font-medium">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-lg text-red-700 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: '#b2f0e6',
        borderRadius: '2rem',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
      }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            Panel de Administración
          </h1>
          <p className="text-emerald-950 text-lg">
            Gestión integral del condominio
          </p>
        </div>

        {/* Tarjetas de resumen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="rounded-2xl shadow-lg p-8 min-h-[130px] flex items-center border-l-4 border-teal-400 hover:shadow-xl transition-shadow dashboard-card hover-lift card-modern" style={{ backgroundColor: '#e6fcf5' }}>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Total Residentes</p>
              <p className="text-3xl font-bold text-teal-600">
                {dashboardData.resumenGeneral?.resumen_general?.total_residentes || 0}
              </p>
            </div>
            <div className="flex items-center justify-center ml-4">
              <span className="text-teal-500 text-4xl" style={{ minWidth: '2.5rem' }}>👥</span>
            </div>
          </div>

          <div className="rounded-2xl shadow-lg p-8 min-h-[130px] flex items-center border-l-4 border-green-400 hover:shadow-xl transition-shadow dashboard-card hover-lift card-modern" style={{ backgroundColor: '#e6fcf5' }}>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Total Gastos Comunes Pagados</p>
              <p className="text-3xl font-bold text-green-600">
                ${dashboardData.resumenGeneral?.estadisticas_pagos?.monto_total_aprobado?.toLocaleString() || 0}
              </p>
            </div>
            <div className="flex items-center justify-center ml-4">
              <span className="text-green-500 text-4xl" style={{ minWidth: '2.5rem' }}>💰</span>
            </div>
          </div>

          <div className="rounded-2xl shadow-lg p-8 min-h-[130px] flex items-center border-l-4 border-yellow-400 hover:shadow-xl transition-shadow dashboard-card hover-lift card-modern" style={{ backgroundColor: '#e6fcf5' }}>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Total Gastos Comunes Pendientes</p>
              <p className="text-3xl font-bold text-yellow-600">
                ${dashboardData.resumenGeneral?.estadisticas_pagos?.monto_total_pendiente?.toLocaleString() || 0}
              </p>
            </div>
            <div className="flex items-center justify-center ml-4">
              <span className="text-yellow-500 text-4xl" style={{ minWidth: '2.5rem' }}>⏳</span>
            </div>
          </div>

          <div className="rounded-2xl shadow-lg p-8 min-h-[130px] flex items-center border-l-4 border-cyan-400 hover:shadow-xl transition-shadow dashboard-card hover-lift card-modern" style={{ backgroundColor: '#e6fcf5' }}>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Total Visitas</p>
              <p className="text-3xl font-bold text-cyan-700">
                {dashboardData.resumenGeneral?.resumen_general?.total_visitas || 0}
              </p>
            </div>
            <div className="flex items-center justify-center ml-4">
              <span className="text-cyan-500 text-4xl" style={{ minWidth: '2.5rem' }}>🚶</span>
            </div>
          </div>
        </div>

        {/* Gráficos principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="rounded-2xl shadow-lg p-6" style={{ backgroundColor: '#e6fcf5' }}>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Pagos por Mes</h3>
            <div className="h-80">
              <Bar data={pagosPorMesData} options={chartOptions} />
            </div>
          </div>

          <div className="rounded-2xl shadow-lg p-6" style={{ backgroundColor: '#e6fcf5' }}>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Visitas por Día</h3>
            <div className="h-80">
              <Line data={visitasPorDiaData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Gráfico de distribución y estadísticas adicionales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="rounded-2xl shadow-lg p-6" style={{ backgroundColor: '#e6fcf5' }}>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Distribución de Pagos</h3>
            <div className="h-64">
              <Doughnut data={distribucionPagosData} options={chartOptions} />
            </div>
          </div>

          <div className="rounded-2xl shadow-lg p-6" style={{ backgroundColor: '#e6fcf5' }}>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Estadísticas Generales</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Porteros</span>
                <span className="font-semibold text-teal-600">
                  {dashboardData.resumenGeneral?.resumen_general?.total_porteros || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Anuncios</span>
                <span className="font-semibold text-green-600">
                  {dashboardData.resumenGeneral?.resumen_general?.total_anuncios || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Formularios</span>
                <span className="font-semibold text-cyan-700">
                  {dashboardData.resumenGeneral?.resumen_general?.total_formularios_contacto || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Vehículos Residentes</span>
                <span className="font-semibold text-teal-600">
                  {dashboardData.resumenGeneral?.estadisticas_vehiculos?.total_vehiculos_residentes || 0}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl shadow-lg p-6" style={{ backgroundColor: '#e6fcf5' }}>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Residentes con Pagos Pendientes</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {(dashboardData.estadisticasPagos?.residentes_pendientes?.length > 0) ? (
                dashboardData.estadisticasPagos.residentes_pendientes.slice(0, 5).map((residente, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">
                        {residente.residente__nombre} {residente.residente__apellido}
                      </p>
                      <p className="text-sm text-gray-600">Casa {residente.residente__numero_casa}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-yellow-600">
                        ${residente.monto_pendiente?.toLocaleString() || 0}
                      </p>
                      <p className="text-sm text-gray-500">{residente.pagos_pendientes} pagos</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-32 text-green-600">
                  <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg font-semibold">¡Todos los residentes están al día con sus pagos!</span>
                </div>
              )}
            </div>
          </div>
        </div>

                 {/* Sección de visitas recientes */}
         <div className="rounded-2xl shadow-lg p-6" style={{ backgroundColor: '#e6fcf5' }}>
           <h3 className="text-xl font-semibold text-gray-800 mb-4">Residentes Más Visitados</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {dashboardData.estadisticasVisitas?.residentes_mas_visitados?.slice(0, 6).map((residente, index) => (
               <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                 <div className="flex items-center space-x-3">
                   <div className="w-10 h-10 bg-teal-400 rounded-full flex items-center justify-center text-white font-semibold">
                     {index + 1}
                   </div>
                   <div>
                     <p className="font-medium text-gray-800">
                       {residente.residente__nombre} {residente.residente__apellido}
                     </p>
                     <p className="text-sm text-gray-600">Casa {residente.residente__numero_casa}</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="font-bold text-teal-600">{residente.total_visitas}</p>
                   <p className="text-xs text-gray-500">visitas</p>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </div>
     </div>
   );
 }

export default HomeAdmin;
