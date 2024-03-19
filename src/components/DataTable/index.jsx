import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Table, Form } from 'react-bootstrap'
import moment from 'moment'
import './style.css'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const DataTable = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const { t } = useTranslation()

  const filteredOrders = orders.filter(order => {
    return (
      order.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.number.toString().includes(searchTerm)
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
            <th>Item</th>
            <th>Número</th>
            <th>Cliente</th>
            <th>Estado Pedido</th>
            <th>Estado Pago</th>
            <th>Forma Pago</th>
            <th>Fecha Creación</th>
            <th>Fecha Expiración</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, item) => (
            <tr key={order.id}>
              <td>{item + 1}</td>
              <td>
                <Link to={`/orders/${order.id}`}>{order.number}</Link>
              </td>
              <td>{order.username}</td>
              <td>{t(`orderStatus.${order.orderState}`)}</td>
              <td>{t(`paymentStatus.${order.paymentState}`)}</td>
              <td>{t(`buyMethods.${order.buyMethod}`)}</td>
              <td>{moment(order.createdAt).format('DD-MM-YYYY HH:mm')}</td>

              <td>{moment(order.updatedAt).format('DD-MM-YYYY HH:mm')}</td>

              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

DataTable.propTypes = {
  orders: PropTypes.array.isRequired
}

export default DataTable
