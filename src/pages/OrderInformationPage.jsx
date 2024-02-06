import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import './OrderInformationPage.css'
import OrderClientInformation from '../components/OrderClientInformation'
import OrderData from '../components/OrderData'
import OrderPayment from '../components/OrderPayment'

const OrderInformationPage = () => {
  return (
    <Container>
      <header>
        <h1 className='order-view'>Visualización del Pedido</h1>
      </header>
      <Row>
        {' '}
        <Col>
          <OrderClientInformation
            client='Enrique Vera'
            address="Barrio Ka'avyrory 1508, Encarnacion, Paraguay"
            phone='111111111'
            ruc='1111111'
            color='#ffA500'
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <OrderData
            number='11111111'
            comprobante='1111'
            state='atendido'
            date='12:10 2024 01 26'
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <OrderPayment
            payment_state='completado(T.Debito)'
            total='US$ 10.5'
            total_payment='US$ 10.5'
            total_debt='US$ 0.00'
          />
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
                  <td>US$10.00</td>
                  <td>US$8.00</td>
                  <td>US$0.00</td>
                  <td>US$1.00</td>
                  <td>US$0.50</td>
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
              <td className='td-2'>US$8.00</td>
            </tr>
            <tr>
              <td className='colspan-4'>Subtotales</td>
              <td className='td-2'>$8.00</td>
            </tr>
            <tr>
              <td className='colspan-4'>Cupon de Descuento</td>
              <td className='td-2'>Ninguno</td>
            </tr>
            <tr>
              <td className='colspan-4'>Total a Pagar</td>
              <td className='td-2'>$8.00</td>
            </tr>
          </tbody>
        </table>
      </Col>

      <Col>
        <div className='additional-details'>
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

      <Row className='mt-4'>
        <Col className='button-container'>
          <Button variant='primary'>
            <i className='bi bi-arrow-left-circle'></i> Volver atras
          </Button>
          <Button className='button-secondary'>
            <i className='bi bi-printer'></i> Imprimir
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default OrderInformationPage
