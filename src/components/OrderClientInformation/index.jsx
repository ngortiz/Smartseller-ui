import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'react-bootstrap'

const OrderClientInformation = ({ client, address, phone, ruc }) => {
  return (
    <div className='column-content'>
      <Col className='order-info-col'>
        <h2 className='title'>Cliente</h2>
        <p>
          <strong>Cliente:</strong>
          <label> {client} </label>
        </p>
        <p>
          <strong>Dirección:</strong>
          <label>{address}</label>
        </p>
        <p>
          <strong>Celular:</strong> <label>{phone}</label>
        </p>
        <p>
          <strong>RUC./CI.:</strong> <label>{ruc}</label>
        </p>
      </Col>
    </div>
  )
}

OrderClientInformation.propTypes = {
  client: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  ruc: PropTypes.string.isRequired
}

export default OrderClientInformation
