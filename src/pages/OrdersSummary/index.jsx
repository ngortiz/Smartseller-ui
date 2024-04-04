
import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import OrderStatus from '../../components/OrderStatus/index'
import DateRangePicker from '../../components/DateRangePicker'
import DataTable from '../../components/DataTable/index'
import { useQuery, gql, useLazyQuery } from '@apollo/client'
import { subMonths } from 'date-fns'

import './style.css'

const OrdersSummary = () => {
  const [startDate, setStartDate] = useState(subMonths(new Date(), 1))
  const [endDate, setEndDate] = useState(new Date())
  const [orders, setOrders] = useState([])
  const [ordersAmountGroupByState, setOrdersAmountGroupByState] = useState([])
  const [loading, setLoading] = useState(false) 

  const GET_ORDERS_QUERY = gql`
    query GetOrdersQuery($startDate: AWSDateTime!, $endDate: AWSDateTime!) {
      getOrders(startDate: $startDate, endDate: $endDate) {
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

  const GET_ORDERS_AMOUNT_GROUP_BY_STATE_QUERY = gql`
    query getOrdersAmountGroupByState(
      $startDate: AWSDateTime!
      $endDate: AWSDateTime
    ) {
      getOrdersAmountGroupByState(startDate: $startDate, endDate: $endDate) {
        amount
        orderState
      }
    }
  `

  const [handleSearchByDate, { loading: ordersLoading, data: ordersData }] =
    useLazyQuery(GET_ORDERS_QUERY)

  const { loading: ordersAmountLoading, data: ordersAmountData } = useQuery(
    GET_ORDERS_AMOUNT_GROUP_BY_STATE_QUERY,
    {
      variables: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }
    }
  )
  
  useEffect(() => {
    if (ordersData) {
      setOrders(ordersData.getOrders)
      setLoading(false) 
    }
    if (ordersAmountData) {
      setOrdersAmountGroupByState(ordersAmountData.getOrdersAmountGroupByState)
    }
  }, [ordersLoading, ordersAmountLoading])

  const handleStartDateChange = date => {
    setStartDate(date)
  }

  const handleEndDateChange = date => {
    setEndDate(date)
  }

  const handleOrdersUpdate = newOrders => {
    setOrders(newOrders)
  }
  const handleSearch = () => {
    setLoading(true)
    handleSearchByDate({
      variables: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        
      }
      
    })
  }

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
      {ordersAmountGroupByState.length > 0 && (
        <Row>
          <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
            <OrderStatus
              status='new'
              amount={ordersAmountGroupByState[0].amount}
              color='#00c0ef'
              onSearchClick={handleOrdersUpdate}
              startDate={startDate}
              endDate={endDate}
            />
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
            <OrderStatus
              status='issued'
              amount={ordersAmountGroupByState[1].amount}
              color='#f56954'
              onSearchClick={handleOrdersUpdate}
              startDate={startDate}
              endDate={endDate}
            />
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
            <OrderStatus
              status='preparing'
              amount={ordersAmountGroupByState[2].amount}
              color='#00a65a'
              onSearchClick={handleOrdersUpdate}
              startDate={startDate}
              endDate={endDate}
            />
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
            <OrderStatus
              status='prepared'
              amount={ordersAmountGroupByState[3].amount}
              color='#0073b7'
              onSearchClick={handleOrdersUpdate}
              startDate={startDate}
              endDate={endDate}
            />
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
            <OrderStatus
              status='delivering'
              amount={ordersAmountGroupByState[4].amount}
              color='#ff851b'
              onSearchClick={handleOrdersUpdate}
              startDate={startDate}
              endDate={endDate}
            />
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
            <OrderStatus
              status='ready_to_pickup'
              amount={ordersAmountGroupByState[5].amount}
              color='#f39c12'
              onSearchClick={handleOrdersUpdate}
              startDate={startDate}
              endDate={endDate}
            />
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
            <OrderStatus
              status='dispatched'
              amount={ordersAmountGroupByState[6].amount}
              color='#222222'
              onSearchClick={handleOrdersUpdate}
              startDate={startDate}
              endDate={endDate}
            />
          </Col>
        </Row>
      )}
     <Row>
        <Col>
          {loading ? ( 
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <DataTable orders={orders} loading={loading} /> 
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default OrdersSummary
