import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { noticias } from '../data/data';

export const NoticiaPage = () => {
  // Asumiremos que la primera noticia es la principal
  const noticiaPrincipal = noticias[0];
  const noticiasSecundarias = noticias.slice(1);

  return (
    <div className="container py-4">
      <Row className="g-4">

        {/* Columna Podcast */}
        <Col md={3}>
          <div className="p-3 bg-white shadow-sm rounded d-flex flex-column h-100">
            <h6 className="fw-bold mb-3 text-center">🎙️ Podcast Farid Dieck</h6>
            <p className="small text-muted text-center mb-3">
              FARID cuenta el MEJOR CONSEJO de AMOR que ha ESCUCHADO | Relato y Reflexiones
            </p>
            <audio controls className="w-100 mb-3">
              <source src="https://example.com/audio.mp3" type="audio/mp3" />
              Tu navegador no soporta el elemento de audio.
            </audio>
            <small className="text-muted d-block text-center">22:18 - Farid Dieck</small>
          </div>
        </Col>

        {/* Columna Noticia Principal */}
        <Col md={6}>
          <Card className="h-100 border-0 shadow-sm">
            <div style={{ overflow: 'hidden', height: '300px', borderTopLeftRadius: '0.375rem', borderTopRightRadius: '0.375rem' }}>
              <Card.Img
                src={noticiaPrincipal.imagen || 'https://via.placeholder.com/600x400'}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
            <Card.Body>
              <small className="text-muted text-uppercase">{noticiaPrincipal.categoria || 'Noticias'}</small>
              <h4 className="fw-bold">{noticiaPrincipal.titulo}</h4>
              <p className="text-muted small">
                {noticiaPrincipal.resumen || noticiaPrincipal.descripcion}
              </p>
              <small className="text-muted">{noticiaPrincipal.autor || 'Autor desconocido'} - {noticiaPrincipal.fecha || 'Fecha desconocida'}</small>
            </Card.Body>
          </Card>
        </Col>

        {/* Columna Noticias Secundarias */}
        <Col md={3}>
          <div className="d-flex flex-column gap-4">
            {noticiasSecundarias.map((noticia) => (
              <Card key={noticia.id} className="border-0 shadow-sm">
                <div style={{ overflow: 'hidden', height: '120px', borderTopLeftRadius: '0.375rem', borderTopRightRadius: '0.375rem' }}>
                  <Card.Img
                    src={noticia.imagen || 'https://via.placeholder.com/300x200'}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <Card.Body className="px-0">
                  <small className="text-muted text-uppercase">{noticia.categoria || 'Noticias'}</small>
                  <h6 className="fw-bold">{noticia.titulo}</h6>
                  <small className="text-muted">{noticia.autor || 'Autor desconocido'} - {noticia.fecha || 'Fecha desconocida'}</small>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>

      </Row>
    </div>
  );
};

export default NoticiaPage;