import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import OrderStatus from '../../components/OrderStatus/index';
import DateRangePicker from '../../components/DateRangePicker';
import DataTable from '../../components/DataTable/index';
import { useLazyQuery, gql } from '@apollo/client';
import { subMonths } from 'date-fns';
import { useTranslation } from 'react-i18next';
import './style.css';

const OrdersSummary = () => {
	const { t } = useTranslation();
	const [startDate, setStartDate] = useState(() => {
		const savedStartDate = localStorage.getItem('startDate');
		return savedStartDate ? new Date(savedStartDate) : subMonths(new Date(), 1);
	});
	const [endDate, setEndDate] = useState(() => {
		const savedEndDate = localStorage.getItem('endDate');
		return savedEndDate ? new Date(savedEndDate) : new Date();
	});
	const [orders, setOrders] = useState([]);
	const [ordersAmountGroupByState, setOrdersAmountGroupByState] = useState([]);
	const [firstLoading, setFirstLoading] = useState(true);

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

	const [handleSearchByDate, { loading: ordersLoading, data: ordersData }] =
		useLazyQuery(GET_ORDERS_QUERY);

	const [
		handleSearchAmountsByDate,
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
		if (firstLoading) {
			handleSearch();
			setFirstLoading(false);
		}
	}, [firstLoading]);

	const handleStartDateChange = date => {
		setStartDate(date);
		localStorage.setItem('startDate', date.toISOString());
	};

	const handleEndDateChange = date => {
		setEndDate(date);
		localStorage.setItem('endDate', date.toISOString());
	};

	const handleSearch = () => {
		handleSearchByDate({
			variables: {
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
			},
		});

		handleSearchAmountsByDate({
			variables: {
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
			},
		});
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
					<Row>
						<Col xs={12} sm={6} md={4} lg={3} className='px-2'>
							<OrderStatus
								status='new'
								amount={
									ordersAmountGroupByState[0]
										? ordersAmountGroupByState[0].amount
										: 0
								}
								color='#00c0ef'
								onSearchClick={handleSearch}
								startDate={startDate}
								endDate={endDate}
							/>
						</Col>
						<Col xs={12} sm={6} md={4} lg={3} className='px-2'>
							<OrderStatus
								status='issued'
								amount={
									ordersAmountGroupByState[1]
										? ordersAmountGroupByState[1].amount
										: 0
								}
								color='#f56954'
								onSearchClick={handleSearch}
								startDate={startDate}
								endDate={endDate}
							/>
						</Col>
						<Col xs={12} sm={6} md={4} lg={3} className='px-2'>
							<OrderStatus
								status='preparing'
								amount={
									ordersAmountGroupByState[2]
										? ordersAmountGroupByState[2].amount
										: 0
								}
								color='#00a65a'
								onSearchClick={handleSearch}
								startDate={startDate}
								endDate={endDate}
							/>
						</Col>
						<Col xs={12} sm={6} md={4} lg={3} className='px-2'>
							<OrderStatus
								status='prepared'
								amount={
									ordersAmountGroupByState[3]
										? ordersAmountGroupByState[3].amount
										: 0
								}
								color='#0073b7'
								onSearchClick={handleSearch}
								startDate={startDate}
								endDate={endDate}
							/>
						</Col>
						<Col xs={12} sm={6} md={4} lg={3} className='px-2'>
							<OrderStatus
								status='delivering'
								amount={
									ordersAmountGroupByState[4]
										? ordersAmountGroupByState[4].amount
										: 0
								}
								color='#ff851b'
								onSearchClick={handleSearch}
								startDate={startDate}
								endDate={endDate}
							/>
						</Col>
						<Col xs={12} sm={6} md={4} lg={3} className='px-2'>
							<OrderStatus
								status='ready_to_pickup'
								amount={
									ordersAmountGroupByState[5]
										? ordersAmountGroupByState[5].amount
										: 0
								}
								color='#f39c12'
								onSearchClick={handleSearch}
								startDate={startDate}
								endDate={endDate}
							/>
						</Col>
						<Col xs={12} sm={6} md={4} lg={3} className='px-2'>
							<OrderStatus
								status='dispatched'
								amount={
									ordersAmountGroupByState[6]
										? ordersAmountGroupByState[6].amount
										: 0
								}
								color='#222222'
								onSearchClick={handleSearch}
								startDate={startDate}
								endDate={endDate}
							/>
						</Col>
					</Row>
				)}
			</Container>
			<>
				<Container fluid className='containerTable-white-bg'>
					<Row>
						<Col>
							<DataTable orders={orders} loading={ordersLoading} />
						</Col>
					</Row>
				</Container>
			</>
		</>
	);
};

export default OrdersSummary;
