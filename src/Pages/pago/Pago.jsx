import PaymentButton from '../components/botonPago';


function PagoPage() {
  const producto = { title: "Producto de prueba", price: 100 };

  return (
    <>
    <PaymentButton product={producto}/>
    </>
  )
}

export default PagoPage