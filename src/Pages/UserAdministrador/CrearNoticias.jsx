import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import api from "../../api/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function CrearNoticia() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    titulo: Yup.string().max(30, "Máximo 30 caracteres").required("El título es obligatorio"),
    contenido: Yup.string().max(1000, "Máximo 1000 caracteres").required("El contenido es obligatorio"),
  });

  const initialValues = {
    titulo: "",
    contenido: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        const noticia = {
          ...values,
          fecha_ex: new Date().toISOString().split("T")[0],
        };
        try {
          await api.post("anuncios/", noticia);
          Swal.fire({
            icon: "success",
            title: "¡Noticia creada!",
            timer: 2000,
            showConfirmButton: false,
          });
          resetForm();
          navigate("/admin/listar-noticias");
        } catch {
          Swal.fire({
            icon: "error",
            title: "Error al crear noticia",
          });
        }
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
        isSubmitting,
      }) => (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-100 to-white flex items-center justify-center px-4" style={{ background: "#a6ecec" }}>
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6 drop-shadow">Crear Noticia</h2>
            <form noValidate onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="titulo" className="block text-sm font-semibold text-gray-700 mb-1">
                  Título
                </label>
                <input
                  id="titulo"
                  name="titulo"
                  type="text"
                  value={values.titulo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoFocus
                  className={`block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition
                    ${touched.titulo && errors.titulo ? "border-red-400" : "border-gray-300"}
                  `}
                  placeholder="Escribe el título"
                />
                {touched.titulo && errors.titulo && (
                  <span className="text-sm text-red-500 mt-1 block">{errors.titulo}</span>
                )}
              </div>
              <div>
                <label htmlFor="contenido" className="block text-sm font-semibold text-gray-700 mb-1">
                  Contenido
                </label>
                <textarea
                  id="contenido"
                  name="contenido"
                  rows={6}
                  value={values.contenido}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 transition resize-y
                    ${touched.contenido && errors.contenido ? "border-red-400" : "border-gray-300"}
                  `}
                  placeholder="Escribe el contenido de la noticia..."
                />
                {touched.contenido && errors.contenido && (
                  <span className="text-sm text-red-500 mt-1 block">{errors.contenido}</span>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white text-lg font-semibold py-2 rounded-xl shadow-md hover:bg-indigo-700 transition-all focus:ring-4 focus:ring-indigo-300"
              >
                <FaPlus className="mb-0.5" />
                Crear Noticia
              </button>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
}
