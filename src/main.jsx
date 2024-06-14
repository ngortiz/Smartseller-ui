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
import ProductSearcherPage from './pages/ProductSearcherPage ';
import CategoriesPage from './pages/CategoriesPage';
import CreateTemplatesPage from './pages/CreateTemplatesPage';
import MarketRatePage from './pages/MarketRatePage';
import GeneralDiscountPage from './pages/GeneralDiscountPage ';
import OfferDiscountPage from './pages/OfferDiscountPage';
import DiscountByCategoryPage from './pages/DiscountByCategoryPage';
import DiscountByCouponsPage from './pages/DiscountByCouponsPage';
import CustomersPage from './pages/CustomersPage';
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
										path='bulk-upload-product-images'
										element={<BulkUploadProductImages />}
									/>
									<Route
										path='product-searcher-page'
										element={<ProductSearcherPage />}
									/>
									<Route path='categories-page' element={<CategoriesPage />} />

									<Route
										path='create-templates-page'
										element={<CreateTemplatesPage />}
									/>
									<Route path='market-rate-page' element={<MarketRatePage />} />

									<Route
										path='general-discount-page'
										element={<GeneralDiscountPage />}
									/>
									<Route
										path='offer-discount-page'
										element={<OfferDiscountPage />}
									/>
									<Route
										path='discount-by-category-page'
										element={<DiscountByCategoryPage />}
									/>
									<Route
										path='discount-by-coupons-page'
										element={<DiscountByCouponsPage />}
									/>
									<Route path='customers-page' element={<CustomersPage />} />
								</Routes>
							</Col>
						</Row>
					</Container>
				</ApolloProvider>
			</I18nextProvider>
		</React.StrictMode>
	</BrowserRouter>,
);
