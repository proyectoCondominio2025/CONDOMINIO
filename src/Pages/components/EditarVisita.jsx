import { Modal } from 'react-bootstrap';

const [showModal, setShowModal] = useState(false);
const [visitaSeleccionada, setVisitaSeleccionada] = useState(null);

// Dentro del return:
<Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Editar Visita</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {visitaSeleccionada && (
      <>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={visitaSeleccionada.nombre}
            onChange={(e) =>
              setVisitaSeleccionada({ ...visitaSeleccionada, nombre: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>RUT</Form.Label>
          <Form.Control
            type="text"
            value={visitaSeleccionada.rut}
            onChange={(e) =>
              setVisitaSeleccionada({ ...visitaSeleccionada, rut: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>N° Casa</Form.Label>
          <Form.Control
            type="text"
            value={visitaSeleccionada.casa}
            onChange={(e) =>
              setVisitaSeleccionada({ ...visitaSeleccionada, n_casa: e.target.value })
    }
          />
        </Form.Group>
        {/* Puedes añadir más campos si es necesario */}
      </>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Cancelar
    </Button>
    <Button
      variant="primary"
      onClick={async () => {
        try {
          await api.put(`/visitas/${visitaSeleccionada.id}/`, visitaSeleccionada);
          setVisitas((prev) =>
            prev.map((v) => (v.id === visitaSeleccionada.id ? visitaSeleccionada : v))
          );
          setShowModal(false);
        } catch (err) {
          console.error('Error actualizando visita:', err);
        }
      }}
    >
      Guardar Cambios
    </Button>
  </Modal.Footer>
</Modal>
