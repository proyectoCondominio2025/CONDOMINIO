import React from 'react';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';

// Este sería tu "JSON" local con las noticias
const noticias = [
  {
    id: 1,
    titulo: "Reunión mensual de vecinos",
    descripcion: "Se realizará este viernes a las 19:00 hrs en el salón comunitario.",
    imagen: "https://via.placeholder.com/300x200?text=Noticia+1"
  },
  {
    id: 2,
    titulo: "Corte de agua programado",
    descripcion: "El servicio se suspenderá el lunes entre las 08:00 y 13:00 hrs.",
    imagen: "https://via.placeholder.com/300x200?text=Noticia+2"
  },
  {
    id: 3,
    titulo: "Nuevo sistema de acceso mmm",
    descripcion: "Se instalarán nuevas cámaras y lector de tarjetas esta semana.",
    imagen: "https://via.placeholder.com/300x200?text=Noticia+3"
  }
];

function NoticiaPage() {
  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Últimas Noticias</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {noticias.map((id) => (
          <Col key={id}>
            <Card>
              <Card.Img variant="top" src={`https://via.placeholder.com/300x200?text=Noticia+${id}`} />
              <Card.Body>
                <Card.Title>{id.titulo}</Card.Title>
                <Card.Text>
                  {id.descripcion}.
                </Card.Text>
                <Button variant="primary">Leer más</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default NoticiaPage;