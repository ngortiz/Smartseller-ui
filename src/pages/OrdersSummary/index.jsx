import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OrderStatus from '../../components/OrderStatus/index'
import DateRangePicker from '../../components/DateRangePicker'
import DataTable from '../../components/DataTable/index'
import { useQuery, gql } from '@apollo/client'
import { subMonths } from 'date-fns'

import './style.css'

const OrdersSummary = () => {
  const [startDate, setStartDate] = useState(subMonths(new Date(), 1))
  const [endDate, setEndDate] = useState(new Date())
  const [orders, setOrders] = useState([])

  const GET_ORDERS_QUERY = gql`
    query GetOrdersQuery {
      getOrders {
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

  const { loading, data } = useQuery(GET_ORDERS_QUERY)

  useEffect(() => {
    if (data) {
      setOrders(data.getOrders)
    }
  }, [loading, data])

  const handleStartDateChange = date => {
    setStartDate(date)
  }

  const handleEndDateChange = date => {
    setEndDate(date)
  }

  const handleOrdersUpdate = newOrders => {
    setOrders(newOrders)
  }
  const handleSearch = () => {}

  return (
    <Container fluid>
      <Row className='title-container'>
        <Col>
          <h2 className='title'>Resumen de Pedidos</h2>
        </Col>
      </Row>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
        handleSearch={handleSearch}
      />
      <Row>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          <OrderStatus
            status='new'
            amount={4}
            color='#00c0ef'
            onSearchClick={handleOrdersUpdate}
          />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          <OrderStatus
            status='issued'
            amount={4}
            color='#f56954'
            onSearchClick={handleOrdersUpdate}
          />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          <OrderStatus
            status='preparing'
            amount={3}
            color='#00a65a'
            onSearchClick={handleOrdersUpdate}
          />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          <OrderStatus
            status='prepared'
            amount={1}
            color='#0073b7'
            onSearchClick={handleOrdersUpdate}
          />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          <OrderStatus
            status='delivering'
            amount={3}
            color='#ff851b'
            onSearchClick={handleOrdersUpdate}
          />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          <OrderStatus
            status='ready_to_pickup'
            amount={3}
            color='#f39c12'
            onSearchClick={handleOrdersUpdate}
          />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          <OrderStatus
            status='dispatched'
            amount={1}
            color='#222222'
            onSearchClick={handleOrdersUpdate}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <DataTable orders={orders} />
        </Col>
      </Row>
    </Container>
  )
}

export default OrdersSummary
