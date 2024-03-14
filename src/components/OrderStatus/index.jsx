import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import './style.css'
import React, { useEffect } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import { useTranslation } from 'react-i18next'

const GET_ORDERS_BY_STATE_QUERY = gql`
  query GetOrdersByState($state: OrderState!) {
    getOrders(state: $state) {
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
  const { t } = useTranslation()
  const [handleSearch, { loading, error, data }] = useLazyQuery(
    GET_ORDERS_BY_STATE_QUERY
  )
  useEffect(() => {
    if (data) {
      onSearchClick(data.getOrders)
    }
  }, [loading])

  return (
    <div>
      <Card style={{ background: color }} data-testid='order-status-card'>
        <Card.Body>
          <Card.Title>{amount}</Card.Title>
          <Card.Text>{status}</Card.Text>
          <div className='icon-container'>
            <i className='bi bi-handbag'></i>
          </div>
          <Button
            variant=''
            onClick={() => handleSearch({ variables: { state: status } })}
            disabled={loading}
          >
            {loading ? 'Buscando...' : 'Buscar'}{' '}
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
