import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './style.css'
const OrderInformationPage = () => {
  return (
    <Container>
      <Row>
        <Col className='order-info-col'>
          <h1>Visualizacion del Pedido</h1>
          <p>Nro.Pedido(interno): #1</p>
          <p>Nro.Pedido(Pagopar): 11111111</p>
          <p>Nro.Comprobante(Pagopar):1111</p>
          <p>Estdo del Pedido: antendido</p>
          <p>Cliente: Enrique Vera</p>
          <p>Direccion: Barrio Ka'avyrory 1508,Encarnacion,Paraguay</p>
          <p>Telefono de Contacto:111111111</p>
          <p>RUC./CI.: 1111111</p>
        </Col>
        <Col className='order-info-col'>
          <p>Fecha de Pedido: 12:10 2024 01 26 </p>
          <p>Fecha de Pago: 12:10 2024 01 26</p>
          <p>Estado de Pago:1111</p>
          <p>Estdo del Pedido: completado(Tarjeta de Credito)</p>
          <p>Total: US$10.5</p>
          <p>Total Pagado: US$10.5</p>
          <p>Total Deuda: 0.00US$ </p>
          <p>RUC./CI.: 1111111</p>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className='comprobante'>
            <table>
              <thead>
                <tr>
                  <th>Cantidad</th>
                  <th>Cod. Interno</th>
                  <th>Producto</th>
                  <th>Precio Unitario</th>
                  <th>Precio Oferta</th>
                  <th>Exenta</th>
                  <th>IVA 10%</th>
                  <th>IVA 5%</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>001</td>
                  <td>Producto </td>
                  <td>$10.00</td>
                  <td>$8.00</td>
                  <td>$0.00</td>
                  <td>$1.00</td>
                  <td>$0.50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
      </Row>

      <Col>
        <div className='detalles-adicionales'>
          <p>Costo de Envío: </p>
          <p>Subtotales</p>
          <p>Cupón de Descuento</p>
          <p>Total a Pagar</p>
        </div>
      </Col>

      <Row>
        <Col>
          <div className='detalles-adicionales'>
            <table>
              <thead>
                <tr>
                  <th>Liquidacion Del IVA(5%): US$ 0.00</th>
                  <th>Liquidacion Del IVA(10%): US$ 0.00</th>
                  <th>Total Del IVA: US$ 0.00</th>
                </tr>
              </thead>
            </table>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default OrderInformationPage
