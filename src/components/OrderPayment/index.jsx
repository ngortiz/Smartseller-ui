import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

export const OrderPayment = ({ paymentState, total, totalPaid, totalDebt }) => {
  return (
    <div className='column-content'>
      <h2 className='title'>Pago</h2>
      <p>
        <strong>Estado de Pago:</strong>
        <label>{paymentState}</label>
      </p>
      <p>
        <strong>Total:</strong> <label>{total}</label>
      </p>
      <p>
        <strong>Total Pagado:</strong> <label>{totalPaid}</label>
      </p>
      <p>
        <strong>Total Deuda:</strong> <label>{totalDebt}</label>
      </p>
    </div>
  )
}

OrderPayment.propTypes = {
  paymentState: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  totalPaid: PropTypes.string.isRequired,
  totalDebt: PropTypes.string.isRequired
}

export default OrderPayment
