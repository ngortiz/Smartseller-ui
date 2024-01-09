import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OrderStatus from '../components/OrderStatus'
import './OrdersSummary.css'
import CustomDatePicker from '../components/CustomDatePicker'

const OrdersSummary = () => {
  const defaultDate = new Date()
  const [startDate, setStartDate] = useState(defaultDate)
  const [endDate, setEndDate] = useState(defaultDate)
  const handleStartDateChange = date => {
    setStartDate(date)
  }
  const handleEndDateChange = date => {
    setEndDate(date)
  }
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
      <div className='date-picker-container'>
        <h1 className='date-picker-label'> Inicio Fecha de Creacion: </h1>
        <CustomDatePicker
          selectedDate={startDate}
          handleChange={handleStartDateChange}
        />
        <div className='date-picker-container'>
          <h1 className='date-picker-label'> Fin Fecha de Creacion: </h1>
          <CustomDatePicker
            selectedDate={endDate}
            handleChange={handleEndDateChange}
          />
        </div>
      </div>
    </Container>
  )
}

export default OrdersSummary
