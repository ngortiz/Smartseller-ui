import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OrderStatus from '../components/OrderStatus'
import './OrdersSummary.css'

const OrdersSummary = () => {
  return (
    <Container fluid>
      <Row className='title-container'>
        <Col>
          <h2 className='title'>Resumen de Pedidos</h2>
        </Col>
      </Row>
      <Row className='order-summary-container'></Row>
      <Row>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          {' '}
          <OrderStatus status='Recientes' amount={4} color='#00c0ef' />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          <OrderStatus status='No Atendidos' amount={4} color='#f56954' />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          <OrderStatus status='Preparando' amount={3} color='#00a65a' />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          <OrderStatus status='Preparados' amount={1} color='#0073b7' />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          <OrderStatus status='Enviando' amount={3} color='#ff851b' />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          <OrderStatus status='Sucursal' amount={3} color='#f39c12' />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          <OrderStatus status='Atendidos' amount={1} color='#222222' />
        </Col>
      </Row>
    </Container>
  )
}

export default OrdersSummary
