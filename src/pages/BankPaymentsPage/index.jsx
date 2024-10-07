import React, { useState, useEffect } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery, gql } from '@apollo/client';
import PaymentModal from '../../components/PaymentModal/index';
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';
import { Container, Table } from 'react-bootstrap';

const BankPaymentsPage = () => {
	const [selectedOption, setSelectedOption] = useState('pending');
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
				totalGs
			}
		}
	`;

	const { loading, error, data } = useQuery(GET_ORDERS_BY_PAYMENT_STATE_QUERY, {
		variables: { state: selectedOption, paidViaCreditCard: false },
	});
	useEffect(() => {
		if (data && data.getOrdersByPaymentState) {
			setPayments(data.getOrdersByPaymentState);
		}
	}, [data]);

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

	const formatDateTime = dateTime => {
		return moment(dateTime).format('DD-MM-YYYY HH:mm');
	};
	const filterePayments =
		searchTerm.length <= 0
			? payments
			: payments.filter(payment => {
					return payment.number.toString().includes(searchTerm);
				});
	return (
		<div>
			<header className='bank-header'>{t('bankPaymentsPage.header')}</header>
			<Container className='container-white-bank'>
				<div className='bank-flex-container'>
					<div className='bank-container'>
						<span className='heard-state'>{t('bankPaymentsPage.state')}:</span>
						<select
							className='bank-select'
							aria-label='large-select-example'
							value={selectedOption}
							onChange={handleSelectorChange}
						>
							<option value='pending'>{t('bankPaymentsPage.pending')}</option>
							<option value='no_completed'>
								{t('bankPaymentsPage.notCompleted')}
							</option>
							<option value='completed'>
								{t('bankPaymentsPage.completed')}
							</option>
							<option value='cancelled'>
								{t('bankPaymentsPage.cancelled')}
							</option>
						</select>
					</div>

					<div className='bank-container'>
						<span className='heard-number'>
							{t('bankPaymentsPage.orderNumber')}:
						</span>
						<input
							type='text'
							className='bank-input'
							placeholder={t('bankPaymentsPage.searchPlaceholder')}
							value={searchTerm}
							onChange={handleOrderNumberChange}
						/>
					</div>
				</div>
				{loading && (
					<div className='spinner-cont'>
						<Spinner animation='border' role='status' variant='primary'>
							<span className='sr-only'></span>
						</Spinner>
					</div>
				)}

				{!loading && <table className='bank-table'>{}</table>}

				{showPaymentModal && (
					<PaymentModal
						payment={selectedPayment}
						onClose={handleCloseModal}
						onPaymentRegister={() => {}}
					/>
				)}

				<Table bordered hover className='bank-table'>
					<thead>
						<tr>
							<th>{t('bankPaymentsPage.item')}</th>
							<th>{t('bankPaymentsPage.number')}</th>
							<th>{t('bankPaymentsPage.client')}</th>
							<th>{t('bankPaymentsPage.orderState')}</th>
							<th>{t('bankPaymentsPage.paymentState')}</th>
							<th>{t('bankPaymentsPage.paymentMethod')}</th>
							<th>{t('bankPaymentsPage.createdAt')}</th>
							<th>{t('bankPaymentsPage.updatedAt')}</th>
							<th>{t('bankPaymentsPage.total')}</th>
							<th>{t('bankPaymentsPage.registerPayment')}</th>
						</tr>
					</thead>
					<tbody>
						{filterePayments.map((payment, index) => (
							<tr key={payment.id}>
								<td>{index + 1}</td>
								<td>
									<Link to={`/orders/${payment.id}`}>{payment.number}</Link>
								</td>
								<td>{payment.username}</td>
								<td>{t(`orderStatus.${payment.orderState}`)}</td>
								<td>{t(`paymentStatus.${payment.paymentState}`)}</td>
								<td>{t(`buyMethods.${payment.buyMethod}`)}</td>
								<td>{formatDateTime(payment.createdAt)}</td>
								<td>{formatDateTime(payment.updatedAt)}</td>
								<td>US$ {payment.total}</td>
								<td>
									{payment.paymentState === 'completed'
										? t('paymentStatus.completed')
										: (payment.paymentState === 'pending' ||
												payment.paymentState === 'no_completed') && (
												<button
													className='btn-pagar'
													onClick={() => handlePaymentClick(payment)}
												>
													{t('bankPaymentsPage.pay')}
												</button>
											)}
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Container>
		</div>
	);
};

export default BankPaymentsPage;
