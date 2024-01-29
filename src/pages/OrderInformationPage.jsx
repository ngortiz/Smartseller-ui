import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './style.css'
const OrderInformationPage = () => {
  return (
    <Container>
      <Row>
        <h1>Visualización del Pedido</h1>
      </Row>
      <Row>
        <Col className='order-info-col'>
          <p>
            <strong>Nro.Pedido(interno):</strong> <label>11111111</label>
          </p>
          <p>
            <strong>Nro.Pedido(Pagopar):</strong> <label>11111111</label>
          </p>
          <p>
            <strong>Nro.Comprobante(Pagopar):</strong> <label>11111111</label>
          </p>
          <p>
            <strong>Estdo del Pedido:</strong> <label>antendido</label>
          </p>
          <p>
            <strong>Cliente:</strong> <label>Enrique Vera</label>
          </p>
          <p>
            <strong>Direccion:</strong>
            <label>Barrio Ka'avyrory 1508, Encarnacion, Paraguay</label>
          </p>
          <p>
            <strong>Telefono de Contacto:</strong> <label>111111111</label>
          </p>
          <p>
            <strong>RUC./CI.:</strong> <label>1111111</label>
          </p>
        </Col>
        <Col className='order-info-col'>
          <p>
            <strong>Fecha de Pedido:</strong> <label>12:10 2024 01 26</label>
          </p>
          <p>
            <strong>Fecha de Pago:</strong> <label>12:10 2024 01 26</label>
          </p>
          <p>
            <strong>Estado de Pago:</strong> <label>completado</label>
          </p>
          <p>
            <strong>Estado del Pedido:</strong>{' '}
            <label>completado(Tarjeta de Credito)</label>
          </p>
          <p>
            <strong>Total:</strong> <label>US$10.5</label>
          </p>
          <p>
            <strong>Total Pagado:</strong> <label>US$10.5</label>
          </p>
          <p>
            <strong>Total Deuda:</strong> <label>0.00US$</label>
          </p>
          <p>
            <strong>RUC./CI.:</strong> <label>1111111</label>
          </p>
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
          <p>Subtotales:</p>
          <p>Cupón de Descuento:</p>
          <p>Total a Pagar:</p>
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
