import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import './style.css';

const OrderCard = ({ order, getClassForState, column }) => {
	const formattedDate = moment(order.createdAt).format('DD/MM/YYYY HH:mm');
	const { t } = useTranslation();

	const formatBuyMethod = buyMethod => {
		switch (buyMethod) {
			case 'credit_card':
				return 'T.C';
			case 'bank_transference':
				return 'Transferencia';
			default:
				return t(`buyMethods.${buyMethod}`, { defaultValue: buyMethod });
		}
	};

	return (
		<div>
			<Card
				key={order.id}
				className={`order-card ${getClassForState(column.filterState)}`}
			>
				<Card.Body className='order-card-content'>
					<Card.Text className='order-card-text'>
						<span className='texto-spam'>
							<i className='bi bi-bag-fill'></i>
							<Link to={`/orders/${order.id}`}>{order.number}</Link>
						</span>
						<span className='texto-spam'>
							<i className='bi bi-person-square'></i>
							{order.username}
						</span>

						<span className='texto-spam'>
							<i className='bi bi-calendar-check'></i>
							{formattedDate}
						</span>

						<span className='texto-spam'>
							<i className='bi bi-credit-card'></i>
							{formatBuyMethod(order.buyMethod)}{' '}
						</span>
						<span className='texto-spam'>
							<i className='bi bi-credit-card'></i>
							US$ {order.total}
						</span>
					</Card.Text>
				</Card.Body>
			</Card>
		</div>
	);
};

OrderCard.propTypes = {
	order: PropTypes.object.isRequired,
	getClassForState: PropTypes.func.isRequired,
	column: PropTypes.object.isRequired,
};

export default OrderCard;
