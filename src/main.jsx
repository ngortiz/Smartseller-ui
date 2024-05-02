import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Row, Col } from 'react-bootstrap';
import {
	ApolloClient,
	createHttpLink,
	InMemoryCache,
	ApolloProvider,
	gql,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import LeftNavigationBar from './components/LeftNavigationBar';
import OrdersSummary from './pages/OrdersSummary';
import OrderInformationPage from './pages/OrderInformationPage';
import OrderBoardPage from './pages/OrderBoardPage';
import CreditCardPayments from './pages/CreditCardPayments';
import BankPaymentsPage from './pages/BankPaymentsPage';
import RegisterProductsFromExcelPage from './pages/RegisterProductsFromExcelPage';
import BulkUploadProductImages from './pages/BulkUploadProductImages';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n';

const httpLink = createHttpLink({
	uri: import.meta.env.VITE_API_URL,
});

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			authorization: import.meta.env.VITE_ACCESS_TOKEN,
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<React.StrictMode>
			<I18nextProvider i18n={i18n}>
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
									<Route
										path='/orders/:orderId'
										element={<OrderInformationPage />}
									/>
									<Route path='/' element={<OrdersSummary />} />
									<Route
										path='register-products-from-excel'
										element={<RegisterProductsFromExcelPage />}
									/>
									<Route
										path='bulkU-pload-product-images'
										element={<BulkUploadProductImages />}
									/>
								</Routes>
							</Col>
						</Row>
					</Container>
				</ApolloProvider>
			</I18nextProvider>
		</React.StrictMode>
	</BrowserRouter>,
);
