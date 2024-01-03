import React from 'react'
import ReactDOM from 'react-dom/client'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import LeftNavigationBar from './components/LeftNavigationBar'
import OrderSummary from './pages/OrderSummary'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <Container fluid>
        <Row>
          <Col xs={3}>
            {' '}
            <LeftNavigationBar />
          </Col>
          <Col xs={9}>
            {' '}
            <OrderSummary />
          </Col>
        </Row>
      </Container>
    </React.StrictMode>
  </BrowserRouter>
)
