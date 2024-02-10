import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './OrderControlPage.css'

const OrderControlPage = () => {
  const orders = [
    {
      id: 2,
      number: 'ORD-002',
      client: 'Camila Vera',
      state: 'Preparando',
      product_quantity: '6',
      payment_method: 'Sucursal',
      created_date: '08-02-2024 10:10'
    }
  ]

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
        {orderColumns.map((column, index) => (
          <Col key={index} md={4} className='order-column-title '>
            <Card
              className={`order-card ${getClassForState(column.filterState)}`}
            >
              <Card.Header className='order-column-title '>
                {column.title}
              </Card.Header>
              <Card.Body>
                {orders.map(order => {
                  if (order.state === column.filterState) {
                    return (
                      <div key={order.id} className='mb-3'>
                        <Card.Title className='order-card-title'>
                          Detalle de compra
                        </Card.Title>
                        <Card.Text className='order-card-text'>
                          <span className='order-control-span'>Cliente</span>
                          <span className='separator'>:</span>
                          {order.client}
                          <br />
                          <span className='order-control-span'>
                            Cant. Pedido
                          </span>
                          <span className='separator'>:</span>
                          {order.product_quantity}
                          <br />
                          <span className='order-control-span'>
                            Pedido Numero
                          </span>
                          <span className='separator'>:</span>
                          {order.number}
                        </Card.Text>
                        <Link
                          to={`/orders/${order.id}`}
                          className='order-card-button'
                        >
                          Ver Detalles
                        </Link>
                      </div>
                    )
                  }
                  return null
                })}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default OrderControlPage
