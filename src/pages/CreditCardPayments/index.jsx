import './style.css';
import { gql, useLazyQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';

const CreditCardPayments = () => {
	const [selectedOption, setSelectedOption] = useState('all');
	const [payments, setPayments] = useState([]);
	const [firstLoading, setFirstLoading] = useState(true);
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
				pagoparTransaction {
					paid
					cancelled
					paymentDate
					id
					amount
				}
			}
		}
	`;

	const [handleSearch, { loading, error, data }] = useLazyQuery(
		GET_ORDERS_BY_PAYMENT_STATE_QUERY,
	);

	useEffect(() => {
		console.log('data:', data);
		if (data && data.getOrdersByPaymentState) {
			console.log(data);
			setPayments(data.getOrdersByPaymentState);
		}
		if (firstLoading) {
			handleSearch({
				variables: { state: selectedOption, paidViaCreditCard: true },
			});
			setFirstLoading(false);
		}
	}, [data]);

	const handleSelectorChange = e => {
		handleSearch({
			variables: { state: e.target.value, paidViaCreditCard: true },
		});
		setSelectedOption(e.target.value);
		console.log(e.target.value);
	};

	const formatDateTime = dateTime => {
		return moment(dateTime).format('DD-MM-YYYY HH:mm');
	};

	return (
		<div>
			<header className='payment-header'>
				{t('creditCardPayment.header')}
			</header>
			<Container className='container-white-credit'>
				<div className='search-container'>
					<select
						className='form-select-lg'
						aria-label='large-select-example'
						value={selectedOption}
						onChange={handleSelectorChange}
					>
						<option value='all' className='transacciones-body'>
							{t('creditCardPayment.all')}
						</option>
						<option value='rejected_transaction' className='transacciones-body'>
							{t('creditCardPayment.rejectedTransaction')}
						</option>
						<option value='accepted_transaction' className='transacciones-body'>
							{t('creditCardPayment.acceptedTransaction')}
						</option>
					</select>
				</div>
				{loading && (
					<div className='spinner-cont'>
						<Spinner animation='border' role='status' variant='primary'>
							<span className='sr-only'></span>
						</Spinner>
					</div>
				)}

				<table className='table'>
					<thead>
						<tr>
							<th>{t('creditCardPayment.item')}</th>
							<th>{t('creditCardPayment.number')}</th>
							<th>{t('creditCardPayment.voucher')}</th>
							<th>{t('creditCardPayment.amount')}</th>
							<th>{t('creditCardPayment.client')}</th>
							<th>{t('creditCardPayment.paymentMethod')}</th>
							<th>{t('creditCardPayment.updatedAt')}</th>
							<th>{t('creditCardPayment.pay')}</th>
							<th>{t('creditCardPayment.cancelled')}</th>
							<th>{t('creditCardPayment.createdAt')}</th>
						</tr>
					</thead>
					<tbody>
						{payments.map((payment, index) => (
							<tr key={payment.id}>
								<td>{index + 1}</td>
								<td>
									<Link to={`/orders/${payment.id}`}>{payment.number}</Link>
								</td>
								<td>Comprobante</td>
								<td>US$ {payment.total}</td>

								<td>{payment.username}</td>
								<td>{t(`buyMethods.${payment.buyMethod}`)}</td>
								<td>
									{formatDateTime(
										payment.pagoparTransaction?.paymentDate ||
											payment.paymentDate,
									)}
								</td>
								<td>{payment.pagoparTransaction?.paid ? 'Sí' : 'No'}</td>
								<td>{payment.pagoparTransaction?.cancelled ? 'Sí' : 'No'}</td>
								<td>{formatDateTime(payment.createdAt)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</Container>
		</div>
	);
};

export default CreditCardPayments;
