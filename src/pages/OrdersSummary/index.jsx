import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import OrderStatus from '../../components/OrderStatus';
import DateRangePicker from '../../components/DateRangePicker';
import DataTable from '../../components/DataTable';
import { useLazyQuery, gql } from '@apollo/client';
import { subMonths } from 'date-fns';
import { useTranslation } from 'react-i18next';
import './style.css';

const OrdersSummary = () => {
	const { t } = useTranslation();

	const [startDate, setStartDate] = useState(() => {
		const params = new URLSearchParams(window.location.search);
		const startDateParam = params.get('startDate');
		return startDateParam ? new Date(startDateParam) : subMonths(new Date(), 1);
	});

	const [endDate, setEndDate] = useState(() => {
		const params = new URLSearchParams(window.location.search);
		const endDateParam = params.get('endDate');
		return endDateParam ? new Date(endDateParam) : new Date();
	});

	const [orders, setOrders] = useState([]);
	const [ordersAmountGroupByState, setOrdersAmountGroupByState] = useState([]);

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
	`;

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
	`;

	const [fetchOrders, { loading: ordersLoading, data: ordersData }] =
		useLazyQuery(GET_ORDERS_QUERY);
	const [
		fetchOrderAmounts,
		{ loading: ordersAmountLoading, data: ordersAmountData },
	] = useLazyQuery(GET_ORDERS_AMOUNT_GROUP_BY_STATE_QUERY);

	useEffect(() => {
		if (ordersData) {
			setOrders(ordersData.getOrders);
		}
	}, [ordersData]);

	useEffect(() => {
		if (ordersAmountData) {
			setOrdersAmountGroupByState(ordersAmountData.getOrdersAmountGroupByState);
		}
	}, [ordersAmountData]);

	useEffect(() => {
		handleSearch();
		updateURL(startDate, endDate);
	}, [startDate, endDate]);

	const updateURL = (start, end) => {
		const params = new URLSearchParams(window.location.search);
		params.set('startDate', start.toISOString());
		params.set('endDate', end.toISOString());
		window.history.replaceState(
			{},
			'',
			`${window.location.pathname}?${params.toString()}`,
		);
	};

	const handleStartDateChange = date => {
		setStartDate(date);
	};

	const handleEndDateChange = date => {
		setEndDate(date);
	};

	// Función para realizar la búsqueda de datos
	const handleSearch = () => {
		fetchOrders({
			variables: {
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
			},
		});
		fetchOrderAmounts({
			variables: {
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
			},
		});
	};

	const renderOrderStatuses = () => {
		const statusColors = {
			new: '#00c0ef',
			issued: '#f56954',
			preparing: '#00a65a',
			prepared: '#0073b7',
			delivering: '#ff851b',
			ready_to_pickup: '#f39c12',
			dispatched: '#222222',
		};

		return Object.keys(statusColors).map((status, index) => (
			<Col xs={12} sm={6} md={4} lg={3} className='px-2' key={status}>
				<OrderStatus
					status={status}
					amount={ordersAmountGroupByState[index]?.amount || 0}
					color={statusColors[status]}
					onSearchClick={handleSearch}
					startDate={startDate}
					endDate={endDate}
				/>
			</Col>
		));
	};

	return (
		<>
			<Row>
				<Col>
					<header className='title-resumen'>{t('ordersSummary.header')}</header>
				</Col>
			</Row>
			<Container fluid className='container-white-bg'>
				<DateRangePicker
					startDate={startDate}
					endDate={endDate}
					handleStartDateChange={handleStartDateChange}
					handleEndDateChange={handleEndDateChange}
					handleSearch={handleSearch}
				/>
				{ordersAmountLoading ? (
					<Row>
						<Col xs={12} className='spinner-container'>
							<Spinner
								animation='border'
								role='status'
								variant='primary'
								style={{ width: '3rem', height: '3rem' }}
							>
								<span className='sr-only'></span>
							</Spinner>
						</Col>
					</Row>
				) : (
					<Row>{renderOrderStatuses()}</Row>
				)}
			</Container>
			<Container fluid className='containerTable-white-bg'>
				<Row>
					<Col>
						<DataTable orders={orders} loading={ordersLoading} />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default OrdersSummary;
