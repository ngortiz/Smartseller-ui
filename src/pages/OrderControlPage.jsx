import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap' // Asegúrate de importar Table desde react-bootstrap si lo estás usando

const OrderControlPage = () => {
  const orders = [
    { id: 1, number: 'ORD-001', client: 'Cliente 1', state: 'Atendido' },
    { id: 2, number: 'ORD-002', client: 'Cliente 2', state: 'Preparando' }
  ]

  return (
    <div>
      <h1>Control de Pedidos</h1>
      <Table striped bordered hover className='Table'>
        <thead>
          <tr>
            <th>Item</th>
            <th>Número</th>
            <th>Cliente</th>
            <th>Estado Pedido</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/orders/${order.id}`}>{order.number}</Link>
              </td>
              <td>{order.client}</td>
              <td>{order.state}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default OrderControlPage
