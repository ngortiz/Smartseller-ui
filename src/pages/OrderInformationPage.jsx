import React, { Component } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import './OrderInformationPage.css'
import OrderClientInformation from '../components/OrderClientInformation'
import OrderData from '../components/OrderData'
import OrderPayment from '../components/OrderPayment'
import OrderDetails from '../components/OrderDetails'

const OrderInformationPage = () => {
  const orderItems = [
    {
      quantity: 1,
      internalCode: '001',
      productName: 'Producto 1',
      unitPrice: 10.0,
      offerPrice: 8.0,
      exempt: 0.0,
      iva10: 1.0,
      iva5: 0.5
    }
  ]

  const shippingCost = 8.0
  const subtotal = 8.0
  const discountCoupon = 'Ninguno'
  const totalAmount = 8.0
  const liquidationIVA5 = 0.0
  const liquidationIVA10 = 0.0
  const totalIVA = 0.0

  return (
    <Container>
      <header>
        <h1 className='order-view'>Visualización del Pedido</h1>
      </header>
      <Row className='justify-content-center'>
        <Col>
          <OrderClientInformation
            client='Enrique Vera'
            address='Encarnacion, Paraguay'
            phone='111111111'
            ruc='1111111'
            color='#ffA500'
          />
        </Col>
        <Col>
          <OrderData
            number='11111111'
            voucher='1111'
            state='atendido'
            date='12:10 2024 01 26'
          />
        </Col>

        <Col>
          <OrderPayment
            payment_state='completado(T.Debito)'
            total='US$ 10.5'
            total_payment='US$ 10.5'
            total_debt='US$ 0.00'
          />
        </Col>
      </Row>

      <Row className='justify-content-center'>
        <Col>
          <OrderDetails
            orderItems={orderItems}
            shippingCost={shippingCost}
            subtotal={subtotal}
            discountCoupon={discountCoupon}
            totalAmount={totalAmount}
            liquidationIVA5={liquidationIVA5}
            liquidationIVA10={liquidationIVA10}
            totalIVA={totalIVA}
          />
        </Col>
      </Row>

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
