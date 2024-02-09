import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Container, Row, Col } from 'react-bootstrap'
import LeftNavigationBar from './components/LeftNavigationBar'
import OrdersSummary from './pages/OrdersSummary'
import OrderInformationPage from './pages/OrderInformationPage'
import OrderControlPage from './pages/OrderControlPage'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <Container fluid>
        <Row>
          <Col xs={3}>
            <LeftNavigationBar />
          </Col>
          <Col xs={9}>
            <Routes>
              <Route path='/orders/:id' element={<OrderInformationPage />} />
              <Route path='/orders/summary' element={<OrdersSummary />} />
              <Route
                path='/orders/control/page'
                element={<OrderControlPage />}
              />
            </Routes>
          </Col>
        </Row>
      </Container>
    </React.StrictMode>
  </BrowserRouter>
)
