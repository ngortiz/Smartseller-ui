import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import './OrderInformationPage.css'

const orangeButtonStyle = {
  backgroundColor: '#ffA500',
  borderColor: '#755316'
}
const OrderInformationPage = () => {
  return (
    <Container>
      <h1 className='visualizacion-pedido'>Visualización del Pedido</h1>
      <Row>
        <Col className='order-info-col'>
          <div className='column-content'>
            <h2>Cliente</h2>
            <p>
              <strong>Cliente:</strong> Enrique Vera
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
          </div>
        </Col>
        <Col className='order-info-col'>
          <div className='column-content'>
            <h2>Pedido</h2>

            <p>
              <strong>Nro.Pedido:</strong> <label>11111111</label>
            </p>
            <p>
              <strong>Nro.Comprobante(Pagopar):</strong> <label>1111</label>
            </p>
            <p>
              <strong>Estdo del Pedido:</strong> <label>antendido</label>
            </p>
            <p>
              <strong>Fecha de Pedido:</strong> <label>12:10 2024 01 26</label>{' '}
            </p>
          </div>
        </Col>
        <Col className='order-info-col'>
          <div className='column-content'>
            <h2>Pago</h2>
            <p>
              <strong>Estado de Pago:</strong>{' '}
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
          </div>
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
        <table className='table'>
          <tbody>
            <tr>
              <td className='colspan-4'>Costo de Envio</td>
              <td className='td-2'>$8.00</td>
            </tr>
            <tr>
              <td className='colspan-4'>Subtotales</td>
              <td className='td-2'>$8.00</td>
            </tr>
            <tr>
              <td className='colspan-4'>Cupon de Descuento</td>
              <td className='td-2'>No tiene</td>
            </tr>
            <tr>
              <td className='colspan-4'>Total a Pagar</td>
              <td className='td-2'>$8.00</td>
            </tr>
          </tbody>
        </table>
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
      <Row className='mt-4'>
        <Col className='button-container'>
          <Button variant='primary'>
            <i className='bi bi-arrow-left-circle'></i> Volver atras
          </Button>
          <Button variant='secondary' style={orangeButtonStyle}>
            <i className='bi bi-printer'></i> Imprimir
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default OrderInformationPage
