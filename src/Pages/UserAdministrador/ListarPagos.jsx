import React from 'react';
import { usuarios } from '../../data/data';
import { Link } from 'react-router-dom';

function ListarPagos() {
  return (
    <>
      <div className="min-h-screen w-full bg-[#a6ecec] py-10 px-2">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center text-gray-800 drop-shadow mb-8">
            Lista de Pagos
          </h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
            <table className="min-w-full text-base">
              <thead>
                <tr className="bg-indigo-100 text-black">
                  <th className="px-4 py-3 text-left font-semibold">ID</th>
                  <th className="px-4 py-3 text-left font-semibold">Rut</th>
                  <th className="px-4 py-3 text-left font-semibold">Nombre</th>
                  <th className="px-4 py-3 text-left font-semibold">N° Casa</th>
                  <th className="px-4 py-3 text-left font-semibold">Monto</th>
                  <th className="px-4 py-3 text-left font-semibold">Estado</th>
                  <th className="px-4 py-3 text-center font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(usuario => (
                  <tr key={usuario.id} className="border-b last:border-b-0 hover:bg-indigo-50 transition">
                    <td className="px-4 py-3">{usuario.id}</td>
                    <td className="px-4 py-3">{usuario.rut}</td>
                    <td className="px-4 py-3 font-semibold">{usuario.nombre}</td>
                    <td className="px-4 py-3">{usuario.casa}</td>
                    <td className="px-4 py-3">{usuario.gasto}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          usuario.estado === "Pagado"
                            ? "inline-block px-4 py-1 text-sm rounded-full bg-emerald-100 text-emerald-700 font-bold shadow-md border border-emerald-200 ring-1 ring-emerald-100/50 transition-all duration-150"
                            : "inline-block px-4 py-1 text-sm rounded-full bg-rose-100 text-rose-700 font-bold shadow-md border border-rose-200 ring-1 ring-rose-100/50 transition-all duration-150"
                        }
                        style={{ letterSpacing: "0.05em" }}
                      >
                        {usuario.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => alert(`Desea Editar a: ${usuario.rut}\nNombre: ${usuario.nombre}`)}
                        className="px-4 py-2 bg-violet-600 text-white rounded-xl font-semibold shadow hover:bg-violet-700 transition"
                      >
                        Pagar
                      </button>
                    </td>
                  </tr>
                ))}
                {usuarios.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400 text-lg">
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

export default ListarPagos;
