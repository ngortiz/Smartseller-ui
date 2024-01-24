// OrderStatus.jsx

import React from 'react'
import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import './OrderStatus.css'

const OrderStatus = ({ color, amount, status }) => {
  return (
    <div>
      <Card style={{ background: color }} data-testid='order-status-card'>
        <Card.Body>
          <Card.Title>{amount}</Card.Title>
          <Card.Text>{status}</Card.Text>
          <div className='icon-container'>
            <i className='bi bi-handbag'></i>
          </div>
          <Button variant=''>
            Buscar <i className='bi bi-arrow-right-circle'></i>
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

OrderStatus.propTypes = {
  color: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired
}

export default OrderStatus
