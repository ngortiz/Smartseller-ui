import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import './style.css';

export const OrderData = ({ number, voucher, state, date }) => {
	const { t } = useTranslation();

	const formattedDate = moment(date).format('DD-MM-YYYY HH:mm');

	return (
		<Card className='order-data-card'>
			<Card.Body>
				<h2 className='title'>{t('orderData.title')}</h2>
				<p>
					<strong>{t('orderData.number')}:</strong> <label>{number}</label>
				</p>
				<p>
					<strong>{t('orderData.voucher')}:</strong> <label>{voucher}</label>
				</p>
				<p>
					<strong>{t('orderData.state')}:</strong>{' '}
					{state ? t(`orderStatus.${state}`) : ''}
				</p>
				<p>
					<strong>{t('orderData.date')}:</strong> <label>{formattedDate}</label>
				</p>
			</Card.Body>
		</Card>
	);
};

OrderData.propTypes = {
	number: PropTypes.string.isRequired,
	voucher: PropTypes.string.isRequired,
	state: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
};

export default OrderData;
