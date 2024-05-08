import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import OrderClientInformation from '../../components/OrderClientInformation';
import OrderData from '../../components/OrderData';
import OrderPayment from '../../components/OrderPayment';
import OrderDetails from '../../components/OrderDetails';
import './style.css';

const OrderInformationPage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { orderId } = useParams();
	const [order, setOrder] = useState(null);

	const GET_ORDER = gql`
		query getOrder($orderId: Int!) {
			getOrder(orderId: $orderId) {
				id
				address
				buyMethod
				contactPhone
				createdAt
				orderDetails {
					productVariant {
						createdAt
						id
						name
						updatedAt
						internalCode
					}
					amount
					createdAt
					exenta
					id
					iva10
					iva5
					orderId
					price
					sellPrice
					subTotal
					updatedAt
				}
				orderState
				paymentState
				ruc
				total
				totalDebt
				totalPaid
				updatedAt
				username
				email
				number
				deliverCost
				totalGs
			}
		}
	`;

	const { loading, error, data } = useQuery(GET_ORDER, {
		variables: { orderId: parseInt(orderId) },
	});

	useEffect(() => {
		if (data && data.getOrder) {
			setOrder(data.getOrder);
		}
	}, [data]);

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<Container>
			<header>
				<h1 className='order-view'>{t('orderInformationPage.title')}</h1>
			</header>
			<Row className='justify-content-center'>
				<Col>
					<OrderClientInformation
						client={order?.username || ''}
						address={order?.address || ''}
						phone={order?.contactPhone || ''}
						ruc={order?.ruc || ''}
						color='#ffA500'
					/>
				</Col>
				<Col>
					<OrderData
						number={order?.number.toString() || ''}
						voucher={order?.number.toString() || ''}
						state={order?.orderState || ''}
						date={order?.createdAt || ''}
					/>
				</Col>
				<Col>
					<OrderPayment
						paymentState={order?.paymentState || ''}
						total={`"US$  ${order?.total || 0}"`}
						totalPaid={`US$  ${order?.totalPaid || 0}`}
						totalDebt={`US$  ${order?.totalDebt || 0}`}
					/>
				</Col>
			</Row>
			<Row className='justify-content-center'>
				<Col>
					<OrderDetails order={order} />
				</Col>
			</Row>
			<Row className='mt-4'>
				<Col className='button-container'>
					<Button className='back-button' onClick={handleGoBack}>
						<i className='bi bi-arrow-left-circle'></i>{' '}
						{t('orderInformationPage.goBack')}
					</Button>
					<Button className='print-button'>
						<i className='bi bi-printer'></i> {t('orderInformationPage.print')}
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default OrderInformationPage;
