import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Spinner } from 'react-bootstrap';
import DateRangePicker from '../../components/DateRangePicker';
import './style.css';
import { useLazyQuery, gql, useMutation } from '@apollo/client';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import OrderCard from '../../components/OrderCard';
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import Droppable from '../../components/Droppable';
import OrderDraggable from '../../components/OrderDraggable';

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

const UPDATE_ORDER_STATE_MUTATION = gql`
	mutation UpdateOrderState($order: OrderStateInput!) {
		updateOrderState(order: $order) {
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

const OrderBoardPage = () => {
	const [orders, setOrders] = useState([]);
	const { t } = useTranslation();

	const [getOrders, { loading, data }] = useLazyQuery(GET_ORDERS_QUERY);
	const [updateOrderState] = useMutation(UPDATE_ORDER_STATE_MUTATION, {
		onError: error => console.error('Error during mutation:', error),
	});

	const defaultDate = moment().subtract(1, 'months').toDate();
	const [startDate, setStartDate] = useState(defaultDate);
	const [endDate, setEndDate] = useState(new Date());
	const [firstLoading, setFirstLoading] = useState(true);

	const handleStartDateChange = date => setStartDate(date);
	const handleEndDateChange = date => setEndDate(date);

	const handleSearch = () => getOrders({ variables: { startDate, endDate } });

	useEffect(() => {
		if (data && data.getOrders) {
			setOrders(data.getOrders);
		}
		if (firstLoading) {
			handleSearch();
			setFirstLoading(false);
		}
	}, [loading, data]);

	const orderColumns = [
		{ title: t('orderStatus.issued'), filterState: 'issued' },
		{ title: t('orderStatus.preparing'), filterState: 'preparing' },
		{ title: t('orderStatus.prepared'), filterState: 'prepared' },
		{ title: t('orderStatus.delivering'), filterState: 'delivering' },
		{ title: t('orderStatus.ready_to_pickup'), filterState: 'ready_to_pickup' },
		{ title: t('orderStatus.dispatched'), filterState: 'dispatched' },
	];

	const getClassForState = state => {
		switch (state) {
			case 'issued':
				return 'state-issued';
			case 'preparing':
				return 'state-preparing';
			case 'prepared':
				return 'state-prepared';
			case 'delivering':
				return 'state-delivering';
			case 'ready_to_pickup':
				return 'state-ready_to_pickup';
			case 'dispatched':
				return 'state-dispatched';
			default:
				return '';
		}
	};

	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 5,
			},
		}),
	);

	const handleDragEnd = async ({ active, over }) => {
		if (over) {
			const orderId = active.id.replace('order-', '');
			const newState = over.id;

			try {
				const { data } = await updateOrderState({
					variables: {
						order: { id: orderId, orderState: newState },
					},
				});

				const updatedOrders = orders.map(order =>
					order.id === orderId
						? { ...order, orderState: data.updateOrderState.orderState }
						: order,
				);
				setOrders(updatedOrders);
			} catch (error) {
				console.error('Error updating order state:', error);
			}
		}
	};

	return (
		<DndContext sensors={sensors} onDragEnd={handleDragEnd}>
			<header className='order-control-header'>Control de Pedidos</header>
			<Container fluid className='container-board-bg'>
				<Row>
					<Col className='order-date-col'>
						<DateRangePicker
							startDate={startDate}
							endDate={endDate}
							handleStartDateChange={handleStartDateChange}
							handleEndDateChange={handleEndDateChange}
							handleSearch={handleSearch}
						/>
					</Col>
				</Row>

				{loading && (
					<Row>
						<Col
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								marginBottom: '20px',
							}}
						>
							<Spinner animation='border' role='status' variant='primary'>
								<span className='sr-only'></span>
							</Spinner>
						</Col>
					</Row>
				)}
				<Row>
					{orderColumns.map((column, index) => (
						<Col key={index} md={2} className='column-card'>
							<div className='column-with-card'>
								<h4 className='order-column-text'>{column.title}</h4>
								<Droppable id={column.filterState}>
									{orders.map(
										order =>
											order.orderState === column.filterState && (
												<OrderDraggable key={order.id} id={`order-${order.id}`}>
													<OrderCard
														order={order}
														getClassForState={getClassForState}
														column={column}
														createdDate={moment(order.createdAt).format(
															'DD/MM/YYYY HH:mm',
														)}
													/>
												</OrderDraggable>
											),
									)}
								</Droppable>
							</div>
						</Col>
					))}
				</Row>
			</Container>
		</DndContext>
	);
};

export default OrderBoardPage;
