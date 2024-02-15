import React, { useState } from 'react'
import { Col, Row, Button } from 'react-bootstrap'

import './OrderBoardPage.css'
import CustomDatePicker from '../components/CustomDatePicker'
import OrderCard from '../components/OrderCard'

const OrderBoardPage = () => {
  const [orders] = useState([
    {
      id: 1,
      number: 'ORD-002',
      client: 'Lisa Vera',
      state: 'issued',
      productQuantity: '6',
      paymentMethod: 'Sucursal',
      createdDate: '08-02-2024 10:10',
      total: 'US$ 10.5',
      endCreation: '08-02-2024'
    },
    {
      id: 2,
      number: 'ORD-003',
      client: 'Juan Pérez',
      state: 'preparing',
      productQuantity: '3',
      paymentMethod: 'Deposito',
      createdDate: '08-02-2024 11:20',
      total: 'US$ 15.25',
      endCreation: '08-02-2024'
    },
    {
      id: 3,
      number: 'ORD-004',
      client: 'Paula V',
      state: 'delivering',
      productQuantity: '3',
      paymentMethod: 'TC',
      createdDate: '08-02-2024 11:20',
      total: 'US$ 8.25',
      endCreation: '09-02-2024'
    },
    {
      id: 4,
      number: 'ORD-005',
      client: 'Enrique v',
      state: 'dispatched',
      productQuantity: '3',
      paymentMethod: 'T.C',
      createdDate: '10-02-2024 11:20',
      total: 'US$ 10.25',
      endCreation: '10-02-2024'
    }
  ])

  const defaultDate = new Date()
  const [startDate, setStartDate] = useState(defaultDate)
  const [endDate, setEndDate] = useState(defaultDate)

  const handleStartDateChange = date => {
    setStartDate(date)
  }

  const handleEndDateChange = date => {
    setEndDate(date)
  }
  const handleSearch = () => {}

  const orderColumns = [
    { title: 'No Atendidos', filterState: 'issued' },
    { title: 'Preparando', filterState: 'preparing' },
    { title: 'Preparados', filterState: 'prepared' },
    { title: 'Enviando', filterState: 'delivering' },
    { title: 'Sucursal', filterState: 'ready_to_pickup' },
    { title: 'Atendidos', filterState: 'dispatched' }
  ]

  const getClassForState = state => {
    switch (state) {
      case 'issued':
        return 'state-issued'
      case 'preparing':
        return 'state-preparing'
      case 'prepared':
        return 'state-prepared'
      case 'delivering':
        return 'state-delivering'
      case 'ready_to_pickup':
        return 'state-ready_to_pickup'
      case 'dispatched':
        return 'state-dispatched'
      default:
        return ''
    }
  }

  return (
    <div className='order-control-container'>
      <header className='order-control-header'>Control de Pedidos</header>
      <Row className='row-cols'>
        <Col className='order-date-col'>
          <h1 className='order-label'>Inicio Fecha de Creación: </h1>
          <CustomDatePicker
            selectedDate={startDate}
            handleChange={handleStartDateChange}
          />
          <h1 className='order-label'>Fin Fecha de Creación: </h1>
          <CustomDatePicker
            selectedDate={endDate}
            handleChange={handleEndDateChange}
          />
        </Col>
        <Col>
          <Button
            variant='primary'
            className='order-button'
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </Col>
      </Row>
      <Row className='row-cols'>
        {orderColumns.map((column, index) => (
          <Col key={index} md={2} className='column-card'>
            <div className='column-with-card'>
              <h4 className='order-column-text'>{column.title}</h4>
              {orders.map(order => {
                if (order.state === column.filterState) {
                  return (
                    <OrderCard
                      key={order.id}
                      order={order}
                      getClassForState={getClassForState}
                      column={column}
                    />
                  )
                } else {
                  return null
                }
              })}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default OrderBoardPage
