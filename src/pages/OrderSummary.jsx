import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OrderStatus from '../components/OrderStatus'

const OrderSummary = () => {
  return (
    <Container>
      <Row>
        <Col>
          <OrderStatus statusName='Recientes' amount='4' color='blue' />
        </Col>
        <Col>
          <OrderStatus statusName='No Atendido' amount='4' color='blue' />
        </Col>
        <Col>
          <OrderStatus statusName='Preparando' amount='3' color='green' />
        </Col>
        <Col>
          <OrderStatus
            statusName='Preparado'
            amount='1'
            color='otros colores'
          />
        </Col>
        <Col>
          <OrderStatus statusName='Enviando' amount='3' color='etc' />
        </Col>
        <Col>
          <OrderStatus statusName='Sucursal' amount='3' color='etc' />
        </Col>
        <Col>
          <OrderStatus statusName='Atendido' amount='8' color='etx' />
        </Col>
      </Row>
    </Container>
  )
}

export default OrderSummary
