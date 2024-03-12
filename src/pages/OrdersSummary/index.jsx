import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import OrderStatus from '../../components/OrderStatus/index'
import DateRangePicker from '../../components/DateRangePicker'
import DataTable from '../../components/DataTable/index'
import { useQuery, gql } from '@apollo/client'

import './style.css'

const OrdersSummary = () => {
  const defaultDate = new Date()
  const [startDate, setStartDate] = useState(defaultDate)
  const [endDate, setEndDate] = useState(defaultDate)
  const [orders, setOrders] = useState([])
  const [currentStatus, setCurrentStatus] = useState(null)
  const [filteredOrders, setFilteredOrders] = useState([])

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
      // Al principio, mostramos todos los pedidos
      setFilteredOrders(data.getOrders)
    }
  }, [loading, data])

  const handleStartDateChange = date => {
    setStartDate(date)
  }

  const handleEndDateChange = date => {
    setEndDate(date)
  }

  const handleSearch = () => {
    console.log('Realizar búsqueda para el estado:', currentStatus)
    // Aquí podrías realizar alguna acción de búsqueda adicional si es necesario
  }

  const handleOrderStatusSearch = status => {
    console.log('Estado seleccionado:', status) // Verifica el estado seleccionado
    setCurrentStatus(status)
    if (status === null) {
      // Verificar si status es null en lugar de 'all'
      // Si se selecciona "todos", mostramos todos los pedidos
      setFilteredOrders(orders)
    } else {
      // Filtramos los pedidos por estado seleccionado
      const filtered = orders.filter(order => order.orderState === status)
      setFilteredOrders(filtered)
    }
  }

  return (
    <Container fluid>
      <Row className='title-container'>
        <Col>
          <h2 className='title'>Resumen de Pedidos</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          <OrderStatus
            status='new'
            amount={4}
            color='#00c0ef'
            onSearchClick={handleOrderStatusSearch}
          />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          <OrderStatus
            status='issued'
            amount={4}
            color='#f56954'
            onSearchClick={handleOrderStatusSearch}
          />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          <OrderStatus
            status='preparing'
            amount={3}
            color='#00a65a'
            onSearchClick={handleOrderStatusSearch}
          />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          <OrderStatus
            status='prepared'
            amount={1}
            color='#0073b7'
            onSearchClick={handleOrderStatusSearch}
          />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          <OrderStatus
            status='delivering'
            amount={3}
            color='#ff851b'
            onSearchClick={handleOrderStatusSearch}
          />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          <OrderStatus
            status='ready_to_pickup'
            amount={3}
            color='#f39c12'
            onSearchClick={handleOrderStatusSearch}
          />
        </Col>
        <Col xs={12} sm={6} md={4} lg={3} className='px-2'>
          <OrderStatus
            status='dispatched'
            amount={1}
            color='#222222'
            onSearchClick={handleOrderStatusSearch}
          />
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
        <Col>
          <DataTable orders={filteredOrders} />
        </Col>
      </Row>
    </Container>
  )
}

export default OrdersSummary
