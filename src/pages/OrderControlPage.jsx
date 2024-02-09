import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './OrderControlPage.css'

const OrderControlPage = () => {
  const orders = [
    {
      id: 1,
      number: 'ORD-001',
      client: 'Cliente 1',
      state: 'Atendido',
      product_quantity: '1',
      payment_method: 'Deposito',
      created_date: '08-02-2024 10:10'
    },
    {
      id: 2,
      number: 'ORD-002',
      client: 'Camila Vera',
      state: 'No Atendidos',
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

  return (
    <div>
      <header>Control de Pedidos</header>
      <Row>
        {orderColumns.map((column, index) => (
          <Col key={index} md={1} className='mb-4'>
            <div className='col-title-container'>
              <h2 className='col-title'>{column.title}</h2>
            </div>
            {orders.map(order => {
              if (order.state === column.filterState) {
                return (
                  <Card key={order.id} className='mb-3'>
                    <Card.Body className='card-body'>
                      <Card.Title className='title-card'>
                        Detalle de compra
                      </Card.Title>
                      <Card.Text className='Text-card'>
                        <span className='client-name'>Cliente:</span>
                        <br /> {order.client}
                        <br />
                        <span className='quantity'>Cant. Pedido:</span>
                        <br /> {order.product_quantity}
                        <br />
                        <span className='order-number'>Pedido Numero:</span>
                        <br /> {order.number}
                      </Card.Text>
                      <Link
                        to={`/orders/${order.id}`}
                        className='btn btn-primary'
                      >
                        Ver Detalles
                      </Link>
                    </Card.Body>
                  </Card>
                )
              }
              return null
            })}
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default OrderControlPage
