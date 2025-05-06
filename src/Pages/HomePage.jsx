import React from 'react';
import { Button, Navbar, Nav, NavDropdown, Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { noticias } from '../data/data';


function Home() {

 

  return (
    <>
      {/*  */}

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
    </>
  );
}

export default Home;
