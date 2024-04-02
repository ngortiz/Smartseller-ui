import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import './style.css'
import React, { useEffect } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import { useTranslation } from 'react-i18next'

const GET_ORDERS_BY_STATE_QUERY = gql`
  query GetOrdersByState(
    $state: OrderState!
    $startDate: AWSDateTime!
    $endDate: AWSDateTime!
  ) {
    getOrders(state: $state, startDate: $startDate, endDate: $endDate) {
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

const OrderStatus = ({
  color,
  amount,
  status,
  onSearchClick,
  startDate,
  endDate
}) => {
  const { t } = useTranslation()

  const [handleSearch, { loading, error, data }] = useLazyQuery(
    GET_ORDERS_BY_STATE_QUERY
  )

  useEffect(() => {
    if (data) {
      onSearchClick(data.getOrders)
    }
  }, [loading])

  const handleSearchClick = () => {
    handleSearch({ variables: { state: status, startDate, endDate } })
  }

  return (
    <div>
      <Card style={{ background: color }} data-testid='order-status-card'>
        <Card.Body>
          <Card.Title>{amount}</Card.Title>
          <Card.Text>{t(`orderStatus.${status}`)}</Card.Text>
          <div className='icon-container'>
            <i className='bi bi-handbag'></i>
          </div>
          <Button variant='' onClick={handleSearchClick} disabled={loading}>
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
  onSearchClick: PropTypes.func.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired
}

export default OrderStatus
