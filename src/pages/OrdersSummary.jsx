import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OrderStatus from '../components/OrderStatus'
import './OrdersSummary.css'
import CustomDatePicker from '../components/CustomDatePicker'
import DataTable from '../components/DataTable'

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
  const handleSearch = () => {
    console.log('Buscar...')
  }
  const orders = [
    {
      id: 1,
      number: 270,
      client: 'Maria Bogado',
      order_state: 'Preparando',
      payment_state: 'Procesado',
      payment_method: 'Tc',
      created_date: '12/01/2023 ',
      expiration_date: '13/01/2023 12:30:10',
      total: 'US$ 2,20',
    },
    {
      id: 2,
      number: 371,
      client: 'Valeria Gomez',
      order_state: 'Preparando',
      payment_state: 'Procesado',
      payment_method: 'Tc',
      fechaCreacion: '12/01/2023 ',
      expiration_date: '13/01/2023 12:30:10',
      total: 'US$ 5,30',
    },
    {
      id: 3,
      number: 372,
      client: 'Rafael Gomez',
      order_state: 'Preparando',
      payment_state: 'Atendido',
      payment_method: 'Sucursal',
      fechaCreacion: '15/01/2023 ',
      expiration_date: '16/01/2023 15:30:10',
      total: 'US$ 8,10',
    },
    {
      d: 4,
      number: 374,
      client: 'Roque levy',
      order_state: 'No atendido',
      payment_state: 'Pendiente',
      payment_method: 'Deposito',
      fechaCreacion: '11/01/2023 ',
      expiration_date: '12/01/2023 12:30:10',
      total: 'US$ 12,12',
    },
  ]

  return (
    <Container fluid>
      <Row className='title-container'>
        <Col>
          <h2 className='title'>Resumen de Pedidos</h2>
        </Col>
      </Row>
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

      <Row className='order-summary-container'></Row>
      <Row className='justify-content-between'>
        <Col>
          <div className='date-picker-container'>
            <h1 className='date-picker-label'>Inicio Fecha de Creación: </h1>
            <div className='input-group-addon'>
              <CustomDatePicker
                selectedDate={startDate}
                handleChange={handleStartDateChange}
              />
            </div>
          </div>
        </Col>
        <Col>
          <div className='date-picker-container'>
            <h1 className='date-picker-label'>Fin Fecha de Creación: </h1>
            <div className='input-group-addon'>
              <CustomDatePicker
                selectedDate={endDate}
                handleChange={handleEndDateChange}
              />
            </div>
          </div>
        </Col>
        <Col>
          <button className='search-button' onClick={handleSearch}>
            Buscar
          </button>
        </Col>
        <Col>
          <DataTable orders={orders} />
        </Col>
      </Row>
    </Container>
  )
}

export default OrdersSummary
