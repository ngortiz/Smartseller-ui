import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'react-bootstrap'

export const OrderData = ({ number, comprobante, state, date }) => {
  return (
    <div className='column-content'>
      <Col className='order-info-col'>
        <h2 className='title'>Pedido</h2>

        <p>
          <strong>Nro.Pedido:</strong> <label>{number}</label>
        </p>
        <p>
          <strong>Nro.Comprobante(Pagopar):</strong>{' '}
          <label>{comprobante}</label>
        </p>
        <p>
          <strong>Estado del Pedido:</strong> <label>{state}</label>
        </p>
        <p>
          <strong>Fecha de Pedido:</strong> <label>{date}</label>
        </p>
      </Col>
    </div>
  )
}

OrderData.propTypes = {
  number: PropTypes.string.isRequired,
  comprobante: PropTypes.string.isRequired,
  stat: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
}

export default OrderData
