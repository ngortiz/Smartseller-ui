import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { useTranslation } from 'react-i18next';

export const OrderPayment = ({ paymentState, total, totalPaid, totalDebt }) => {
	const { t } = useTranslation();

	return (
		<div className='column-content'>
			<h2 className='title'>{t('orderPayment.title')}</h2>
			<p>
				<strong>{t('orderPayment.paymentState')}:</strong>
				{t(`paymentStatus.${paymentState.toLowerCase()}`)}
			</p>
			<p>
				<strong>{t('orderPayment.total')}:</strong> <label>{total}</label>
			</p>
			<p>
				<strong>{t('orderPayment.totalPaid')}:</strong>{' '}
				<label>{totalPaid}</label>
			</p>
			<p>
				<strong>{t('orderPayment.totalDebt')}:</strong>{' '}
				<label>{totalDebt}</label>
			</p>
		</div>
	);
};

OrderPayment.propTypes = {
	paymentState: PropTypes.string.isRequired,
	total: PropTypes.string.isRequired,
	totalPaid: PropTypes.string.isRequired,
	totalDebt: PropTypes.string.isRequired,
};

export default OrderPayment;
