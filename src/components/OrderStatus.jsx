import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import './OrderStatus.css'

const OrderStatus = props => {
  return (
    <div>
      <Card style={{ background: props.color }}>
        <Card.Body>
          <Card.Title>{props.amount}</Card.Title>
          <Card.Text>{props.status}</Card.Text>
          <Button variant='primary'>
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
