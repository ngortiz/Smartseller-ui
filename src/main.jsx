import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Container, Row, Col } from 'react-bootstrap'
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import LeftNavigationBar from './components/LeftNavigationBar'
import OrdersSummary from './pages/OrdersSummary'
import OrderInformationPage from './pages/OrderInformationPage'
import OrderBoardPage from './pages/OrderBoardPage'
import CreditCardPayments from './pages/CreditCardPayments'
import BankPaymentsPage from './pages/BankPaymentsPage'

const httpLink = createHttpLink({
  uri: 'https://ityvl3yq6rdklorvuczme56giq.appsync-api.us-east-1.amazonaws.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: 'fbe90179-d8e5-415b-a41f-bb3ab4cbfafd',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    </React.StrictMode>
  </BrowserRouter>
)
