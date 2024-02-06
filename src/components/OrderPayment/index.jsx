import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

export const OrderPayment = ({
  payment_state,
  total,
  total_payment,
  total_debt
}) => {
  return (
    <div className='column-content'>
      <h2 className='title'>Pago</h2>
      <p>
        <strong>Estado de Pago:</strong>
        <label>{payment_state}</label>
      </p>
      <p>
        <strong>Total:</strong> <label>{total}</label>
      </p>
      <p>
        <strong>Total Pagado:</strong> <label>{total_payment}</label>
      </p>
      <p>
        <strong>Total Deuda:</strong> <label>{total_debt}</label>
      </p>
    </div>
  )
}

OrderPayment.propTypes = {
  payment_state: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  total_payment: PropTypes.string.isRequired,
  total_debt: PropTypes.string.isRequired
}

export default OrderPayment
