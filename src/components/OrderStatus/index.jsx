import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import './style.css'
import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'

const GET_ORDERS_BY_STATUS_QUERY = gql`
  query GetOrdersByStatus($status: String!) {
    getOrders(status: $status) {
      buyMethod
      number
      username
      id
      orderState
      paymentState
      updatedAt
      createdAt
      total
    }
  }
`

const OrderStatus = ({ color, amount, status, onSearchClick }) => {
  const [isSearching, setIsSearching] = useState(false)

  const { loading, data } = useQuery(GET_ORDERS_BY_STATUS_QUERY, {
    variables: { status }
  })

  const handleSearchClick = async () => {
    console.log('Estado seleccionado en OrderStatus:', status)
    setIsSearching(true)
    try {
      await onSearchClick(status)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div>
      <Card style={{ background: color }} data-testid='order-status-card'>
        <Card.Body>
          <Card.Title>{amount}</Card.Title>
          <Card.Text>{status}</Card.Text>
          <div className='icon-container'>
            <i className='bi bi-handbag'></i>
          </div>
          <Button variant='' onClick={handleSearchClick} disabled={isSearching}>
            {isSearching ? 'Buscando...' : 'Buscar'}{' '}
            <i className='bi bi-arrow-right-circle'></i>
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}

OrderStatus.propTypes = {
  color: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  onSearchClick: PropTypes.func.isRequired
}

export default OrderStatus
