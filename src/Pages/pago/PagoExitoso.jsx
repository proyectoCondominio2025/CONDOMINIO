
import { useLocation } from "react-router-dom";

export default function PagoExitoPage() {
  const query = new URLSearchParams(useLocation().search);
  const paymentId = query.get("payment_id");
  const status = query.get("status");

  return (
    <div>
      <h1>¡Pago exitoso!</h1>
      <p>ID de pago: {paymentId}</p>
      <p>Estado: {status}</p>
      <a href="/">Volver al inicio</a>
    </div>
  );
}