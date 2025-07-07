import { Form, Button, Container, Row, Col, Tab, Tabs } from 'react-bootstrap';
import CrearUsuarioResidente from './CrearUsuarioResidente';
import CrearUsuarioPortero from './CrearUsuarioPortero';


const CrearUsuarioForm = () => {


  return (
    <>
      <Container className="mt-4">
        <h2>Crear Usuario</h2>

        <Tabs
          defaultActiveKey="residente"
          id="tabUsuarios"
          className="mb-3"
        >
          <Tab eventKey="residente" title="Residente">
            <CrearUsuarioResidente />
          </Tab>
          <Tab eventKey="portero" title="Portero">
            <CrearUsuarioPortero />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default CrearUsuarioForm;