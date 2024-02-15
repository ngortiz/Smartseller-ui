import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'
import './style.css'

const OrderCard = ({ order, getClassForState, column }) => {
  return (
    <div>
      <Card
        key={order.id}
        className={`order-card ${getClassForState(column.filterState)}`}
      >
        <Card.Body className='order-card-content'>
          <Card.Text className='order-card-text'>
            <span className='texto-spam'>
              <i className='bi bi-bag-fill'></i>
              <span className='separator'></span>
              <Link to={`/orders/${order.id}`}>{order.number}</Link>
            </span>
            <span className='texto-spam'>
              <i className='bi bi-person-square'></i>
              <span className='separator'></span>
              {order.client}
            </span>

            <span className='texto-spam'>
              <i className='bi bi-calendar-check'></i>
              <span className='separator'></span>
              {order.end_creation}
            </span>

            <span className='texto-spam'>
              <i className='bi bi-credit-card'></i>
              <span className='separator'></span>
              {order.payment_method}
            </span>
            <span className='texto-spam'>
              <i className='bi bi-credit-card'></i>
              <span className='separator'></span>
              {order.total}
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

OrderCard.propTypes = {
  order: PropTypes.object.isRequired,
  getClassForState: PropTypes.func.isRequired,
  column: PropTypes.object.isRequired
}

export default OrderCard
