import React, { useState } from 'react'
import { Col, Row, Button } from 'react-bootstrap'

import './OrderControlPage.css'
import CustomDatePicker from '../components/CustomDatePicker'
import OrderCard from '../components/OrderCard'

const OrderControlPage = () => {
  const [orders] = useState([
    {
      id: 1,
      number: 'ORD-002',
      client: 'Lisa Vera',
      state: 'NO ATENDIDOS',
      product_quantity: '6',
      payment_method: 'Sucursal',
      created_date: '08-02-2024 10:10',
      total: 'US$ 10.5',
      end_creation: '08-02-2024'
    },
    {
      id: 2,
      number: 'ORD-003',
      client: 'Juan Pérez',
      state: 'PREPARANDO',
      product_quantity: '3',
      payment_method: 'Deposito',
      created_date: '08-02-2024 11:20',
      total: 'US$ 15.25',
      end_creation: '08-02-2024'
    },
    {
      id: 3,
      number: 'ORD-004',
      client: 'Paula V',
      state: 'ENVIANDO',
      product_quantity: '3',
      payment_method: 'TC',
      created_date: '08-02-2024 11:20',
      total: 'US$ 8.25',
      end_creation: '09-02-2024'
    },
    {
      id: 4,
      number: 'ORD-005',
      client: 'Enrique v',
      state: 'ATENDIDOS',
      product_quantity: '3',
      payment_method: 'T.C',
      created_date: '10-02-2024 11:20',
      total: 'US$ 10.25',
      end_creation: '10-02-2024'
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
    { title: 'NO ATENDIDOS', filterState: 'NO ATENDIDOS' },
    { title: 'PREPARANDO', filterState: 'PREPARANDO' },
    { title: 'PREPARADOS', filterState: 'PREPARADOS' },
    { title: 'ENVIANDO', filterState: 'ENVIANDO' },
    { title: 'SUCURSAL', filterState: 'SUCURSAL' },
    { title: 'ATENDIDOS', filterState: 'ATENDIDOS' }
  ]

  const getClassForState = state => {
    switch (state) {
      case 'NO ATENDIDOS':
        return 'estado-NO-atendido'
      case 'PREPARANDO':
        return 'estado-PREPARANDO'
      case 'PREPARADOS':
        return 'estado-preparado'
      case 'ENVIANDO':
        return 'estado-ENVIANDO'
      case 'SUCURSAL':
        return 'estado-SUCURSAL'
      case 'ATENDIDOS':
        return 'estado-atendido'
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
              <h4 className='order-column-texto'>{column.title}</h4>
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
                }
                return null
              })}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default OrderControlPage
