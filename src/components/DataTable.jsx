import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Table, Form } from 'react-bootstrap'
import './DataTable.css'

const DataTable = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredOrders = orders.filter(order => {
    return (
      order.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.numero.toString().includes(searchTerm)
    )
  })

  return (
    <div>
      <Form.Group controlId='searchForm'>
        <Form.Control
          type='text'
          placeholder='Buscar por Cliente o Número'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      <Table striped bordered hover className='Table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Numero</th>
            <th>Cliente</th>
            <th>Estado Pedido</th>
            <th>Estado Pago</th>
            <th>Forma Pago</th>
            <th>Fecha Creacion</th>
            <th>Fecha Expiracion</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
          {filteredOrders.map((order,item)=> (
            <tr key={order.id}>
            <td>{item}</td>
            <td>{order.number}</td>
            <td>{order.client}</td>
            <td>{order.state}</td>
            <td>{order.payment_state}</td>
            <td>{order.payment_method}</td>
            <td>{order.created_date}</td>
            <td>{order.expiration_date}</td>
            <td>{order.total}</td>

            </tr>
           ))}
          ) : (
            <tr>
              <td colSpan='9'>No se encontraron resultados.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

DataTable.propTypes = {
  orders: PropTypes.array.isRequired
}

export default DataTable
