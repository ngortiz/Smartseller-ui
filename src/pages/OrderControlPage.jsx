import React, { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './OrderControlPage.css'
import CustomDatePicker from '../components/CustomDatePicker'

const OrderControlPage = () => {
  const [orders] = useState([
    {
      id: 2,
      number: 'ORD-002',
      client: 'Camila Vera',
      state: 'Enviando',
      product_quantity: '6',
      payment_method: 'Sucursal',
      created_date: '08-02-2024 10:10',
      start_creation: '08-02-2024',
      end_creation: '08-02-2024'
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

  const orderColumns = [
    { title: 'No Atendidos', filterState: 'No Atendidos' },
    { title: 'Preparando', filterState: 'Preparando' },
    { title: 'Preparados', filterState: 'Preparados' },
    { title: 'Enviando', filterState: 'Enviando' },
    { title: 'Sucursal', filterState: 'Sucursal' },
    { title: 'Atendidos', filterState: 'Atendidos' }
  ]

  const getClassForState = state => {
    switch (state) {
      case 'No Atendidos':
        return 'estado-no-atendido'
      case 'Preparando':
        return 'estado-preparando'
      case 'Preparados':
        return 'estado-preparado'
      case 'Enviando':
        return 'estado-enviando'
      case 'Sucursal':
        return 'estado-sucursal'
      case 'Atendidos':
        return 'estado-atendido'
      default:
        return ''
    }
  }

  return (
    <div className='order-control-container'>
      <header className='order-control-header'>Control de Pedidos</header>
      <Row>
        <Col className='order-date-col'>
          <CustomDatePicker
            selectedDate={startDate}
            handleChange={handleStartDateChange}
          />
        </Col>
        <Col className='order-date-col'>
          <CustomDatePicker
            selectedDate={endDate}
            handleChange={handleEndDateChange}
          />
        </Col>
      </Row>
      <Row className='row-cols'>
        {orderColumns.map((column, index) => (
          <Col key={index} className='column-card'>
            <div className='column-with-card'>
              <h4 className='order-column-texto'>{column.title}</h4>
              {orders.map(order => {
                if (order.state === column.filterState) {
                  return (
                    <Card
                      key={order.id}
                      className={`order-card ${getClassForState(
                        column.filterState
                      )}`}
                    >
                      <Card.Body>
                        <Card.Title className='order-card-title'>
                          Detalle de compra
                        </Card.Title>
                        <Card.Text className='order-card-text'>
                          <span>Cliente: {order.client}</span>
                          <br />
                          <span>Cantidad Pedido: {order.product_quantity}</span>
                          <br />
                          <span>Pedido Numero: {order.number}</span>
                          <br />
                        </Card.Text>
                        <Link
                          to={`/orders/${order.id}`}
                          className='order-card-button'
                        >
                          Ver Detalles
                        </Link>
                      </Card.Body>
                    </Card>
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
