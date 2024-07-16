import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.css';

export const OrderPayment = ({ paymentState, total, totalPaid, totalDebt }) => {
	const { t } = useTranslation();

	return (
		<Card className='order-payment-card'>
			<Card.Body>
				<h2 className='title'>{t('orderPayment.title')}</h2>
				<p>
					<strong>{t('orderPayment.paymentState')}:</strong>
					{paymentState ? t(`paymentStatus.${paymentState.toLowerCase()}`) : ''}
				</p>

				<p>
					<strong>{t('orderPayment.total')}:</strong>{' '}
					<label>{total.replace(/"/g, '')}</label>
				</p>
				<p>
					<strong>{t('orderPayment.totalPaid')}:</strong>
					<label>{totalPaid}</label>
				</p>
				<p>
					<strong>{t('orderPayment.totalDebt')}:</strong>
					<label>{totalDebt}</label>
				</p>
			</Card.Body>
		</Card>
	);
};

OrderPayment.propTypes = {
	paymentState: PropTypes.string.isRequired,
	total: PropTypes.string.isRequired,
	totalPaid: PropTypes.string.isRequired,
	totalDebt: PropTypes.string.isRequired,
};

export default OrderPayment;
