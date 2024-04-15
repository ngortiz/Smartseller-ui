import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import DateRangePicker from '../../components/DateRangePicker';
import './style.css';
import { useLazyQuery, gql } from '@apollo/client';

import OrderCard from '../../components/OrderCard';
import { DndContext } from '@dnd-kit/core';
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

const OrderBoardPage = () => {
	const [orders, setOrders] = useState([]);

	const [getOrders, { loading, error, data }] = useLazyQuery(GET_ORDERS_QUERY);

	const defaultDate = new Date();
	const [startDate, setStartDate] = useState(defaultDate);
	const [endDate, setEndDate] = useState(defaultDate);

	const handleStartDateChange = date => {
		setStartDate(date);
	};

	const handleEndDateChange = date => {
		setEndDate(date);
	};
	const handleSearch = () => {
		getOrders({ variables: { startDate, endDate } });
	};

	useEffect(() => {
		if (data && data.getOrders) {
			console.log(data);
			setOrders(data.getOrders);
		}
	}, [loading]);

	const orderColumns = [
		{ title: 'No Atendidos', filterState: 'issued' },
		{ title: 'Preparando', filterState: 'preparing' },
		{ title: 'Preparados', filterState: 'prepared' },
		{ title: 'Enviando', filterState: 'delivering' },
		{ title: 'Sucursal', filterState: 'ready_to_pickup' },
		{ title: 'Atendidos', filterState: 'dispatched' },
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

	const updateOrderState = (orderId, newState) => {
		const updatedOrders = orders.map(order =>
			order.id === orderId ? { ...order, state: newState } : order,
		);
		setOrders(updatedOrders);
	};

	const handleDragEnd = ({ active, over }) => {
		if (over) {
			const orderId = parseInt(active.id);
			const newState = over.id;
			updateOrderState(orderId, newState);
		}
	};

	return (
		<DndContext onDragEnd={handleDragEnd}>
			<div className='order-control-container'>
				<header className='order-control-header'>Control de Pedidos</header>
				<Row className='row-cols'>
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
				<Row className='row-cols'>
					{orderColumns.map((column, index) => (
						<Col key={index} md={2} className='column-card'>
							<div className='column-with-card'>
								<h4 className='order-column-text'>{column.title}</h4>
								<Droppable id={column.filterState}>
									{orders.map(
										order =>
											order.orderState === column.filterState && (
												<OrderDraggable key={order.id} id={order.id}>
													<OrderCard
														order={order}
														getClassForState={getClassForState}
														column={column}
													/>
												</OrderDraggable>
											),
									)}
								</Droppable>
							</div>
						</Col>
					))}
				</Row>
			</div>
		</DndContext>
	);
};

export default OrderBoardPage;
