import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Container, Row, Col } from 'react-bootstrap'

import LeftNavigationBar from './components/LeftNavigationBar'
import OrdersSummary from './components/OrdersSummary'
import OrderInformationPage from './components/OrderInformationPage'
import OrderBoardPage from './components/OrderBoardPage'
import CreditCardPayments from './components/CreditCardPayments'
import BankPaymentsPage from './components/BankPaymentsPage'

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
              <Route path='/orders/summary' element={<OrdersSummary />} />

              <Route path='/order/board' element={<OrderBoardPage />} />
              <Route
                path='/credit-card-payments'
                element={<CreditCardPayments />}
              />
              <Route path='/bank-payments' element={<BankPaymentsPage />} />
              <Route path='/orders/:id' element={<OrderInformationPage />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </React.StrictMode>
  </BrowserRouter>
)
