import React from 'react';

export const ResidentsHomePageWithAnnouncements = () => {
  return (
    <div className="container py-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold">Bienvenido(a), Nombre del residente</h2>
        <p className="text-muted">Aquí encontrarás tus anuncios importantes y próximos eventos.</p>
      </div>

      {/* Card principal */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Anuncio destacado</h5>
          <p className="card-text">
            Estimado residente, recuerde que el próximo lunes 30 se realizará el mantenimiento del
            ascensor entre las 10:00 y las 14:00 hrs.
          </p>
        </div>
      </div>

      {/* Lista de anuncios */}
      <div className="row">
        {[1, 2, 3].map((i) => (
          <div className="col-md-4 mb-3" key={i}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h6 className="card-subtitle mb-2 text-primary">Título anuncio {i}</h6>
                <p className="card-text mb-4">Contenido del anuncio breve para el residente {i}.</p>
                <span className="mt-auto text-muted small">Publicado: 20 abril 2025</span>
              </div>
            </div>
          </div>
        ))}
      </div>
  </div>
);
};