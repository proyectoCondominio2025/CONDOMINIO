import React from 'react';
import { Container, Navbar, Nav, Form, FormControl, NavDropdown, Row, Col, Card } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { Footer } from '../../components/footer';

export const ResidentsHomePageWithAnnouncements = () => {
  const noticias = [
    {
      titulo: "Gobierno anuncia nuevo plan de seguridad pública",
      categoria: "POLÍTICA",
      autor: "La Tercera",
      fecha: "26 abril 2025",
      resumen: "El gobierno presentó un paquete de medidas para reforzar la seguridad en las principales ciudades del país.",
      imagen: "https://www.subinterior.gob.cl/media/2025/04/DSC_3770.jpg"
    },
    {
      titulo: "Universidad de Chile gana clásico ante Colo-Colo",
      categoria: "DEPORTES",
      autor: "Emol Deportes",
      fecha: "25 abril 2025",
      resumen: "Con un gol en los minutos finales, la U se llevó el triunfo en el Estadio Monumental tras 23 años.",
      imagen: "https://static.emol.cl/emol50/Fotos/2024/03/10/file_20240310201401.jpg"
    },
    {
      titulo: "Precio del dólar baja a mínimos de seis meses",
      categoria: "ECONOMÍA",
      autor: "Diario Financiero",
      fecha: "25 abril 2025",
      resumen: "El tipo de cambio cerró en $850, su menor nivel desde octubre, impulsado por datos positivos de inflación.",
      imagen: "https://www.df.cl/noticias/site/artic/20250314/imag/foto_0000004220250314084652/dolar-2025.png"
    },
  ];
  

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#E9E9EC' }}>
      
      {/* Navbar principal */}
      <Navbar expand="lg" className="border-bottom py-0" style={{ backgroundColor: '#AFD3D1', minHeight: '80px' }}>
        <Container fluid className="h-100 px-0 d-flex align-items-center">

          {/* Logo y buscador */}
          <div className="d-flex align-items-center flex-grow-1">
            <Navbar.Brand className="p-0 m-0 d-flex align-items-center" style={{ height: '100%' }}>
              <a href="/" className="d-flex align-items-center" style={{ height: '100%' }}>
                <img
                  src="/src/Logo/IngresoSmart.png"
                  alt="Logo"
                  style={{
                    height: '100%',
                    width: '85px',
                    objectFit: 'contain',
                    display: 'block'
                  }}
                />
              </a>
            </Navbar.Brand>

            <div className="d-flex align-items-center w-100 ms-3">
              <Form style={{ width: '250px' }}>
                <FormControl
                  type="search"
                  placeholder="Buscar"
                  className="rounded-pill px-3 bg-white"
                  style={{
                    height: '38px',
                    fontSize: '0.9rem',
                    boxShadow: 'none'
                  }}
                />
              </Form>
            </div>
          </div>

          {/* Sección derecha */}
          <div className="d-flex align-items-center gap-4 ms-auto">
            <Nav.Link
              href="/login"
              className="text-dark fw-medium text-decoration-none border-bottom border-2 border-dark pb-1"
              style={{ borderRadius: 0 }}
            >
              Iniciar sesión
            </Nav.Link>

            <Nav.Link
              href="/profile"
              className="text-dark fw-medium d-flex align-items-center gap-2 text-decoration-none border-bottom border-2 border-dark pb-1"
              style={{ borderRadius: 0 }}
            >
              Perfil
              <FaUserCircle size={20} />
            </Nav.Link>
          </div>

        </Container>
      </Navbar>

      {/* Navbar secundaria */}
      <div className="d-flex justify-content-center my-3">
        <Nav className="gap-3">
          <Nav.Link href="/" className="text-dark fw-medium px-2">INICIO</Nav.Link>

          <NavDropdown
            title={<span className="text-dark">SELECCIONAR ANUNCIO</span>}
            id="nav-dropdown"
            className="fw-medium"
          >
            <NavDropdown.Item href="#seguridad">Seguridad</NavDropdown.Item>
            <NavDropdown.Item href="#mantenimiento">Mantenimiento</NavDropdown.Item>
            <NavDropdown.Item href="#eventos">Eventos</NavDropdown.Item>
          </NavDropdown>

          <Nav.Link href="/historialPago" className="text-dark fw-medium px-2">HISTORIAL DE PAGOS</Nav.Link>
          <Nav.Link href="/contacto" className="text-dark fw-medium px-2">CONTACTO</Nav.Link>
        </Nav>
      </div>

      {/* Contenido principal */}
      <Container fluid className="flex-grow-1 mb-5">
        <Row className="g-4">

          {/* Sección Podcast */}
          <Col md={3}>
            <div className="p-3 bg-white shadow-sm rounded h-100">
              <h5 className="fw-bold">🎙️ Podcast Farid Dieck</h5>
              <p className="small">FARID cuenta el MEJOR CONSEJO de AMOR que ha ESCUCHADO | Relato y Reflexiones</p>
              <video controls style={{ width: '100%', borderRadius: '8px' }}>
                <source src="https://example.com/video.mp4" type="video/mp4" />
                Tu navegador no soporta el video.
              </video>
              <small className="d-block mt-2">22:18 - Farid Dieck</small>
            </div>
          </Col>

          {/* Sección Noticias */}
          <Col md={9}>
            <Row className="g-4">
              {noticias.map((noticia, idx) => (
                <Col key={idx} md={6}>
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src="https://via.placeholder.com/300x150"
                      style={{ objectFit: 'cover', height: '150px' }}
                    />
                    <Card.Body>
                      <small className="text-uppercase text-muted">{noticia.categoria}</small>
                      <Card.Title className="mt-2">{noticia.titulo}</Card.Title>
                      <Card.Text className="small">{noticia.resumen}</Card.Text>
                      <div className="mt-3 text-muted small">
                        {noticia.autor} <br /> {noticia.fecha}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};
