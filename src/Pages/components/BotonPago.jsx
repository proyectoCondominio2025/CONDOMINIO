// src/components/PaymentButton.jsx
import React, { useState } from "react";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from "../../api/axios";

initMercadoPago('APP_USR-504105d3-ed58-4c9a-8a0b-4e551ba3e770');

export default function PaymentButton({ product }) {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post("crear-preferencia/", {
        items: [
          {
            title: product.title,
            quantity: 1,
            unit_price: product.price,
            currency_id: "CLP",
          },
        ],
      });

      const data = response.data;
      console.log("Respuesta del backend:", data);

      setPreferenceId(data.preferenceId);
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
      alert(error.response?.data?.error || "Error al procesar el pago");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button variant="button" className="btn btn-success" disabled={loading} onClick={handlePayment}>
        {loading ? "Creando preferencia…" : "Pagar con Mercado Pago"}
      </button>

      {preferenceId && (
        <Wallet
          initialization={{ preferenceId }}          // ← aquí se abre Checkout Pro
          onError={(e) => console.error("Wallet error:", e)}
        />
      )}
    </>
  );
}
