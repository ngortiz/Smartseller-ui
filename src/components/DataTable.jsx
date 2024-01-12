import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'
const DataTable = ({ orders }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Item</th>
          <th>Numero</th>
          <th>Cliente</th>
          <th>Estado del Pedido</th>
          <th>Estado del Pago</th>
          <th>Fecha de Creacion</th>
          <th>Fecha de Expiracion</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.Item}>
            <td>{order.Numero}</td>
            <td>{order.Cliente}</td>
            <td>{order.EstadoDePedido}</td>
            <td>{order.EstadoDePago}</td>
            <td>{order.FechaDeCreacion}</td>
            <td>{order.FechaDeExpiracion}</td>
            <td>{order.Total}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
DataTable.propTypes = {
  orders: PropTypes.array.isRequired
}

export default DataTable
