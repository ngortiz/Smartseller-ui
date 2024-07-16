import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './style.css';

const OrderDetails = ({ order }) => {
	const { t } = useTranslation();
	if (!order || !order.orderDetails) {
		return (
			<div className='spinner-cont'>
				<Spinner animation='border' role='status' variant='primary'>
					<span className='sr-only'></span>
				</Spinner>
			</div>
		);
	}

	const { orderDetails, deliverCost, total } = order;

	const iva10Total = total / 11;
	const iva5Total = 0;
	const totalIVA = iva10Total + iva5Total;

	return (
		<div className='comprobante'>
			<table className='order-table'>
				<thead>
					<tr>
						<th>{t('orderDetails.amount')}</th>
						<th>{t('orderDetails.internalCode')}</th>
						<th>{t('orderDetails.product')}</th>
						<th>{t('orderDetails.unitPrice')}</th>
						<th>{t('orderDetails.discount')}</th>
						<th>{t('orderDetails.salePrice')}</th>
						<th>{t('orderDetails.exempt')}</th>
						<th>{t('orderDetails.VAT5%')}</th>
						<th>{t('orderDetails.VAT10%')}</th>
					</tr>
				</thead>
				<tbody>
					{orderDetails.map((item, index) => (
						<tr key={index}>
							<td>{item.amount}</td>
							<td>{item.productVariant.internalCode}</td>
							<td>{item.productVariant.name}</td>
							<td>US$ {item.price}</td>
							<td>{t('orderDetails.none')}</td>
							<td>US$ {item.sellPrice}</td>
							<td>US$ {item.exenta || 0}</td>
							<td>US$ {item.iva5 || 0}</td>
							<td>US$ {item.iva10}</td>
						</tr>
					))}
				</tbody>
			</table>

			<table className='summary-table'>
				<tbody>
					<tr>
						<td className='summary-cell' colSpan='4'>
							{t('orderDetails.deliveryCost')}
						</td>
						<td className='summary-value'>US$ {deliverCost}</td>
					</tr>
					<tr>
						<td className='summary-cell' colSpan='4'>
							{t('orderDetails.subtotal')}
						</td>
						<td className='summary-value'>US$ {total}</td>
					</tr>
					<tr>
						<td className='summary-cell' colSpan='4'>
							{t('orderDetails.discountCoupon')}
						</td>
						<td className='summary-value'>Ninguno</td>
					</tr>
					<tr>
						<td className='summary-cell' colSpan='4'>
							{t('orderDetails.totalToPay')}
						</td>
						<td className='summary-value'>US$ {total}</td>
					</tr>
				</tbody>
			</table>
			<div className='additional-details-container'>
				<div className='additional-details'>
					<table>
						<thead>
							<tr>
								<th>{t('orderDetails.iva5Total')}:</th>
								<th>{t('orderDetails.iva10Total')}:</th>
								<th>{t('orderDetails.totalIVA')}:</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>US$ {iva5Total.toFixed(2)}</td>
								<td>US$ {iva10Total.toFixed(2)}</td>
								<td>US$ {totalIVA.toFixed(2)}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

OrderDetails.propTypes = {
	order: PropTypes.object,
};

export default OrderDetails;
