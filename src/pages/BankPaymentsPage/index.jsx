import React, { useState, useEffect } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery, gql } from '@apollo/client';
import PaymentModal from '../../components/PaymentModal/index';

const BankPaymentsPage = () => {
	const [selectedOption, setSelectedOption] = useState('all');
	const [payments, setPayments] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [showPaymentModal, setShowPaymentModal] = useState(false);
	const [selectedPayment, setSelectedPayment] = useState(null);
	const { t } = useTranslation();

	const GET_ORDERS_BY_PAYMENT_STATE_QUERY = gql`
		query GetOrdersByPaymentStateQuery(
			$state: PaymentState!
			$paidViaCreditCard: Boolean!
		) {
			getOrdersByPaymentState(
				state: $state
				paidViaCreditCard: $paidViaCreditCard
			) {
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

	const { loading, error, data } = useQuery(GET_ORDERS_BY_PAYMENT_STATE_QUERY, {
		variables: { state: selectedOption, paidViaCreditCard: false },
	});

	useEffect(() => {
		console.log('Estado de pago:', selectedOption);

		if (data && data.getOrdersByPaymentState) {
			console.log(data);
			setPayments(data.getOrdersByPaymentState);
			console.log(data);
		}
	}, [loading]);

	const handleSelectorChange = e => {
		const selectedValue = e.target.value;
		setSelectedOption(selectedValue);
	};

	const handleOrderNumberChange = e => {
		setSearchTerm(e.target.value);
	};

	const handlePaymentClick = payment => {
		setSelectedPayment(payment);
		setShowPaymentModal(true);
	};

	const handleCloseModal = () => {
		setShowPaymentModal(false);
	};

	const handleBackButtonClick = () => {
		setSelectedOption('all');
		setSearchTerm('');
	};

	return (
		<div>
			<header className='bank-header'>{t('bankPaymentsPage.header')}</header>

			<div className='bank-flex-container'>
				<div className='bank-container'>
					<span className='heard-state'>Estado:</span>
					<select
						className='bank-select'
						aria-label='large-select-example'
						value={selectedOption}
						onChange={handleSelectorChange}
					>
						<option value='all'>Seleccionar</option>
						<option value='Pendiente'>Pendiente</option>
						<option value='No completado'>No completado</option>
						<option value='Completado'>Completado</option>
						<option value='Cancelado'>Cancelado</option>
					</select>
				</div>

				<div className='bank-container'>
					<span className='heard-number'>Número de Orden:</span>
					<input
						type='text'
						className='bank-input'
						placeholder='Buscar por número de pedido'
						value={searchTerm}
						onChange={handleOrderNumberChange}
					/>
				</div>
			</div>

			{showPaymentModal && (
				<PaymentModal
					payment={selectedPayment}
					onClose={handleCloseModal}
					onPaymentRegister={() => {}}
				/>
			)}

			<table className='bank-table'>
				<thead>
					<tr>
						<th>Item</th>
						<th>Número</th>
						<th>Cliente</th>
						<th>Estado del Pedido</th>
						<th>Estado del Pago</th>
						<th>Forma de Pago</th>
						<th>Fecha de Creación</th>
						<th>Fecha de Expiración</th>
						<th>Total</th>
						<th>Registrar Pago</th>
					</tr>
				</thead>
				<tbody>
					{payments.map((payment, index) => (
						<tr key={payment.id}>
							<td>{index + 1}</td>
							<td>
								<Link to={`/orders/${payment.number}`}>{payment.number}</Link>
							</td>
							<td>{payment.username}</td>
							<td>{payment.orderState}</td>
							<td>{payment.paymentState}</td>
							<td>{payment.buyMethod}</td>
							<td>{payment.createdAt}</td>
							<td>{payment.updatedAt}</td>
							<td>{payment.total}</td>
							<td>
								{(payment.paymentState === 'Pendiente' ||
									payment.paymentState === 'No completado') && (
									<button
										className='btn-pagar'
										onClick={() => handlePaymentClick(payment)}
									>
										Pagar
									</button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<button className='bank-btn' onClick={handleBackButtonClick}>
				Atrás
			</button>
		</div>
	);
};

export default BankPaymentsPage;
