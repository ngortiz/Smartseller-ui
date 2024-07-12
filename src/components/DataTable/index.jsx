import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Form, Spinner } from 'react-bootstrap';
import moment from 'moment';
import './style.css';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const DataTable = ({ orders, loading }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const { t } = useTranslation();

	const filteredOrders = orders.filter(
		order =>
			order.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
			order.number.toString().includes(searchTerm),
	);

	return (
		<div>
			<Form.Group controlId='searchForm'>
				<Form.Control
					type='text'
					placeholder='Buscar por Cliente o Número'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
			</Form.Group>

			<Table striped bordered hover className='data-table'>
				<thead>
					<tr>
						<th>Item</th>
						<th>Número</th>
						<th>Cliente</th>
						<th>Estado Pedido</th>
						<th>Estado Pago</th>
						<th>Forma Pago</th>
						<th>Fecha Creación</th>
						<th>Fecha Expiración</th>
						<th>Total</th>
					</tr>
				</thead>
				<tbody>
					{loading ? (
						<tr>
							<td colSpan='9' className='spinner-container'>
								<Spinner
									animation='border'
									role='status'
									variant='primary'
									style={{ width: '3rem', height: '3rem' }}
								>
									<span className='sr-only'></span>
								</Spinner>
							</td>
						</tr>
					) : (
						filteredOrders.map((order, index) => (
							<tr key={order.id}>
								<td>{index + 1}</td>
								<td>
									<Link to={`/orders/${order.id}`}>{order.number}</Link>
								</td>
								<td>{order.username}</td>
								<td>{t(`orderStatus.${order.orderState}`)}</td>
								<td>{t(`paymentStatus.${order.paymentState}`)}</td>
								<td>{t(`buyMethods.${order.buyMethod}`)}</td>
								<td>{moment(order.createdAt).format('DD-MM-YYYY HH:mm')}</td>
								<td>{moment(order.updatedAt).format('DD-MM-YYYY HH:mm')}</td>
								<td>US$ {order.total}</td>
							</tr>
						))
					)}
				</tbody>
			</Table>
		</div>
	);
};

DataTable.propTypes = {
	orders: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default DataTable;
