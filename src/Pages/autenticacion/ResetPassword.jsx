import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import publicApi from '../../api/publicApi';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function RestablecerContrasenaPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const uid = searchParams.get('uid');
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirm) {
            return Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Las contraseñas no coinciden.',
                confirmButtonColor: '#d33'
            });
        }

        try {
            await publicApi.post('/auth/password/reset/confirm/', {
                uid,
                token,
                new_password: password
            });

            Swal.fire({
                icon: 'success',
                title: 'Contraseña actualizada',
                text: 'Ahora puedes iniciar sesión con tu nueva contraseña.',
                confirmButtonColor: '#3085d6'
            }).then(() => navigate('/login'));
        } catch (error) {
            let mensajes = [];

            const data = error.response?.data || {};

            // Unifica errores desde distintos campos
            const erroresCrudos = [
                ...(data.new_password || []),
                ...(data.non_field_errors || []),
                ...(data.detail ? [data.detail] : [])
            ];

            // Traduce errores conocidos al español
            mensajes = erroresCrudos.map(msg => {
                if (msg.includes('too short')) {
                    return 'La contraseña es demasiado corta. Usa al menos 8 caracteres.';
                } else if (msg.includes('entirely numeric')) {
                    return 'La contraseña no puede ser solo números.';
                } else if (msg.includes('too common')) {
                    return 'La contraseña es demasiado común. Elige una más segura.';
                } else if (msg.includes('mismatch')) {
                    return 'El token no coincide o ha expirado. Solicita un nuevo enlace.';
                }
                return msg; // fallback en inglés si no se reconoce
            });

            // Mostrar con SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar',
                html: mensajes.map(m => `<p>${m}</p>`).join(''),
                confirmButtonColor: '#d33'
            });
        }
    }

    return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h3 className="text-center mb-4">Restablecer Contraseña</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>Nueva contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirmar contraseña"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Actualizar contraseña
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}