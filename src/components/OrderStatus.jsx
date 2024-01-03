import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './OrderStatus.css'

const OrderStatus = () => {
  return (
    <div className='order-status-container'>
      <Card className='order-status-card'>
        <Card.Body>
          <Card.Title>0</Card.Title>
          <Card.Text>Pedidos Recientes</Card.Text>
          <Button variant='primary'>Buscar</Button>
        </Card.Body>
      </Card>
      <Card className='order-status-card'>
        <Card.Body>
          <Card.Title>0</Card.Title>
          <Card.Text>No Atendidos</Card.Text>
          <Button variant='primary'>Buscar</Button>
        </Card.Body>
      </Card>
      <Card className='order-status-card'>
        <Card.Body>
          <Card.Title>0</Card.Title>
          <Card.Text>Preparando Pedidos</Card.Text>
          <Button variant='primary'>Buscar</Button>
        </Card.Body>
      </Card>
      <Card className='order-status-card'>
        <Card.Body>
          <Card.Title>0</Card.Title>
          <Card.Text>Pedidos Preparados</Card.Text>
          <Button variant='primary'>Buscar</Button>
        </Card.Body>
      </Card>
      <Card className='order-status-card'>
        <Card.Body>
          <Card.Title>0</Card.Title>
          <Card.Text>Enviando Pedidos</Card.Text>
          <Button variant='primary'>Buscar</Button>
        </Card.Body>
      </Card>
      <Card className='order-status-card'>
        <Card.Body>
          <Card.Title>0</Card.Title>
          <Card.Text>Retirar en Sucursal</Card.Text>
          <Button variant='primary'>Buscar</Button>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Card.Title>0</Card.Title>
          <Card.Text>Pedidos Atendidos</Card.Text>
          <Button variant='primary'>Buscar</Button>
        </Card.Body>
      </Card>
    </div>
  )
}
export default OrderStatus
