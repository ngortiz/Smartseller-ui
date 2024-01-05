import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LeftNavigationBar from './components/LeftNavigationBar'
import OrdersSummary from './pages/OrdersSummary'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <Container fluid>
        <Row>
          <Col xs={3}>
            <LeftNavigationBar />
          </Col>
          <Col xs={9}>
            <Routes>
              <Route path='orders/orders-summary' element={<OrdersSummary />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </React.StrictMode>
  </BrowserRouter>
)
