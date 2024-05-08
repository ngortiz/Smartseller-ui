import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const OrderClientInformation = ({ client, address, phone, ruc }) => {
	const { t } = useTranslation();
	return (
		<div className='column-content'>
			<Col className='order-info-col'>
				<h2 className='title'>{t('orderClientInformation.client')}</h2>
				<p>
					<strong>{t('orderClientInformation.client')}:</strong>
					<label> {client} </label>
				</p>
				<p>
					<strong>{t('orderClientInformation.address')}:</strong>
					<label>{address}</label>
				</p>
				<p>
					<strong>{t('orderClientInformation.cellPhone')}:</strong>{' '}
					<label>{phone}</label>
				</p>
				<p>
					<strong>{t('orderClientInformation.rucOrCI')}.:</strong>{' '}
					<label>{ruc}</label>
				</p>
			</Col>
		</div>
	);
};

OrderClientInformation.propTypes = {
	client: PropTypes.string.isRequired,
	address: PropTypes.string.isRequired,
	phone: PropTypes.string.isRequired,
	ruc: PropTypes.string.isRequired,
};

export default OrderClientInformation;
